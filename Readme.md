## Historial de comandos

Buscar la imagen “httpd” para usar Apache

`docker pull httpd`

Crear y correr el contenedor para la imagen de httpd en el puerto 8080

`docker run -d --name servidor-apache -p 8080:80 httpd`

Probar que el servidor funcione:

`curl -I http://localhost:8080`

> La respuesta da HTTP/1.1 200 OK ✅

Buscar imagen de MySQL

`docker pull mysql`

Crear y correr el contenedor para la imagen de mysql en el puerto 3306, con una base de datos ‘db’ un root password de ‘password’

`docker run -d --name servidor-mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=db -p 3306:3306 mysql`

Probar que la base de datos funciona

```
mysql -h localhost -P 3306 -u root -p
password
```
> Inicia la sesión de mysql ✅

Crear una red de nombre ‘net’ para linkear los contenedores

`docker network create net`

Creación de la tabla en mysql (generado desde MysqlWorkbench)

```
CREATE TABLE `db`.`tareas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `hecha` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`));
```

> ### Pasos por fuera de la linea de comandos:
> - Creación de la aplicación web
> - Configuración del servidor de apache como un reverse proxy
> - Configuración del docker-compose.yml
> - Setup de init.sql y comando para esperar la conexión a “mysql” desde “web”


Correr todos los servicios a partir del docker-compose.yml

`docker-compose up –build -d`

Al ingresar a http://localhost:8080 se deberia ver el html indicado por el servicio web de NodeJS con los datos obtenidos de mysql


### Subir el contenedor web a Docker Hub

```
docker build -t santirubiodev/devopspfo2  ./web
docker login 
## Ingreso de credenciales
docker push santirubiodev/devopspfo2
```


### Iniciar repositorio de git y subirlo a GitHub

```
git init
git add .
git commit -m “primer commit”
git remote add origin https://github.com/SantiagoJavierRubio/devops_PFO2.git
git push origin master
```

Para correr el proyecto

Clonar el repositorio y correr el comando

`docker-compose up --build -d`

> El puerto de host utilizado es el 8080


### Problemas al realizar el trabajo
- Al usar un servidor de Node la imagen de Apache no era en realidad de mucha utilidad por lo que resolví utilizarla como un reverse-proxy lo cual trajo varios problemas de configuración.
- Tuve también muchos problemas al querer conectar el servidor de express con Node.JS a la base de datos de mysql porque al iniciar el servicio web la base de datos no se encontraba aún disponible y resultaba difícil salir de ese estado de error desde la configuración inicial. Podía resolverlo ejecutando comandos desde docker pero terminé usando el archivo “wait-for-mysql.sh” para validar la conexión antes de iniciar el servidor de express.