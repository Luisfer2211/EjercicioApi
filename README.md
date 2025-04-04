# EjercicioApi

## Incident API

### Descripción
Esta API permite a los empleados de una empresa reportar incidentes relacionados con sus equipos de trabajo. Además, incluye una página web simple para gestionar estos incidentes.

## Instalación y Ejecución

### Requisitos
- Tener **Node.js** instalado. Se puede descargar desde [nodejs.org](https://nodejs.org/).
- Tener **PostgreSQL** instalado y corriendo en el puerto 5432.

### Instalación de dependencias
Ejecutar el siguiente comando en la terminal dentro de la carpeta del proyecto para descargar todas las dependencias necesarias:
```sh
npm install express pg cors
```

### Configurar la Base de Datos
La API creará automáticamente la base de datos y la tabla si no existen.
Asegúrate de que PostgreSQL esté en ejecución antes de iniciar la API.

### IMPORTANTE
Cambiar const DB_PASSWORD por la contraseña que hayas configurado en postgre

### Ejecutar el Servidor
```sh
node apifuncional.js
```
Si todo está correcto, se mostrará en la consola:
```
API corriendo en http://localhost:2211
Base de datos "Incidentes_bat" creada exitosamente.
Tabla "incidents" creada o ya existe
```

---

## Endpoints de la API

### Crear un nuevo incidente
- **Método:** `POST`
- **Endpoint:** `/incidents`
- **Cuerpo de la solicitud (JSON):**
```json
{
  "reporter": "Achebe Gual",
  "description": "No he hecho la tarea de Ing de software"
}
```
- **Ejemplo de uso en Git Bash:**
```sh
curl -X POST http://localhost:2211/incidents -H "Content-Type: application/json" -d '{"reporter":"Achebe Gual","description":"No he hecho la tarea de Ing de software"}'
```

### Obtener todos los incidentes
- **Método:** `GET`
- **Endpoint:** `/incidents`
- **Ejemplo de uso:**
```sh
curl -X GET http://localhost:2211/incidents
```

### Obtener un incidente por ID
- **Método:** `GET`
- **Endpoint:** `/incidents/{id}`
- **Ejemplo de uso:**
```sh
curl -X GET http://localhost:2211/incidents/1
```

### Actualizar el estado de un incidente
- **Método:** `PUT`
- **Endpoint:** `/incidents/{id}`
- **Cuerpo de la solicitud (JSON):**
```json
{
  "status": "en proceso"
}
```
- **Ejemplo de uso:**
```sh
curl -X PUT http://localhost:2211/incidents/1 -H "Content-Type: application/json" -d '{"status":"en proceso"}'
```

### Eliminar un incidente
- **Método:** `DELETE`
- **Endpoint:** `/incidents/{id}`
- **Ejemplo de uso:**
```sh
curl -X DELETE http://localhost:2211/incidents/1
```

---

## Notas Importantes
- **El `reporter` es obligatorio.**
- **La `description` debe tener al menos 10 caracteres.**
- **La base de datos y la tabla se crean automáticamente si no existen.**

---

## Página Web

La aplicación web permite:
- Ver la lista de incidentes registrados.
- Crear nuevos incidentes.
- Editar el estado de un incidente.
- Obtener un incidente por su ID.
- Eliminar incidentes.

### Uso de la Página Web
1. Abrir el archivo **index.html** en un navegador web.
2. Ingresar un nuevo incidente con los campos requeridos.
3. Consultar incidentes existentes.
4. Editar o eliminar incidentes según sea necesario.

### Tecnologías Usadas
- **Frontend:** HTML, CSS, JavaScript (fetch API)
- **Backend:** Node.js con Express
- **Base de datos:** PostgreSQL

---

## Autor
Desarrollado por Luis Palacios :) 

