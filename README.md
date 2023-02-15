# billing-ui

## Description

## Dockerizar

Ingresar por terminal al root del proyecto y ejecutar

```bash
# Construir la imagen desde Dockerfile
$ docker build -t billing-ui .

# Crear y Correr el contenedor
$ docker run --name billingUI -p 8080:8080 billing-ui

# Correr el contenedor ya creado.
$ docker start -i billingUI
```

Abrir el navegador en http://localhost:8080/

## Vite Modos

```bash
# Apunta a localhost
$ yarn run dev

# Apunta a test ( .env.test )
$ yarn run dev --mode test
```
