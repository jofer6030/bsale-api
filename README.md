# API - Tienda Online Bsale

REST API para el listado de productos, esto comprende:

- Listado por categoria del producto
- Buscador por nombre del producto
- Filtrado por atributos del producto:
  - Intervalo de Precios
  - Productos con porcentaje de descuento
- Orden y paginacion de producto

## Estructura JSON de Productos

```json
{
  "id": 6,
  "name": "ENERGETICA RED BULL",
  "url_image": "https://dojiw2m9tvv09.cloudfront.11132/productredbull8381.jpg",
  "price": 1490,
  "discount": 0,
  "category": 1
},
```

- **name** : Nombre de producto.
- **url_image** : Url de la imagen del producto.
- **price** : Precio del producto.
- **discount** : Porcentaje de descuento del producto.
- **category** : Id de la categoria del producto.

### GET lista de productos

`GET /api/vi/product/list` retorna la lista de productos.

#### Query Parameters

- **limit** : Limita la cantidad de items de una respuesta JSON, por default es _10_.
- **offset** : Desplaza el inicio de la lista de productos, por default es _0_.
- **search** : Busca un producto por nombre, por default es _null_.
- **order** : Ordena la lista de productos por nombre, por default es _null_.

##### Ejemplos

- `GET /api/vi/product/list?limit=10&offset=0`
- `GET /api/vi/product/list?search=pisco`
- `GET /api/vi/product/list?search=pisco&limit=10&offset=0`
- `GET /api/vi/product/list?order=desc`

#### Respuesta

```json
{
  "msg": "Products fetched successfully",
  "count": 57,
  "limit": 2,
  "offset": 0,
  "products": [
    {
      "id": 5,
      "name": "ENERGETICA MR BIG",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
      "price": 1490,
      "discount": 20,
      "category": 1
    },
    {
      "id": 6,
      "name": "ENERGETICA RED BULL",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg",
      "price": 1490,
      "discount": 0,
      "category": 1
    }
  ]
}
```

### GET lista de productos por categoria

`GET /api/vi/product/list/{category}` retorna la lista de productos por nombre de la categoría.

#### Query Parameters

- **limit** : Limita la cantidad de items de una respuesta JSON, por default es _10_.
- **offset** : Desplaza el inicio de la lista de productos, por default es _0_.
- **order** : Ordena la lista de productos por nombre, por default es _null_.

##### Ejemplos

- `GET /api/vi/product/list/pisco`
- `GET /api/vi/product/list/bebida?limit=10&offset=0`
- `GET /api/vi/product/list/bebida?order=asc`

```json
{
  "msg": "Products fetched by category successfully",
  "categoryId": 4,
  "count": 7,
  "limit": 2,
  "offset": 0,
  "products": [
    {
      "id": 37,
      "name": "COCA COLA ZERO DESECHABLE",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net11132product/cocazero9766.jpg",
      "price": 1490,
      "discount": 0,
      "category": "bebida"
    },
    {
      "id": 48,
      "name": "SPRITE 1 1/2 Lts",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net11132product/sprite-lata-33cl5575.jpg",
      "price": 1500,
      "discount": 0,
      "category": "bebida"
    }
  ]
}
```
