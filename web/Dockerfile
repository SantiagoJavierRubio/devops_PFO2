FROM node:18

WORKDIR /app

# Instalar paquetes de node
COPY package.json ./
RUN npm install

COPY . .

RUN chmod +x wait-for-mysql.sh

EXPOSE 3000

# Iniciar el servidor de express desde el siguiente comando para asegurarse que la conexion a mysql existe antes de empezar

CMD ["sh", "./wait-for-mysql.sh"]
