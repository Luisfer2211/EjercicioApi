# EjercicioApi
# Incident API

## Descripción
Esta API permite a los empleados de una empresa reportar incidentes relacionados con sus equipos de trabajo.

## Instalación y Ejecución

Seguir estos pasos para ejecutar la API en una máquina local.

### Requisitos
- Tener **Node.js** instalado. Se puede descargar desde [nodejs.org](https://nodejs.org/).


### Instalar dependencias
Ejecutar el siguiente comando en la terminal dentro de la carpeta del proyecto:
```sh
npm install express
```

### Ejecutar el servidor
```sh
node apifuncional.js
```
Si todo está correcto, se mostrará en la consola:
```
API corriendo en http://localhost:2211
```


### Crear un nuevo incidente
- **Método:** `POST`
- **Endpoint:** `/incidents`
- **Cuerpo de la solicitud (JSON):**
```json
{
  "reporter": "Achebe Gual",
  "description": "La impresora no funciona"
}
```
- **Ejemplo de uso en Git Bash:**
```powershell
curl -X POST http://localhost:2211/incidents -H "Content-Type: application/json" -d '{"reporter":"Achebe","description":"La impresora no funciona correctamente"}'

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

## Notas Importantes
- **El `reporter` es obligatorio.**
- **La `description` debe tener al menos 10 caracteres.**
- **Los datos se almacenan en memoria, por lo que se perderán al reiniciar el servidor.**

