from fastapi import FastAPI
from train import skills_dummies

router=FastAPI()

@router.get('/skills')
async def get_skills():
    return skills_dummies.columns.to_list()
