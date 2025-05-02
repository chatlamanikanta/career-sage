from pydantic import BaseModel
from typing import List

class Details(BaseModel):
    name:str
    age:int
    tenth_marks:float
    twelth_marks:float
    selectedSkills:List[str]