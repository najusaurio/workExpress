dockerfiles-centos-redis
========================

Based on CentOS redis Dockerfile

This repo contains a recipe for making Docker container for redis on CentOS7.

Setup
-----

Perform the build the container:

    $ sudo docker build -rm -t <username>/redis .
    
Launching Redis
---------------

To run in background:

    $ sudo docker run --name workexpress-redis -d <username>/redis

