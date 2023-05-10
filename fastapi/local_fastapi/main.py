# pip install pymysql
# uvicorn main:app --reload
# uvicorn main:app --reload --port 9000

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class myAnswer(BaseModel):
    id: int
    favor_list: list[int]

app = FastAPI()
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/fastapi/test")
def test():
    return {'test': 'complete'}


@app.post("/fastapi/survey")
def survey(items: myAnswer):
    survey_object = {
        'id': items.id,
        'preference': items.favor_list
    }


    return survey_object