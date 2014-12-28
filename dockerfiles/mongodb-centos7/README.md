dockerfiles-sct-mongodb
========================

Based on CentOS-Dockerfiles

This repo contains a recipe for making Docker container for mongodb on CentOS7.

Setup
-----

Check your Docker version

    $ sudo docker version

Perform the build the container:

    $ sudo docker build -rm -t <username>/mongodb .
    
Check the image out

    $ sudo docker images

Launching MongoDB
-----------------

### Recommended start ###
To use a separate data volume for /data/db (recommended, to allow image update without
losing database contents):

Create a data volume container: (it doesn't matter what image you use
here, we'll never run this container again; it's just here to
reference the data volume)

    $ sudo docker run --name mongodb-data -v /data/db <username>/mongodb true
    
To run in bagraund:

    $ sudo docker run -d -p 27017:27017 --name mongodb --volumes-from=mongodb-data <username>/mongodb mongod

Using your MongoDB container
----------------------------

    # mongo --host localhost --port 27017

    MongoDB shell version: 2.4.6
    connecting to: 127.0.0.1:27017/test
    >
