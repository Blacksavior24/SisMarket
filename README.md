### Características
- Se necesita tener docker para el funcionamiento.
- Es creado con nodejs, express, vuejs y postgres.
- Algunas formas de correr los datos del docker para la conexión se obtendrá en está lectura.

# Instalando el sistema en modo desarrollo

- Se necesita tener instalado Docker previamente
Dentro de la carpeta correr:

docker-compose up -d postgres
- así corre la base de datos.

docker-compose up -d pgadmin
- así logramos correr el entorno gráfico para ver la base de datos postgres
- localhost:5050

docker-compose ps
- así veremos los contenedores funcionando.

Ahora se instalaran las librerias: npm install
- Se debe tener Node.js instalado previamente.

Para iniciar la API: npm run dev

- Se requiere que primero sea la API y luego el FrontEnd

Para correr el FrontEnd: npm run serve


# Instalando paquetes

npm install
e instalará los siguientes paquetes:
- "@hapi/boom": "^9.1.4",
- "axios": "^0.24.0",
- "core-js": "^3.6.5",
- "cors": "^2.8.5",
- "dotenv": "^10.0.0",
- "express": "^4.17.1",
- "faker": "^5.5.3",
- "joi": "^17.5.0",
- "jspdf": "^2.5.1",
- "jspdf-autotable": "^3.5.23",
- "jwt-decode": "^3.1.2",
- "mysql2": "^2.3.3",
- "passport": "^0.5.2",
- "passport-local": "^1.0.0",
- "pg": "^8.7.1",
- "pg-hstore": "^2.3.4",
- "sequelize": "^6.12.0-beta.3",
- "vue": "^2.6.11",
- "vue-router": "^3.2.0",
- "vuetify": "^2.4.0",
- "vuex": "^3.4.0"
-  "@vue/cli-plugin-babel": "~4.5.0",
-  "@vue/cli-plugin-router": "~4.5.0",
-  "@vue/cli-plugin-vuex": "~4.5.0",
-  "@vue/cli-service": "~4.5.0",
-  "eslint": "^8.4.0",
-  "eslint-config-prettier": "^8.3.0",
-  "eslint-plugin-prettier": "^4.0.0",
-  "nodemon": "^2.0.15",
-  "prettier": "^2.5.1",
-  "sass": "~1.32.0",
-   "sass-loader": "^10.0.0",
-   "sequelize-cli": "^6.3.0",
-   "vue-cli-plugin-vuetify": "~2.4.2",
-   "vue-template-compiler": "^2.6.11",
-   "vuetify-loader": "^1.7.0"

# Corriendo base de datos en el contenedor docker

- Una vez entrando al localhost:5050 veremos un entorno gráfico pgdamin
- Luego de eso se pone "agregar servidor"
- Pone cualquier nombre
- En el lado de conexión :
  - Dirección del servidor: postgres
  - Base de datos mantenimiento: SisMarket or my_store
  - Usuario: ward
  - Pass: admin123
 
# Iniciando la aplicación
...
# SisMarket
 Trabajo a desarrollar en el curso de Proyectos de Software II
# Enlaces de Herramientas Usadas

https://trello.com/b/TcLFMwaO/aplicativo-kardex

https://sismarket.atlassian.net/jira/software/projects/SISMARKET/boards/3
