FROM python:3.6

ADD . /code
WORKDIR /code

RUN apt-get update
RUN apt-get upgrade -y

RUN echo deb http://ftp.uk.debian.org/debian unstable main contrib non-free >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get remove -y binutils


RUN apt-get -t unstable install -y libgdal-dev g++
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal

RUN pip install -r requirements.txt
ENV DJANGO_ENV=production

EXPOSE 8000
STOPSIGNAL SIGINT
CMD ["/usr/local/bin/gunicorn", "-w 3", "-b :8000", "api.wsgi:application"]
