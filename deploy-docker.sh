#!/bin/bash

# Script de despliegue con Docker para VPS Hostinger
# Plataforma Digital Hidalgo - Puerto 8444

echo "🐳 Despliegue con Docker - Plataforma Digital Hidalgo"

# Variables
PROJECT_NAME="hidalgo-platform"
PORT="8444"
CONTAINER_NAME="hidalgo-digital-platform"

# 1. Clonar desde GitHub (reemplaza con tu repo)
echo "📥 Clonando repositorio..."
git clone https://github.com/tu-usuario/hidalgo-digital-platform.git
cd hidalgo-digital-platform

# 2. Construir imagen Docker
echo "🔨 Construyendo imagen Docker..."
docker build -t $PROJECT_NAME .

# 3. Detener contenedor existente si existe
echo "🛑 Deteniendo contenedor existente..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# 4. Ejecutar nuevo contenedor
echo "🚀 Iniciando contenedor..."
docker run -d \
  --name $CONTAINER_NAME \
  --restart unless-stopped \
  -p $PORT:80 \
  $PROJECT_NAME

# 5. Configurar firewall
echo "🔥 Configurando firewall..."
sudo firewall-cmd --permanent --add-port=$PORT/tcp
sudo firewall-cmd --reload

# 6. Verificar estado
echo "📊 Verificando estado..."
docker ps | grep $CONTAINER_NAME

echo ""
echo "🎉 ¡Despliegue completado!"
echo "🌐 Acceso: https://srv885729.hstgr.cloud:$PORT"
echo "📝 Logs: docker logs $CONTAINER_NAME"
echo "🔄 Reiniciar: docker restart $CONTAINER_NAME"
echo ""
