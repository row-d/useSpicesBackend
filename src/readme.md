If you are using Docker, follow this steps:

1. `docker-compose up -d`
2. `docker exec -it <container-name> mongo -u <user> -p <password>`
3. `use ecommerce`
4. `load("/scripts/init.js")`

else

1. `mongo -u <user> -p <password>`
2. `use ecommerce`
3. `load("scripts/init.js")`