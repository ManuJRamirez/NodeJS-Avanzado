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
```

## Start

Para arrancar el servidor en producción utilizaremos:

```sh
$ npm start nombreArchivo
```

Para hacerlo en modo developer:

```sh
# ATENCIÓN: debemos estar situados dentro de la carpeta "NodePoP" Este comando se actualizará de forma automática cada vez que realicemos cualquier cambio
$ npm run dev
```

## API Endpoints

### GET /api/anuncios

Desde PostMan usaremos el link:

http://localhost:3000/api/anuncios/

Nos devolverá todos los anuncios existentes en un JSON, tal y como se puede ver en el ejemplo

```json
      "result":
        {
            "_id": "6522fda96ac2c70b006a8edf",
            "nombre": "Bicicleta",
            "venta": true,
            "precio": 230.15,
            "foto": "bici.jpg",
            "tags": [
                "lifestyle",
                "motor"
            ],
            "__v": 0
        }
```

### GET /tags/

Para obtener un listado de todos los "tags" existentes en la base de datos usaremos el siguiente link en PostMan:

http://localhost:3000/api/anuncios/tags

### GET /:foto

Para obtener las imagenes pondremos en PostMan(o navegador) la siguiente url:

http://127.0.0.1:3000/images/nombreDeLaImagen

Ejemplo:
http://127.0.0.1:3000/images/ps5.jpg

### POST /api/anuncios

Para crear un anuncio, nos iremos al PostMan a la pestaña "body" y eligiremos la opción "x-www-form-urlencoded". Posteriormente iremos introduciendo los parametros(key) con su valor(value).

http://localhost:3000/api/anuncios/

Una vez introducidos los valores requeridos (nombre, venta, precio, foto y tags) nos devolvera el objeto creado en formato json como en el siguiente ejemplo:

```json
{
  "result": {
    "nombre": "Teclados",
    "venta": true,
    "precio": 18.36,
    "foto": "teclado.jpg",
    "tags": ["lifestyle", "mobile"],
    "_id": "652307485eb02e6af8fb5756",
    "__v": 0
  }
}
```

### GET -> Filtros

Para aplicar un filtro usaremos PostMan a la pestaña "params" he iremos introducion los filtros por los que queremos filtrar(nombre, venta, precio, tags, start, limit, sort, fields). Por ejemplo:

http://localhost:3000/api/anuncios/?tags=motor&venta=true&sort=precio&precio=300-30000

En este ejemplo estamos filtrando por el tags "motor", queremos que sea una venta de un producto, y el precio entre los 300 y los 30.000. Además lo queremos ordenado por precio de menos a mayor. En nuestra prueba, nos devolvería:

```json
{
  "result": [
    {
      "_id": "6522fda96ac2c70b006a8ee5",
      "nombre": "LLantas",
      "venta": true,
      "precio": 1350,
      "foto": "llantas.jpg",
      "tags": ["lifestyle", "motor"],
      "__v": 0
    },
    {
      "_id": "6522fda96ac2c70b006a8eee",
      "nombre": "Honda",
      "venta": true,
      "precio": 8000,
      "foto": "honda.jpg",
      "tags": ["lifestyle", "motor"],
      "__v": 0
    },
    {
      "_id": "6522fda96ac2c70b006a8eed",
      "nombre": "yamaha",
      "venta": true,
      "precio": 11000,
      "foto": "yamaha.jpg",
      "tags": ["lifestyle", "motor"],
      "__v": 0
    },
    {
      "_id": "6522fda96ac2c70b006a8ee2",
      "nombre": "Ducati",
      "venta": true,
      "precio": 20000,
      "foto": "ducati.jpg",
      "tags": ["lifestyle", "motor"],
      "__v": 0
    },
    {
      "_id": "6522fda96ac2c70b006a8ee3",
      "nombre": "Videojuego",
      "venta": true,
      "precio": 20000,
      "foto": "videojuego.jpg",
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
