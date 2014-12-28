dockerfiles-sct-nodejs
========================

Based on CentOS-Dockerfiles

This repo contains a recipe for making Docker container for nodejs on CentOS7.

Note: Change password of user in start.sh

Setup
-----

Check your Docker version

    $ sudo docker version

Perform the build the container:

    $ sudo docker build --rm -t <username>/nodejs .

Check the image out.

    $ sudo docker images

Launching NodeJS
----------------

To run in bagraund:

    $ sudo docker run -itd -p 8080:8080 -p 8081:8081 -v /opt/workExpress:/opt/workExpress --link mongodb:mongodb --link redis:redis --name wenodejs <username>/nodejs /node_debugger.sh

To work whit the nodejs container:

    $ sudo docker run -it -p 8080:8080 -p 8081:8081 -v /opt/workExpress:/opt/workExpress --link mongodb:mongodb --link redis:redis --name wenodejs <username>/nodejs /bin/bash

Using your NodeJS container
---------------------------

    $ curl http://localhost:8080
    
### Commands to work whit the nodejs container ###
Star nodejs in debgger mode:

    # forever start /usr/local/bin/node-inspector --web-port=8081
    # cd /opt/workExpress/
    # supervisor --debug workers.js

Stop forever node inspector:

    # forever stop 0
