# Movie Match API

Una API para buscar y filtrar películas.

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install

# PROYECTO FINAL MODULO 3:

# Historia de Usuario 1: Buscar películas por rango de año

## Título

**Como usuario**, quiero buscar películas dentro de un rango de años para encontrar fácilmente las películas que se lanzaron en un período específico.

## Criterios de Aceptación

1. Si el usuario proporciona ambos parámetros (`fromYear` y `toYear`), el sistema debe devolver todas las películas cuyo año de lanzamiento esté dentro del rango especificado, inclusive.
2. Si solo se proporciona `fromYear`, el sistema debe devolver todas las películas lanzadas desde ese año en adelante.
3. Si solo se proporciona `toYear`, el sistema debe devolver todas las películas lanzadas hasta ese año.
4. Si no se encuentran películas dentro del rango especificado, el sistema debe devolver un mensaje de error con un código de estado **404**.
5. Si los parámetros proporcionados no son válidos (por ejemplo, no son números o están en un formato incorrecto), el sistema debe devolver un mensaje de error con un código de estado **400**.

## Notas Técnicas

- Los parámetros de consulta deben ser opcionales (`fromYear` y `toYear`).
- La lógica de filtrado debe implementarse en el servicio `getMoviesByCriteria`.
- El controlador debe manejar los errores y devolver respuestas claras al cliente.

Ejemplos de Solicitudes

1. `/movies?fromYear=2000&toYear=2010`
2. `/movies?fromYear=2020`
3. `/movies?toYear=1995`

# Historia de Usuario 2: Marcar una película como favorita

**Como usuario**, quiero poder marcar una película como favorita para poder acceder fácilmente a mis películas preferidas en el futuro.

## Criterios de Aceptación

1. El usuario puede marcar una película como favorita enviando su ID o nombre, así como también eliminarla.
2. Si la película ya está marcada como favorita, el sistema debe devolver un mensaje indicando que ya está en la lista de favoritos.
3. El usuario puede obtener una lista de todas sus películas favoritas.
4. Si el usuario intenta marcar como favorita una película que no existe, el sistema debe devolver un mensaje de error con un código de estado **404**.
5. La lista de favoritos debe persistir en memoria (puedes usar un arreglo en esta implementación inicial).

## Notas Técnicas

- Crear un servicio `favoritesService` para manejar la lógica de almacenamiento y recuperación de películas favoritas.
- Implementar los controladores `addFavorite`, `getFavorites` y `removeFavorites` para manejar las solicitudes relacionadas con favoritos.
- Registrar las rutas necesarias en el archivo movieRoutes con el prefijo `/movies/favorites`.

Probar la funcionalidad

1. **Caso 1: Marcar una película como favorita**
     - **Solicitud:** `POST /movies`
     - **Cuerpo:** 
     {
    "idOrName": "Inception"
    }

2. **Caso 2: Obtener la lista de favoritos**
     - **Solicitud:** `GET /movies/favorites`

3. **Caso 3: Marcar una película ya favorita**
     - **Solicitud:** `POST /movies/favorites`
     - **Cuerpo:**      
     {
    "idOrName": "Inception"
    }

4. **Caso 4: Obtener favoritos cuando no hay películas favoritas**
     - **Solicitud:** `GET /movies/favorites`

5. **Caso 5: Eliminar una película de favoritos**
     - **Solicitud: DELETE /movies/favorites/Inception

6. **Caso 6: Intentar eliminar una película que no está en favoritos**
     - **Solicitud: DELETE /movies/favorites/NonExistentMovie

# Historia de Usuario 3: Filtrar películas por director

**Como usuario**, quiero buscar películas dirigidas por un director específico para encontrar contenido relacionado con mis directores favoritos.

## Criterios de Aceptación

1. El usuario puede buscar películas proporcionando el nombre del director en el parámetro de consulta `director`.
2. El sistema debe devolver todas las películas dirigidas por el director especificado.
3. Si no se encuentran películas dirigidas por el director proporcionado, el sistema debe devolver un mensaje de error con un código de estado **404**.
4. Si el parámetro `director` está vacío o no es válido, el sistema debe devolver un mensaje de error con un código de estado **400**.

## Notas Técnicas

- Agregar un método `getMoviesByDirector` en el servicio `moviesService` para buscar películas por director.
- Actualizar el controlador `getAllMovies` para manejar el nuevo parámetro de consulta `director`.
- Asegurarse de que las búsquedas no sean sensibles a mayúsculas/minúsculas.

Probar la funcionalidad

1. **Caso 1: Buscar películas por director**
    - **Solicitud:** `GET /movies?director=Christopher Nolan`
2. **Caso 2: Buscar películas por coincidencia parcial**
    - **Solicitud:** `GET /movies?director=Nolan`
3. **Caso 3: Buscar películas con un director desconocido**
    - **Solicitud:** `GET /movies?director=Unknown Director`
4. **Caso 4: Parámetro `director` vacío**
    - **Solicitud:** `GET /movies?director=`