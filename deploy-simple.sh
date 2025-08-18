#!/bin/bash

# Despliegue súper simple con Python HTTP Server
# Puerto 8085 para evitar conflictos

echo "🚀 Despliegue rápido - Plataforma Digital Hidalgo"

# Variables
PORT="8085"
PROJECT_DIR="/home/$(whoami)/hidalgo-platform"

# Crear directorio
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

echo "📁 Directorio creado en: $PROJECT_DIR"
echo "📋 Copia tus archivos aquí y ejecuta:"
echo ""
echo "python3 -m http.server $PORT"
echo ""
echo "🌐 Acceso: http://tu-servidor.com:$PORT"
echo "🔥 Abrir puerto: sudo firewall-cmd --permanent --add-port=$PORT/tcp && sudo firewall-cmd --reload"
