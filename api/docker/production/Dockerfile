FROM python:3.6

ADD . /code
WORKDIR /code

RUN apt-get update
RUN apt-get upgrade -y

RUN apt-get update
RUN apt-get install -y gdal-bin libgdal-dev

ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal

RUN pip install -r requirements.txt
ENV DJANGO_ENV=production

EXPOSE 8000
STOPSIGNAL SIGINT
CMD ["/usr/local/bin/gunicorn", "-w 3", "api.wsgi:application"]
