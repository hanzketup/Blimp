FROM python:3.5

ADD . /code
WORKDIR /code

RUN apt-get update && apt-get install gcc make libc-dev

RUN pip install -r requirements.txt
RUN pip install --upgrade git+https://github.com/m-wrzr/populartimes
ENV DJANGO_ENV=production

EXPOSE 8000
STOPSIGNAL SIGINT
CMD ["/usr/local/bin/gunicorn", "-w 3", "-b :8000", "efc.wsgi:application"]
