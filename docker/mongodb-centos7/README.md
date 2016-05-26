dockerfiles-sct-mongodb
========================

Based on CentOS-Dockerfiles

This repo contains a recipe for making Docker container for mongodb on CentOS7.

Setup
-----

Perform the build the container:

    $ sudo docker build -rm -t <username>/mongodb .

Launching MongoDB
-----------------

### Recommended start ###
To use a separate data volume for /data/db (recommended, to allow image update without
losing database contents):

Create a data volume container: (it doesn't matter what image you use
here, we'll never run this container again; it's just here to
reference the data volume)

    $ sudo docker run --name workexpress-mongodb-data -v /data/db <username>/mongodb true
    
To run in background:

    $ sudo docker run -d --name workexpress-mongodb --volumes-from=workexpress-mongodb-data <username>/mongodb mongod --smallfiles
