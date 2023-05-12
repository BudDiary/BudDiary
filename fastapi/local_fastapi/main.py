# pip install pymysql
# uvicorn main:app --reload
# uvicorn main:app --reload --port 9000

import os
import json
import requests
from fastapi import FastAPI, Request
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class myAnswer(BaseModel):
    id: int
    favor_list: list[str]

class diaryContnet(BaseModel):
    content: str

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
    def make_survey_object():
        survey_object = {
            'id': items.id,
            'preference': items.favor_list
        }
        
        # 63가지의 답변
        answer_list = [
        "클래식", "힙합", "락", "K-POP", "팝송", "J-POP", "C-POP", "오페라", "발라드", "R&B",
        "INFP", "INFJ", "INTP", "INTJ", "ISTP", "ISTJ", "ISFP", "ISFJ","ENFP", "ENFJ", "ENTP", "ENTJ", "ESTP", "ESTJ", "ESFP", "ESFJ", 
        "축구", "농구", "조깅", "헬스", "클라이밍", "골프", "야구", "배드민턴",
        "액션", "스릴러", "로맨스", "코미디", "SF", "판타지", "호러", "드라마", "가족", "범죄", "음악", "애니메이션",
        "한식", "양식", "중식", "일식",
        "화날 때", "기쁠 때",
        "여행", "집", "게임", "요리", "독서", "유튜브 시청",
        "캐주얼", "스트릿", "빈티지", "댄디", "스포티"
        ]
        
        answer_idx = []
        for i in range(len(answer_list)):
            if answer_list[i] in survey_object["preference"]:
                answer_idx.append(i)
        
        survey_refactor = {'id': items.id, 'preference' : answer_idx}
        return survey_refactor

    filename = 'survey.json'
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            data = json.load(f)
    else:
        data = []

    new_data = make_survey_object()
    
    for i, survey in enumerate(data):
        if survey['id'] == new_data['id']:
            data[i] = new_data
            break
    else:
        data.append(new_data)

    with open(filename, 'w') as f:
        json.dump(data, f)

    return {"message": "json_update success"}


@app.get("/fastapi/recommend/survey/{member_id}")
def recommend_by_survey(member_id: int):
    def get_similarity_scores(filename, member_id):
        # 파일에서 데이터 로드
        if os.path.exists(filename):
            with open(filename) as f:
                data = json.load(f)

        # id와 preference 추출
        ids = []
        preferences = []
        for entry in data:
            ids.append(entry['id'])
            preferences.append(' '.join([str(p) for p in entry['preference']]))

        # TF-IDF 특성 행렬 생성
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(preferences)

        # 코사인 유사도 계산
        cosine_similarities = cosine_similarity(tfidf_matrix, tfidf_matrix)

        # 결과 리스트 생성
        result = []
        target_index = ids.index(member_id)
        for i, sim in sorted(enumerate(cosine_similarities[target_index]), key=lambda x: x[1], reverse=True):
            if i != target_index:
                result.append((ids[i], sim))

        return result
    recommend_list = get_similarity_scores('survey.json', 1)
    recommend_object = [{"id" : id, "rate": round(rate, 2)} for id, rate in recommend_list]

    return recommend_object

@app.post("/fastapi/sentiment")
async def analyze_sentiment(content: diaryContnet):
    headers = {
        'Content-Type': 'application/json',
        'X-NCP-APIGW-API-KEY-ID': 'vrdjgx8oxa',
        'X-NCP-APIGW-API-KEY': 'T6W3dtfPEqKkPwr8vDbDdpU6GdNS62bce6NtVLo6',
    }
    
    data = {
        'content': content.content
    }
    response = requests.post('https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze', headers=headers, json=data)
    if response.status_code == 200:
            result = response.json()
            doc_confidence = result["document"]["confidence"]
            doc_neg = doc_confidence["negative"]
            doc_pos = doc_confidence["positive"]
            result_json = {
                "negative": round(doc_neg, 2),
                "positive": round(doc_pos, 2)
            }

            return result_json
    else:
        return {'error': response.status_code, 'message': response.text}
