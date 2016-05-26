
build-workexpress:
	cp package.json docker/docker_files/nodejs/
	cd docker/docker_files/nodejs/ && docker build -t "workexpress/workexpress-nodejs" .
	rm -rf docker/docker_files/nodejs/package.json

netwok:
	docker network create workexpress

start-dev:
	cd docker && docker-compose up -d

stop-dev:
	cd docker && docker-compose stop