# HUB Académico — Cuerpo Académico UAS-CA-318
### *Estudios Políticos, Políticas Públicas y Gobernanza Democrática*
**Universidad Autónoma de Sinaloa (UAS) • Unidad Regional Norte (Los Mochis)**  
*Facultad de Derecho y Ciencia Política*

---

## 🏛️ Descripción del Proyecto

Plataforma web tipo **HUB de Investigación** diseñada para centralizar, difundir y consultar la producción científica, proyectos, papers y eventos académicos de los profesores investigadores en Ciencia Política adscritos a la Unidad Regional Norte (Los Mochis, Sinaloa).

El proyecto implementa la identidad institucional de la **Universidad Autónoma de Sinaloa** extraída del *Manual de Identidad Gráfica Oficial* (Azul UAS `#08338F`, Dorado `#C49E0D` / `#877514`, imagotipo e imago oficial) combinada con el sistema de diseño editorial **Style: Serif** (*Playfair Display*, *Source Sans 3*, *IBM Plex Mono*, filetes y reglas de 1px, pequeños capitales con tracking generoso y espacios de lectura sosegados).

---

## ✨ Características Principales

1. **Fichas Personales de Investigadores**:
   - Perfil con fotografía en alta resolución, grado académico, nombramiento SNII (Conahcyt) y perfil deseable PRODEP.
   - Resumen curricular, líneas de especialización y métricas (artículos, libros, citas).
   - Botón directo para ingresar al **Expediente Académico Completo** (dossier).
   - Opción para abrir en pestaña independiente del navegador con enlace directo (`?profesor=id`).

2. **Dossier / Expediente Profesional del Investigador**:
   - Biografía ampliada, cronología de formación académica y reconocimientos.
   - Catálogo clasificado de trabajos: *Artículos Indexados (JCR/Scopus)*, *Libros y Capítulos*, *Proyectos Financiados*, *Dirección de Tesis* y *Conferencias*.
   - Buscador en tiempo real y selector de año dentro del expediente.
   - Resúmenes/Abstracts colapsables.
   - Modal de citación inmediata en **APA 7ma Edición**, **Chicago** y formato **BibTeX** para Overleaf/Zotero.
   - Botón para alternar rápidamente al expediente del colega investigador.
   - Opción de impresión (`window.print()`).

3. **Repositorio Unificado de Papers y Publicaciones**:
   - Buscador por texto en vivo (título, autor, revista o palabra clave).
   - Filtros combinados por investigador, tipo de documento y año.
   - Acceso a identificadores DOI y descarga de documentos.

4. **Líneas de Generación y Aplicación del Conocimiento (LGAC)**:
   - Registro de las 3 líneas prioritarias dictaminadas ante PRODEP con proyectos vigentes.

5. **Agenda de Eventos y Coloquios**:
   - Difusión de seminarios permanentes, coloquios nacionales y presentaciones editoriales en Los Mochis.

6. **⚙️ Dashboard de Gestión de Eventos en Vivo**:
   - Panel interactivo para **crear, editar, clasificar y eliminar eventos académicos** en los que participan los profesores investigadores.
   - **Sincronización en vivo instantánea**: Cualquier cambio se refleja inmediatamente en el portal público sin necesidad de recargar la página.
   - **Persistencia triple**: Guarda en el estado reactivo de React, en `localStorage` del navegador y físicamente en el archivo de disco `src/data/liveEvents.json` a través del middleware de Vite (`/api/events`).
   - Opción para exportar el respaldo en JSON o restaurar los eventos predeterminados de la UAS.
   - Acceso desde el botón *"⚙️ Gestor Eventos"* en la barra de navegación o mediante el parámetro `?dashboard=true`.

7. **Directorio Institucional y Contacto**:
   - Ubicación en Ciudad Universitaria Los Mochis, cubículos, teléfonos y correos institucionales.

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

1. **Instalar dependencias** (si aún no se han instalado):
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abrir en el navegador la dirección: [http://localhost:5173/](http://localhost:5173/)

3. **Construir para producción**:
   ```bash
   npm run build
   ```

---

## 📂 Estructura del Código

```
├── public/
│   └── assets/                     # Logotipos oficiales UAS, imagotipo y retratos
│       ├── uas_imago.png
│       ├── uas_imagotipo.png
│       ├── dra_celia_gastelum.jpg
│       └── dr_roberto_valenzuela.jpg
├── src/
│   ├── data/
│   │   └── academicData.js         # ARCHIVO CENTRAL: Datos editables de profesores, papers y eventos
│   ├── components/
│   │   ├── Navbar.jsx              # Barra superior con identidad UAS y navegación
│   │   ├── Hero.jsx                # Portada editorial con estadísticas en display
│   │   ├── ProfessorsSection.jsx   # Fichas personales de los profesores investigadores
│   │   ├── ProfessorDossierView.jsx# Vista/Pestaña de expediente completo de trabajos
│   │   ├── PublicationsHub.jsx     # Repositorio unificado con buscador y filtros
│   │   ├── LgacSection.jsx         # Líneas de investigación PRODEP
│   │   ├── EventsSection.jsx       # Calendario de eventos y coloquios
│   │   ├── CitationModal.jsx       # Modal de copiado en APA 7, Chicago y BibTeX
│   │   └── Footer.jsx              # Pie institucional con directorio UAS Los Mochis
│   ├── App.jsx                     # Enrutador por estado de URL (?profesor=id)
│   ├── index.css                   # Sistema de diseño Style: Serif + Identidad UAS
│   └── main.jsx                    # Punto de entrada de la aplicación
└── index.html                      # Fuentes de Google Fonts (Playfair Display, Source Sans 3, IBM Plex Mono)
```

---

## 📝 Cómo Editar o Agregar Nuevos Trabajos o Profesores

Todos los datos se administran en un solo archivo: [`src/data/academicData.js`](file:///c:/Users/detan/OneDrive/Escritorio/Cuerpo%20Academico/src/data/academicData.js).

Para añadir un nuevo artículo a un profesor, simplemente agrega un objeto al arreglo `trabajos`:

```javascript
{
  id: "cg-art-nuevo",
  tipo: "Artículo",
  tipoDetalle: "Revista Indexada (Scopus Q1)",
  titulo: "Título de la investigación...",
  revista: "Nombre de la Revista",
  volumen: "Vol. X, Núm. Y, pp. 1-25",
  anio: 2025,
  doi: "10.xxxx/yyyy",
  resumen: "Resumen breve del artículo...",
  autores: "Gastélum Norzagaray, C. M.",
  citas: 0,
  enlace: "https://doi.org/10.xxxx/yyyy",
  bibtex: `@article{...}`
}
```
