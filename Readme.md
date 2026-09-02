# Xvelopers

[xvelopers.org](https://www.xvelopers.org) es un proyecto creado para apoyar y celebrar a la comunidad dominicana de desarrollo de software; destaca a los desarrolladores que apoyan, contribuyen e influyen activamente en dicha comunidad.

Al igual que otros proyectos de la comunidad, este mantiene una invitación abierta a participar, hacer preguntas y contribuir. Otros proyectos comunitarios incluyen [emplea.do](https://emplea.do) ([repo](https://github.com/developersdo/empleo-dot-net)), [meta.do](https://meta.do) y [streamelopers.org](https://streamelopers.org).

---

## Tecnologías

- **React 18** (Modern functional components & hooks)
- **Vite** (Build tool y servidor de desarrollo ultra rápido)
- **Tailwind CSS** (Estilos modernos, responsivos y modo oscuro elegante)
- **Lucide Icons** (Iconografía limpia y accesible para enlaces comunitarios y redes sociales)

---

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- npm (o pnpm / yarn)

---

## Instalación y Desarrollo

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/raydelto/xvelopers.git
   cd xvelopers
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo local:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la aplicación.

4. **Compilar para producción:**
   ```bash
   npm run build
   ```
   Los archivos optimizados y minificados se generarán en la carpeta `dist/`.

5. **Previsualizar la compilación de producción:**
   ```bash
   npm run preview
   ```

6. **Desplegar a producción (con llaves SSH configuradas):**
   ```bash
   npm run deploy
   ```

---

## ¿Cómo agregar o actualizar a un Xveloper?

La lista de desarrolladores se encuentra en [`public/xvelopers.json`](public/xvelopers.json). Para agregar a un nuevo desarrollador o actualizar información existente:

1. Agrega la foto del desarrollador en `public/assets/img/xvelopers/nombre.jpg`.
2. Edita `public/xvelopers.json` con el nuevo registro:
   ```json
   {
     "id": "tunombrex",
     "name": "Tu NombreX",
     "description": "Tu descripción y aportes a la comunidad dominicana.",
     "image": "./assets/img/xvelopers/tunombrex.jpg",
     "links": [
       { "name": "GitHub", "icon": "github", "url": "https://github.com/tuusuario" },
       { "name": "Twitter", "icon": "twitter", "url": "https://twitter.com/tuusuario" }
     ]
   }
   ```
3. Envía un Pull Request al repositorio.

---

## Créditos

- **Proyecto original:** [Enmanuel Toribio](https://torib.io/)
- **Mantenimiento actual:** [Raydelto Hernández](https://www.raydelto.org/)
