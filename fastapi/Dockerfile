FROM python:3.11

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade pip && \
pip install --no-cache-dir --upgrade setuptools && \
pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app

CMD ["uvicorn", "docker_fastapi.main:app", "--host", "0.0.0.0", "--port", "9000"]