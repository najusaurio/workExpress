FROM centos:centos7
MAINTAINER diego.uribe.gamez@gmail.com

RUN yum -y update; yum clean all
RUN yum -y install epel-release; yum clean all
RUN yum -y install mongodb-server; yum clean all

EXPOSE 27017

