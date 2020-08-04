## Descripcion

Backend en NodeJs Framework Express, usando TypeORM, MySQL, gestor de tareas gulp, Swagger

`npm install` para instalar las dependencias.
`npm run build` para generar carpeta dist.
`gulp start-dev` para levantar el proyecto, levanta en el puerto 8080.

Una vez creada localmente la base de datos MySQL, con los datos del archivo `connection.ts`(o sino cambiarlos en el mismo archivo por su conexion local) pegarle por postman al metodo para probar el servicio
get: `http://localhost:8080/api/employees`
