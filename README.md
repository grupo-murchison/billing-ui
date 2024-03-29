# billing-ui

## Description

## ENVIRONMENT

Hacer una copia de _.env.test_, renombrarla como `.env.local` y actualizar los valores según el entorno local.

## File hosts config

Configuraciones a agregar al [archivo hosts](<https://en.wikipedia.org/wiki/Hosts_(file)#Location_in_the_file_system>) para billing:

```bash
# Billing
10.5.0.40 billing-ui-billing-ui.apps.ocp.tzarate.com.ar
10.5.0.40 billing-services-tzevent-mgr-stg.apps.ocp.tzarate.com.ar
10.5.0.40 billing-processor-tzevent-mgr-stg.apps.ocp.tzarate.com.ar
10.5.0.40 billing-report-tzevent-mgr-stg.apps.ocp.tzarate.com.ar
```

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

# Apuntando a .env.test
$ docker build -t billing-ui --build-arg NODE_ENV=test .

# Apuntando a .env.production
$ docker build -t billing-ui --build-arg NODE_ENV=production .
```

```bash
# Crear y Correr el contenedor
$ docker run --name billing-ui -p 8080:8080 billing-ui

# Correr el contenedor ya creado.
$ docker start -i billing-ui
```

Abrir el navegador en http://localhost:8080/
