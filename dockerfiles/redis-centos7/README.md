dockerfiles-centos-redis
========================

Based on CentOS mariadb Dockerfile

This repo contains a recipe for making Docker container for mariadb on CentOS7.

Setup
-----

Check your Docker version

    $ sudo docker version

Perform the build

    $ sudo docker build -rm -t <username>/redis .

Check the image out

    $ sudo docker images
    
Launching Redis
---------------

To run in background:

    $ sudo docker run -d -p 6379:6379 --name redis <username>/redis

Using your Redis container
--------------------------

    $ sudo nc localhost 6379

