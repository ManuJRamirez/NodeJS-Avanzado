## Entrega práctica NodeJs - MongoDB - Express

## Install

Instalar dependencias:

```sh
$ npm install
```

La configuración de la conexion a la base de dato MongoDB se encuentra en el archivo "/lib/connectMongoose.js

Para cargar los datos pre-establecidos en el archivo "anuncio.json" utilizaremos el comando:

```sh
# ATENCION: Este comando borrará todos los datos que existieran anteriormente en la base de datos
$ npm run init-db
# Una vez ejecutado el script pulsar CTRL + C y seguir con la letra "s" + enter para pararlo.
```

## Start

Para arrancar el servidor en producción utilizaremos:

```sh
$ npm start nombreArchivo
```

Para hacerlo en modo developer:

```sh
# ATENCIÓN: debemos estar situados dentro de la carpeta "NodePoP". Este comando se actualizará de forma automática cada vez que realicemos cualquier cambio
$ npm run dev

# pulsar CTRL + C y seguir con la letra "s" + enter para pararlo
```

```sh
# Arrancamos el worker que realiza los thumbnails.

$ npm run thumbnail-maker-service

# pulsar CTRL + C y seguir con la letra "s" + enter para pararlo

```

## Imagenes subidas y thumbnails

Las imagenes subidas a traves del metodo POST al API, a la hora de crear un anuncio, se guardarán en la carpeta "./public/images".

Los thumbnails se crearán de forma automática a la hora de hacer el POST de creación de anuncios y se guardarán en la carpeta "./public/thumbnails". Es muy importante que el worker esté arrancado.

## API Endpoints

## Autenticación POST /api/authenticate

Para poder acceder a todos los link que pertenezcan a la "api" "/api/..." debemos disponer de un token que el backend nos va a proveer. Para obtenerlo tendremos que poner nuestro email y contraseña. en el archivo init-db.js tenemos que la cuenta ADMIN por defecto será:

```json
{ email: user@example.com, password: 1234 },
```

Nos devolverá:

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE0MTBjMmE2ZGE3NDEwMGU4YTA2OWQiLCJpYXQiOjE3MDUyNTI3NTEsImV4cCI6MTcwNTI1MzA1MX0._XrwP7593TmBdXId2qPzLhFOHmBfcg7astc2ftnW7TI"

  // ATENCIÓN: El JWT tiene una duración de 5 minutos. Una vez pasado este tiempo, debemos solicitar uno nuevo (se podrá ampliar el tiempo en el archivo AuthJWSController.js).
}
```

Una vez que el backend nos envie el JWT, debemos adjuntadlo en el HEADER con la key de "Authorization" y el JWT en el value para cualquier petición que queramos hacer en /api/...

Si el token que aportamos en las peticiones al API es incorrecto, no aportamos ninguno o está caducado, debemos solicitar uno nuevo con nuestro email y contraseña correcta.

```json
{
  "error": "No autorizado. Token caducado"
}
```

### GET /api/anuncios (requiere JWT)

Desde PostMan usaremos el link:

http://localhost:3000/api/anuncios/

Nos devolverá todos los anuncios existentes en un JSON, tal y como se puede ver en el ejemplo

```json
      "result":
        {
          "nombre": "Bicicleta",
            "venta": true,
            "precio": 230.15,
            "_id": "6522fda96ac2c70b006a8edf",
            "foto": "1705254611382-foto-reloj.jpg",
            "tags": [
                "lifestyle",
                "motor"
            ],
            "__v": 0
        }
