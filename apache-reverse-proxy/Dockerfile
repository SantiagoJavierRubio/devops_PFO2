FROM httpd:2.4

# Activar los modulos necesarios
RUN echo "LoadModule proxy_module modules/mod_proxy.so" >> /usr/local/apache2/conf/httpd.conf && \
    echo "LoadModule proxy_http_module modules/mod_proxy_http.so" >> /usr/local/apache2/conf/httpd.conf

# Copiar el archivo proxy.conf
COPY proxy.conf /usr/local/apache2/conf/extra/proxy.conf

# Incluir la configuracion al final del archivo principal
RUN echo "Include conf/extra/proxy.conf" >> /usr/local/apache2/conf/httpd.conf
RUN rm /usr/local/apache2/htdocs/index.html
