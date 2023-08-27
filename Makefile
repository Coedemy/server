up:
	docker-compose up -d

down:
	docker-compose down

cleanup:
	docker rm $(docker ps -a -q)
	docker rm $(docker ps -a -q)
	docker rmi -f $$(docker images -a -q)