FROM centos:centos7
MAINTAINER diego.uribe.gamez@gmail.com

RUN yum -y update && yum clean all
RUN yum -y install epel-release && yum clean all

RUN yum -y install gcc gcc-c++ && yum clean all
RUN yum -y install wget tar make && yum clean all

RUN yum -y install mongodb

RUN mkdir node-latest
RUN cd node-latest && wget http://nodejs.org/dist/node-latest.tar.gz
RUN cd node-latest && tar xvf node-latest.tar.gz && rm node-latest.tar.gz
RUN cd node-latest && cd * && ./configure
RUN cd node-latest && cd * && make
RUN cd node-latest && cd * && make install
RUN ln -s /usr/local/bin/node /usr/bin/node
RUN ln -s /usr/local/bin/npm /usr/bin/npm
RUN cd ../../ && rm node-latest/ -r -f

RUN npm install -g node-inspector supervisor forever

RUN cd /opt/ && mkdir workExpress

ADD ./node_debugger.sh /node_debugger.sh
RUN chmod 755 /node_debugger.sh

EXPOSE 8080
EXPOSE 8081

CMD ["/bin/bash"]