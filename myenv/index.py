import cohere
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import Details
import pandas as pd
import joblib, traceback
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load('career_predictor.pkl')
all_skills = joblib.load('skills_set.pkl')

cohere_api_key=os.getenv("COHERE_API_KEY")

co = cohere.Client(cohere_api_key)

def ensure_complete_sequence(text:str):
    if text.endswith('.'):
        return text
    last_period_index=text.rfind('.')
    if last_period_index!=-1:
        return text[:last_period_index+1].strip()
    return text

@app.post('/details')
async def details(my_details: Details):
    try:
        skills_set = {skill: 0 for skill in all_skills}
        for skill in my_details.selectedSkills:
            if skill in skills_set:
                skills_set[skill] = 1

        input_data = pd.DataFrame([{
            "10th Marks": my_details.tenth_marks,
            "12th Marks": my_details.twelth_marks,
            **skills_set
        }])

        prediction = model.predict(input_data)

        prompt = f"""
            You are an experienced career counselor named "Career Sage".

            Student's academic details:
            - Name : {my_details.name}
            - 10th Marks: {my_details.tenth_marks}%
            - 12th Marks: {my_details.twelth_marks}%
            - Skills: {', '.join(my_details.selectedSkills)}
            - Predicted Career: {prediction[0]}

            Suggest suitable careers based on this and explain why.
        """

        response = co.generate(
            model='command',  
            prompt=prompt,
            max_tokens=300,
            temperature=0.7
        )
        text=response.generations[0].text.strip()
        complete_sequence=ensure_complete_sequence(text)

        return {
            "career": prediction[0],
            "generated": complete_sequence
        }

    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))
