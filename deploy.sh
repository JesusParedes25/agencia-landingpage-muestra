#!/bin/bash

# Script de despliegue rápido para VPS Hostinger Rocky Linux
# Plataforma Digital Hidalgo

echo "🚀 Iniciando despliegue de Plataforma Digital Hidalgo..."

# Variables de configuración
PROJECT_NAME="hidalgo-platform"
PORT="8085"
WEB_DIR="/var/www/$PROJECT_NAME"
NGINX_CONF="/etc/nginx/conf.d/$PROJECT_NAME.conf"

# 1. Crear directorio web
echo "📁 Creando directorio web..."
sudo mkdir -p $WEB_DIR

# 2. Copiar archivos (asumiendo que están en el directorio actual)
echo "📋 Copiando archivos..."
sudo cp index.html $WEB_DIR/
sudo cp styles.css $WEB_DIR/
sudo cp script.js $WEB_DIR/
sudo cp README.md $WEB_DIR/
sudo cp -r assets/ $WEB_DIR/ 2>/dev/null || echo "Directorio assets no encontrado, continuando..."

# 3. Configurar permisos
echo "🔐 Configurando permisos..."
sudo chown -R nginx:nginx $WEB_DIR
sudo chmod -R 755 $WEB_DIR

# 4. Crear configuración de Nginx
echo "⚙️ Configurando Nginx..."
sudo tee $NGINX_CONF > /dev/null <<EOF
server {
    listen $PORT;
    server_name _;
    
    root $WEB_DIR;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ =404;
    }
    
    # Cache para assets estáticos
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Headers de seguridad
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
EOF

# 5. Verificar y recargar Nginx
echo "🔍 Verificando configuración de Nginx..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Configuración válida, recargando Nginx..."
    sudo systemctl reload nginx
else
    echo "❌ Error en configuración de Nginx"
    exit 1
fi

# 6. Configurar firewall
echo "🔥 Configurando firewall..."
sudo firewall-cmd --permanent --add-port=$PORT/tcp
sudo firewall-cmd --reload

# 7. Verificar estado
echo "📊 Verificando estado del servicio..."
sudo systemctl status nginx --no-pager

echo ""
echo "🎉 ¡Despliegue completado!"
echo "🌐 Tu plataforma está disponible en: http://tu-servidor.com:$PORT"
echo "📝 Para verificar logs: sudo tail -f /var/log/nginx/error.log"
echo ""
