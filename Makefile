
setup:
	@echo "========== Start installing dependencies =========="

	docker build -t "express_server" .
	
	@echo "========== Environment is ready! App is running! =========="

start:
	@echo "========== Start running app =========="

	docker-compose up
cleanup:
	docker-compose down
	docker rmi -f $$(docker images -a -q)