
setup:
	@echo "========== Start installing dependencies =========="

	docker build -t "express_server" .
	
	@echo "========== Environment is ready! App is running! =========="

start:
	@echo "========== Start running app =========="

	docker-compose up

	
cleanup:
	sudo docker-compose down
	sudo docker rmi -f $$(docker images -a -q)