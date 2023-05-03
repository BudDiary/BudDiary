# pip install pymysql
# uvicorn main:app --reload
# uvicorn main:app --reload --port 9000

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware



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