```

### GET /tags/ (requiere JWT)

Para obtener un listado de todos los "tags" existentes en la base de datos usaremos el siguiente link en PostMan:

http://localhost:3000/api/anuncios/tags

### GET /:foto

Para obtener las imagenes pondremos en PostMan(o navegador) la siguiente url:

http://127.0.0.1:3000/images/nombreDeLaImagen

Ejemplo:
http://127.0.0.1:3000/images/ps5.jpg

### POST /api/anuncios (requiere JWT)

Para crear un anuncio, nos iremos al PostMan a la pestaña "body" y eligiremos la opción "x-www-form-urlencoded". Posteriormente iremos introduciendo los parametros(key) con su valor(value). En la key de foto debemos seleccionar el "type: file" y añadir en el value una imagen.

> - ¡¡¡MUY IMPORTANTE!!! Los formatos de imagen deben ser: bmp, gif, jpeg/jpg, png o tiff. No valen imagenes reconvertidas de webpp o similar. Si no seguimos este paso, el worker que realiza el thumbnail, usando la librería "jimp", fallará y tendremos que purgar la cola, a través de la web RabbitMQ Management (pestaña Queues and Streams -> Purge), para que pueda seguir trabajando.

http://localhost:3000/api/anuncios/

Una vez introducidos los valores requeridos (nombre, venta, precio, foto y tags) nos devolverá el objeto creado en formato json como en el siguiente ejemplo:

```json
{
  "result": {
    "nombre": "hola1",
    "venta": true,
    "precio": 4654,
    "tags": ["[motor]"],
    "_id": "65a41ed30399d63aa0beb27b",
    "foto": "1705254611382-foto-reloj.jpg",
    "__v": 0
  }
}
```

### GET -> Filtros (requiere JWT)

Para aplicar un filtro usaremos PostMan a la pestaña "params" he iremos introducion los filtros por los que queremos filtrar(nombre, venta, precio, tags, start, limit, sort, fields). Por ejemplo:

http://localhost:3000/api/anuncios/?tags=motor&venta=true&sort=precio&precio=300-30000

En este ejemplo estamos filtrando por el tags "motor", queremos que sea una venta de un producto, y el precio entre los 300 y los 30.000. Además lo queremos ordenado por precio de menos a mayor. En nuestra prueba, nos devolvería:

```json
{
  "result": [
    {
      "nombre": "LLantas",
      "venta": true,
      "precio": 1350,
      "_id": "6522fda96ac2c70b006a8ee5",
      "foto": "1705255796749-foto-llantas.jpg",
      "tags": ["lifestyle", "motor"],
      "__v": 0
    },
    {
      "nombre": "Honda",
      "venta": true,
      "precio": 8000,
      "_id": "6522fda96ac2c70b006a8eee",
      "foto": "1705255816095-foto-honda.jpg",
      "tags": ["lifestyle", "motor"],
      "__v": 0
    },
    {
      "nombre": "yamaha",
      "venta": true,
      "precio": 11000,
      "_id": "6522fda96ac2c70b006a8eed",
      "foto": "1705255842229-foto-yamaha.jpg",
      "tags": ["lifestyle", "motor"],
      "__v": 0
    },
    {
      "nombre": "Ducati",
      "venta": true,
      "precio": 20000,
      "_id": "6522fda96ac2c70b006a8ee2",
      "foto": "1705255860230-foto-ducati.jpg",
      "tags": ["lifestyle", "motor"],
      "__v": 0
    },
    {
      "nombre": "Videojuego",
      "venta": true,
      "precio": 20000,
      "_id": "6522fda96ac2c70b006a8ee3",
      "foto": "1705255874747-foto-videojuego.jpg",
      "tags": ["lifestyle", "motor"],
      "__v": 0
    }
  ]
}
```

### Filtros a través del explorador

Para poner los filtros en el explorador, no hará falta escribir /api/anuncios. Sino que bastará con aplicarlos en la url inicial. Por ejeemplo:

#### Sin filtros:

http://localhost:3000

#### Con filtros:

http://localhost:3000/?start=1&limit=3&sort=name&tag=lifestyle

La web cargará y mostrará los anuncios que cumplan con las condiciones que le hemos pedido.

### Swagger /api-doc

Podemos acceder y probar nuestra API a través del link:

http://localhost:3000/api/api-doc/
