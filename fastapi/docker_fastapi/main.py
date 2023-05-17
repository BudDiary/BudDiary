# pip install pymysql
# uvicorn main:app --reload

# source venv/Scripts/activate
# uvicorn main:app --reload --port 9000

import re
import os
import json
import requests
from fastapi import FastAPI, Request
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from soynlp.noun import LRNounExtractor_v2

class myAnswer(BaseModel):
    userId: str
    favor_list: list[str]

class diaryContnet(BaseModel):
    content: str

class diaryKeyword(BaseModel):
    userId: str
    content: str  
    
class keywordSimilar(BaseModel):
    userId: str
    

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
            'userId': items.userId,
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
        
        survey_refactor = {'userId': items.userId, 'preference' : answer_idx}
        return survey_refactor

    filename = './docker_fastapi/static/survey.json'
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
    else:
        data = []

    new_data = make_survey_object()
    
    for i, survey in enumerate(data):
        if survey['userId'] == new_data['userId']:
            data[i] = new_data
            break
    else:
        data.append(new_data)

    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f)

    return {"message": "json_update success"}


@app.post("/fastapi/recommend/survey")
def recommend_by_survey(info: keywordSimilar):
    def get_similarity_scores(filename, userId):
        # 파일에서 데이터 로드
        if os.path.exists(filename):
            with open(filename, 'r', encoding='utf-8') as f:
                data = json.load(f)

        # userId와 preference 추출
        ids = []
        preferences = []
        for entry in data:
            ids.append(entry['userId'])
            preferences.append(' '.join([str(p) for p in entry['preference']]))

        # TF-IDF 특성 행렬 생성
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(preferences)

        # 코사인 유사도 계산
        cosine_similarities = cosine_similarity(tfidf_matrix, tfidf_matrix)

        # 결과 리스트 생성
        result = []
        target_index = ids.index(userId)
        for i, sim in sorted(enumerate(cosine_similarities[target_index]), key=lambda x: x[1], reverse=True):
            if i != target_index:
                result.append((ids[i], sim))

        return result
    recommend_list = get_similarity_scores('./docker_fastapi/static/survey.json', info.userId)
    recommend_object = [{"userId" : info.userId, "rate": round(rate, 2)} for info.userId, rate in recommend_list]

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


@app.post("/fastapi/keyword")
async def keyword(info: diaryKeyword):
    def make_keyword_object():
        noun_extractor = LRNounExtractor_v2(verbose=True)
        nouns = noun_extractor.train_extract([info.content])
        
        keywords = {}

        for key, value in nouns.items():
            freq = float(value.score)
            score = float(value.score)
            
            # score가 0.5 이상인 것
            if score >= 0.5:
                formatted_key = key.strip().title()
                keywords[formatted_key] = round(score*freq, 2)

    

        result = {"userId": info.userId, "keywords": keywords}    
        
        return result
    
    filename = './docker_fastapi/static/keyword.json'
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
    else:
        data = []

    # Check if userId already exists in data
    for d in data:
        if d["userId"] == info.userId:
            # Update existing keywords
            for key, value in make_keyword_object()["keywords"].items():
                if key in d["keywords"]:
                    d["keywords"][key] += value
                else:
                    d["keywords"][key] = value
            break
    else:
        # Add new data
        new_data = make_keyword_object()
        data.append(new_data)

    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)

    return {"message": "json_update success"}

@app.post("/fastapi/recommend/keyword")
async def keyword(info : keywordSimilar):
    def get_similarity_scores_keyword(filename, userId):
        # 파일에서 데이터 로드
        if os.path.exists(filename):
            with open(filename, 'r', encoding='utf-8') as f:
                data = json.load(f)

        # userId와 keyword 추출
        ids = []
        keywords = []
        for entry in data:
            ids.append(entry['userId'])
            keywords.append(' '.join(str(p) for p in entry['keywords'].keys()))

        # TF-IDF 특성 행렬 생성
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(keywords)

        # 코사인 유사도 계산
        cosine_similarities = cosine_similarity(tfidf_matrix, tfidf_matrix)

        # 결과 리스트 생성
        result = []
        target_index = ids.index(userId)
        for i, sim in sorted(enumerate(cosine_similarities[target_index]), key=lambda x: x[1], reverse=True):
            if i != target_index:
                result.append((ids[i], sim))

        return result

    recommend_by_survey_list = get_similarity_scores_keyword('keyword.json', info.userId)
    recommend_object = [{"userId" : info.userId, "rate": round(rate, 2)} for info.userId, rate in recommend_by_survey_list]

    return recommend_object

