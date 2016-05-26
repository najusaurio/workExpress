dockerfiles-sct-nginx
=====================

Based on CentOS-Dockerfiles

This repo contains a recipe for making Docker container for nginx on CentOS7.

Setup
-----

Perform the build the container:

    $ sudo docker build -rm -t <username>/nginx .

Launching Nginx
---------------

To run container:

    $ sudo docker run -d --name=workexpress-nginx -p 80:80 --link workexpress:workexpress <username>/nginx

