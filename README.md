# Plataforma Digital Hidalgo

Plataforma institucional de la Agencia Estatal de Simplificación y Digitalización del Estado de Hidalgo.

## 🚀 Despliegue con Docker + GitHub

### Paso 1: Subir a GitHub
```bash
git init
git add .
git commit -m "Initial commit - Plataforma Digital Hidalgo"
git branch -M main
git remote add origin https://github.com/tu-usuario/hidalgo-digital-platform.git
git push -u origin main
```

### Paso 2: Desplegar en VPS Hostinger
```bash
# En tu VPS Rocky Linux
git clone https://github.com/tu-usuario/hidalgo-digital-platform.git
cd hidalgo-digital-platform

# Ejecutar con Docker Compose
docker-compose up -d

# Abrir puerto en firewall
sudo firewall-cmd --permanent --add-port=8444/tcp
sudo firewall-cmd --reload
```

### Acceso Final
**URL**: https://srv885729.hstgr.cloud:8444

## 🐳 Configuración Docker

- **Puerto**: 8444 (evita conflicto con 8443)
- **Imagen**: Nginx Alpine (ligera y eficiente)
- **Reinicio**: Automático (`unless-stopped`)
- **Logs**: Mapeados a `./logs/`

## 📁 Estructura del Proyecto

```
hidalgo-platform/
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── script.js               # Funcionalidad JavaScript
├── assets/                 # Recursos multimedia
├── Dockerfile              # Imagen Docker
├── docker-compose.yml      # Orquestación
├── nginx.conf              # Configuración Nginx
├── deploy-docker.sh        # Script automatizado
├── .gitignore              # Exclusiones Git
└── README.md               # Esta documentación
```

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Servidor**: Nginx Alpine
- **Contenedores**: Docker + Docker Compose
- **Fuentes**: Montserrat (Google Fonts)
- **Iconos**: Font Awesome 6

## 📋 Secciones de la Plataforma

- **Inicio**: Presentación institucional y video del secretario
- **Estrategia Digital**: Cuatro pilares estratégicos
- **Panel de Avances**: Métricas e indicadores clave (después de Estrategia)
- **Micrositios**: Acceso directo a plataformas especializadas
- **Ubicaciones**: Mapa interactivo de oficinas gubernamentales
- **Educación Digital**: Recursos y capacitación
- **Participación**: Canales de comunicación ciudadana
- **Noticias**: Comunicados y actualizaciones

## 🔧 Comandos Útiles

```bash
# Ver logs del contenedor
docker logs hidalgo-digital-platform

# Reiniciar servicio
docker restart hidalgo-digital-platform

# Actualizar después de cambios en GitHub
git pull && docker-compose up -d --build

# Detener servicio
docker-compose down

# Ver estado
docker ps | grep hidalgo
```

## 🌐 Características

- **Login LlaveMX**: Botón institucional con icono de usuario
- **Mapa interactivo**: Búsqueda de oficinas gubernamentales
- **Timeline**: Logros desde 2022 hasta 2026
- **Responsive**: Optimizado para todos los dispositivos
- **SEO**: Meta tags y estructura semántica

## 📄 Licencia

© 2025 Gobierno del Estado de Hidalgo. Todos los derechos reservados.
