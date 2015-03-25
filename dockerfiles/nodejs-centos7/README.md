dockerfiles-sct-nodejs
========================

Based on CentOS-Dockerfiles

This repo contains a recipe for making Docker container for nodejs on CentOS7.

Note: Change password of user in start.sh

Setup
-----

Perform the build the container:

    $ sudo docker build --rm -t <username>/nodejs .

Install nodejs requirements:

    $ sudo docker run --rm --privileged=true -v /opt/workExpress/:/opt/workExpress/ <username>/nodejs /npm_install.sh


Launching NodeJS
----------------

To run container:

    $ sudo docker run --name workexpress -d --privileged=true -v /opt/workExpress/:/opt/workExpress/ --link workexpress-mongodb:mongodb --link workexpress-redis:redis <username>/nodejs

To work in development mode with container:

    $ sudo docker run --name dev-workexpress -d -p 8080:8080 -p 8081:8081 --privileged=true -v /opt/workExpress/:/opt/workExpress/ --link workexpress-mongodb:mongodb --link workexpress-redis:redis <username>/nodejs /bin/bash /node_debugger.sh


