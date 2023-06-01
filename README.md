# billing-ui

## Description

## ENVIRONMENT

Hacer una copia de _.env.test_, renombrarla como `.env.local` y actualizar los valores según el entorno local.

## Vite Modos

```bash
# Apunta a localhost ( .env.local )
$ yarn run dev

# Apunta a test ( .env.test )
$ yarn run dev -- --mode=test
```

### Dockerizar

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
