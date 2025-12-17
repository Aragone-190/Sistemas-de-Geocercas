<h1 align="center">Sistema de Geocercas</h1>
<p align="center"><a href="#descripción">Descripción</a> - <a href="#funcionalidades-principales">Funcionalidades</a> - <a href="#tecnologías-utilizadas">Tecnologías</a></p>

## Descripción

Este proyecto es un sistema web para la visualización de geocercas que permite cargar archivos Excel con coordenadas geográficas y representarlas dinámicamente en un mapa interactivo. Cada geocerca se dibuja como un polígono utilizando Leaflet, con estilos automáticos, ventanas emergentes informativas y soporte para modo claro y modo oscuro. El sistema está diseñado para ofrecer una experiencia profesional, auditable y fácil de usar.

## Componentes Clave

*   **Cargador de Archivos** Excel Permite leer archivos .xlsx y .xls directamente desde el navegador y procesar las coordenadas de las geocercas.
*   **Motor de Mapas Interactivos** Implementado con Leaflet para navegación fluida, zoom y renderizado de polígonos.
*   **Gestor de Temas** Controla el modo claro y oscuro tanto de la interfaz como del mapa, almacenando la preferencia en localStorage.
*   **Renderizador de Geocercas** Convierte cadenas de coordenadas concatenadas en polígonos geográficos válidos.
*   **Capa de Interfaz de Usuario** Construida con Bootstrap 5, incluye navegación responsiva, iconos, badges, loaders y tarjetas.

## Funcionalidades Principales

*   Carga y visualización de múltiples geocercas desde archivos Excel
*   Coloreado automático de polígonos por sección
*   Modo claro y modo oscuro sincronizado entre UI y mapa
*   Pantalla de carga con duración fija para mejor experiencia de usuario
*   Contador de secciones cargadas
*   Botón de reinicio para limpiar el mapa
*   Diseño responsivo optimizado para paneles administrativos
*   Identificación del desarrollador y versión del sistema para auditoría

## Tecnologías Utilizadas

*   **Frontend**
*   HTML5
*   CSS3
*   JavaScript (ES6+)

**UI y Estilos**

*   Bootstrap 5
*   Bootstrap Icons
*   Google Fonts (Inter)

**Mapas**

*   Leaflet.js
*   OpenStreetMap
*   CartoDB Dark Matter

**Procesamiento de Datos**

*   SheetJS (XLSX)

**Almacenamiento**

*   localStorage del navegador

## Uso

1. Clona el repositorio
2. Abre `index.html` en tu navegador
3. Carga un archivo Excel con las geocercas
4. Visualiza y gestiona las secciones en el mapa


## Autor

Desarrollado por **Ing. Edwin Calderón**  
Versión: **v1.0.0**
