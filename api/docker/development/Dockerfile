FROM python:3.5

ADD . /code
WORKDIR /code

RUN apt-get update && apt-get install gcc make libc-dev

RUN pip install -r requirements.txt
ENV DJANGO_ENV=development

EXPOSE 8000
STOPSIGNAL SIGINT
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
