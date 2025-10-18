## 📋 **Prerrequisitos**
- Tener **WSL2** instalado y configurado
- Ubuntu/Debian en WSL2
- **Docker Desktop** instalado con **WSL integration** activada para distro. Importante **abrir antes del paso 2**
- (Opcional) _curl_ o _psql_ para probar desde terminal

---

## 🚀 **Pasos de Configuración**

### **1. Clonar el proyecto**
```bash

git clone https://github.com/elmarto356/GRUPOInformagicos2025-PROYINF/tree/main
cd GRUPOInformagicos2025-PROYINF

```

### **2. Levantar servicios**
```bash
docker compose up -d --build
```

### **5. Verificar funcionamiento óptimo**
```bash
docker compose ps
```

---

## 🌐 **Servicios disponibles**

- Frontend (React CRA) → http://localhost:3000
- API (Node/Express) → http://localhost:8080
- PostgreSQL → localhost:5432
    * Usuario: user
    * Contraseña: password
    * Base: mydb
- pgAdmin → http://localhost:5050
    * Email: admin@admin.com
    * Password: admin
  
    **Configuración**:
  
      1. Luego de inicia sesión se debe crear un nuevo servidor, para ello ir a 'Add New Server'
      2. General -> Name: postgres
      3. Connection Host name/adress: postgres_db, Port: 5432, Maintenance database: mydb, Username: user, Password: password
      4. Save

---

## 🧪 **Endpoints de prueba**

API Hello
```bash
curl http://localhost:8080/api/hello
```
Respuesta:
```bash
{ "ok": true, "msg": "Hola desde API" }
```
Conexión a DB:
```bash
curl http://localhost:8080/api/health/db
```
Respuesta:
```bash
{ "status": "ok", "time": "..." }
```
---

## 🔧 **Comandos útiles**

Logs:
```bash
docker compose logs -f api
docker compose logs -f web
docker compose logs -f postgres_db
```
Reiniciar solo un servicio:
```bash
docker compose build api && docker compose up -d api
```
Entrar a un contenedor:
```bash
docker compose exec api sh
```
Apagar todo:
```bash
docker compose down
```
Resetear DB:
```bash
docker compose down -v #considerar que al realizar esto se resetea a la vez TODA la base de datos
```
Actualizar cambios en la base de datos:
```bash
docker compose build --no-cache api
docker compose up -d api
```
Verificar tablas presentes en la base de datos:
```bash
docker compose exec postgres_db psql -U user -d mydb -c "SELECT name, applied_at FROM schema_migrations ORDER BY applied_at;"
```