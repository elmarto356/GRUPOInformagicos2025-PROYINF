

## 📋 **Prerrequisitos**
- Tener WSL2 instalado y configurado
- Ubuntu/Debian en WSL2

---

## 🚀 **Pasos de Configuración**

### **1. Actualizar el sistema**
```bash
sudo apt update && sudo apt upgrade -y
```

### **2. Instalar dependencias básicas**
```bash
sudo apt install -y python3 python3-pip python3-venv git
```

### **3. Instalar PostgreSQL**
```bash

sudo apt install -y postgresql postgresql-contrib

# iniciar el servicio
sudo service postgresql start

# configurar para inicio automático (opcional)
echo 'sudo service postgresql start' >> ~/.bashrc
```

### **4. Configurar PostgreSQL**
```bash
# conectar como usuario postgres
sudo -u postgres psql

# ejecutar los siguientes comandos dentro de PostgreSQL:
ALTER USER postgres PASSWORD 'postgres123';
CREATE DATABASE simulador_creditos;
GRANT ALL PRIVILEGES ON DATABASE simulador_creditos TO postgres;
\q
```

### **5. Clonar el proyecto**
```bash

git clone https://github.com/elmarto356/GRUPOInformagicos2025-PROYINF
cd simulador_credito
```

### **6. Configurar entorno virtual de Python**
```bash
# crear entorno virtual
python3 -m venv venv

# activar entorno virtual
source venv/bin/activate

# actualizar pip
pip install --upgrade pip

# instalar dependencias del proyecto
pip install -r requirements.txt
```

### **7. Configurar Django**
```bash
# verificar que el archivo settings.py tenga la configuración correcta (aunque ya deberia estar en el clone)

# aplicar migraciones
python manage.py migrate

# crear superusuario para acceder al admin
python manage.py createsuperuser
```

### **8. Probar que todo funciona**
```bash
# ejecutar servidor de desarrollo
python manage.py runserver

# En el navegador, visitar:
# http://127.0.0.1:8000 - Página principal
# http://127.0.0.1:8000/admin - Panel de administración
```

---

## ⚙️ **Configuración de settings.py**
**NOTA:** este archivo ya debe estar configurado en el repositorio, pero aquí está la configuración para referencia:

```python
# simulador_creditos/settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'simulador_creditos',
        'USER': 'postgres',
        'PASSWORD': 'postgres123',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

---

## 🔧 **Comandos útiles para el día a día**

### **Activar entorno virtual (siempre primero)**
```bash
source venv/bin/activate
```

### **Gestión de la base de datos**
```bash
# crear migraciones después de cambiar models.py
python manage.py makemigrations

# aplicar migraciones
python manage.py migrate

# acceder al shell de Django
python manage.py shell

# conectar directamente a PostgreSQL
sudo -u postgres psql simulador_creditos
```

### **Servidor de desarrollo**
```bash
# ejecutar servidor
python manage.py runserver

# ejecutar en puerto específico (por si acaso)
python manage.py runserver 8080
```

### **Gestión de PostgreSQL**
```bash
# verificar estado del servicio
sudo service postgresql status

# iniciar servicio (si no está corriendo)
sudo service postgresql start

# reiniciar servicio
sudo service postgresql restart
```

---

## **Solución de Problemas Comunes**

### **Error: "permission denied for schema public"**
```bash
sudo -u postgres psql
ALTER SCHEMA public OWNER TO postgres;
\q
```

### **Error: "no password supplied"**
Verifica que `settings.py` tenga la contraseña correcta: `'PASSWORD': 'postgres123'`

### **Error: "database does not exist"**
```bash
sudo -u postgres psql
CREATE DATABASE simulador_creditos;
\q
```

### **PostgreSQL no se conecta**
```bash
# Verificar que el servicio esté corriendo
sudo service postgresql status

# Si no está corriendo, iniciarlo
sudo service postgresql start
```

---

## 📁 **Estructura esperada del proyecto**
```
simulador_credito/
├── venv/                    # Entorno virtual (no está en git)
├── simulador_creditos/      # Configuración del proyecto
│   ├── __init__.py
│   ├── settings.py         # Configuración de BD ya incluida
│   ├── urls.py
│   └── wsgi.py
├── creditos/               # App principal
├── manage.py
├── requirements.txt        # Dependencias del proyecto
└── README.md
```

---

