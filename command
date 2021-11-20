#clear all container
  docker rm -f $(docker ps -a -q)

#clear all images: 
  docker rmi -f $(docker images -a -q)

#clear all volumes: 
  docker volume rm $(docker volume ls -q)

#clear all network: 
  docker network rm $(docker network ls | tail -n+2 | awk '{if($2 !~ /bridge|none|host/){ print $1 }}')