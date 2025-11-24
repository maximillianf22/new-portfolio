# Portfolio Personal

Portfolio web desarrollado con React, TypeScript y Vite. Incluye secciones de proyectos, experiencia, habilidades y un playground interactivo.

## Tecnologías

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/maximillianf22/new-portfolio.git
   cd new-portfolio
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y agrega:
   ```
   VITE_DEEPSEEK_API_KEY=tu_api_key_aqui
   ```
   **IMPORTANTE:** No subas el archivo `.env` al repositorio. Ya está incluido en `.gitignore`.

4. Ejecuta el proyecto en modo desarrollo:

   ```bash
   npm run dev
   ```

5. Construye para producción:
   ```bash
   npm run build
   ```

## Estructura del Proyecto

- `components/` - Componentes React reutilizables
- `data.ts` - Datos del portfolio (proyectos, experiencia, etc.)
- `utils/` - Utilidades y helpers
- `public/` - Assets estáticos

## Licencia

MIT
