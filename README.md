# Grupo 20

Este es el repositorio del *Grupo 20*, cuyos integrantes son:

* Veronica Torres - 202373503-5
* Isidora Villegas - 202203026-7
* Alfonso Pavez - 202373613-9
* Martin Fonseca - 202373613-9
* **Tutor**: CAMILO JAVIER GONZALEZ ARAYA

## Wiki

* [Enlace de Acceso a Wiki](https://github.com/elmarto356/GRUPOInformagicos2025-PROYINF/wiki)

## Paso a Paso para levantar el proyecto

* [Levantar Proyecto](MontarProyecto.md)

## Videos

[Video presentación cliente](https://aula.usm.cl/mod/resource/view.php?id=6926137)

## Aspectos técnicos relevantes

* Al momento de levantar el proyecto mediante docker existe la posibilidad del error:
  ```batch
  failed to solve: error getting credentials - err: exit status 1, out:
  ```
  Su solución será:
  ```batch
  #Desde WSL
  docker logout
  docker pull node:20-alpine
  docker compose build --no-cache api
  docker compose up -d api
  ```
