import { AppData } from './types';

export const data: AppData = {
  "profile": {
    "name": "Maximillian Fernandez",
    "phone": "+57 305 2607055",
    "email": "maximillianf22@gmail.com",
    "location": "Barranquilla, Colombia",
    "avatar": "/images/profile.jpg",
    "links": {
      "linkedin": "https://www.linkedin.com/in/maximillian548870154/",
      "github": "https://github.com/maximillianf22",
      "whatsapp": "https://api.whatsapp.com/send/?phone=573052607055&text&type=phone_number&app_absent=0"
    }
  },
  "spanish": {
    "headline": "Líder Técnico de Producto & Frontend Senior",
    "sub_headline": "Cerrando la brecha entre Diseño, Ingeniería y Negocio",
    "summary": "Ingeniero de Software y Líder Técnico con 10 años de experiencia, especializado en Arquitectura Frontend. Mi enfoque combina la precisión técnica (React/Next.js) con la sensibilidad de producto (UX/UI), traduciendo requisitos complejos en interfaces escalables. Valoro la claridad en la documentación y el intercambio de conocimiento como base para el éxito del equipo.",
    "experience": [
      {
        "company": "HUMANCORE AI",
        "location": "Remoto, EE.UU.",
        "role": "Líder Técnico de Producto & Frontend Senior",
        "dates": "2023 – Presente",
        "highlights": [
          "Arquitectura Frontend: Estructuré el núcleo del proyecto desde cero (Next.js App Router, TypeScript) para manejar lógica 'multijugador' en tiempo real.",
          "UX/UI & Producto: Diseñé la interfaz 'Advisor' en Figma, transformando datos psicológicos complejos en acciones simples.",
          "Innovación con IA: Integración de LLMs para ofrecer coaching personalizado a escala.",
          "Impacto: Reconocido por liderazgo técnico y ejecución completa de reportes de insights clave."
        ]
      },
      {
        "company": "LAIKA MASCOTAS",
        "location": "Barranquilla, Colombia",
        "role": "Frontend Senior & Tech Lead",
        "dates": "2022 – 2023",
        "highlights": [
          "Re-platforming: Arquitecté y lideré la migración completa de un monolito PHP legado a una arquitectura frontend moderna desde cero.",
          "Liderazgo de Squad: Dirigí un equipo de 16 desarrolladores, asegurando calidad de código y entregas puntuales.",
          "Escalabilidad Global: Habilité el lanzamiento de tiendas localizadas para MX y CL mediante una arquitectura i18n robusta.",
          "Legado: Entregué documentación técnica completa y entrené al equipo para garantizar la mantenibilidad post-salida."
        ]
      },
      {
        "company": "IKATECH SOLUTIONS",
        "location": "Remoto",
        "role": "Desarrollador Frontend Senior & Diseñador UX/UI",
        "dates": "2020 – 2021",
        "highlights": [
          "Modernización: Rediseño UX/UI y arquitectura para la versión 2.0.",
          "Migración: Transición de sistemas legados a React y TypeScript."
        ]
      },
      {
        "company": "DEVELOPAPP SAS",
        "location": "Barranquilla, Colombia",
        "role": "Desarrollador Frontend",
        "dates": "2018 – 2020",
        "highlights": [
          "Multi-Industria: Liderazgo frontend para Fintech, E-Commerce y SaaS.",
          "Gestión: Implementación de estrategias Scrum para entregas puntuales."
        ]
      },
      {
        "company": "GOBIERNO DEL ESTADO LARA",
        "location": "Venezuela",
        "role": "Desarrollador Web",
        "dates": "2017 – 2018",
        "highlights": [
          "Gran Escala: Sistema de gestión académica para 20.000+ estudiantes.",
          "Automatización: Reemplazo de entrada manual de datos con soluciones digitales."
        ]
      },
      {
        "company": "EMERSON FREITES ACADEMY",
        "location": "Venezuela",
        "role": "Desarrollador Web (Freelance)",
        "dates": "2017",
        "highlights": [
          "Software de Gestión: Solución para emisión automática de certificados PDF."
        ]
      },
      {
        "company": "GOBIERNO DEL ESTADO LARA",
        "location": "Venezuela",
        "role": "Desarrollador de Software",
        "dates": "2016 – 2017",
        "highlights": [
          "Gestión Documental: Software interno reduciendo tiempos de respuesta en un 50%."
        ]
      }
    ],
    "skills": {
      "Frontend Architecture": "Next.js, React, TypeScript, Vue, Turborepo",
      "Modern UI & Styling": "Tailwind CSS, Shadcn/UI, Framer Motion, CSS Modules, Responsive Design",
      "AI & Innovation": "LLMs Integration (OpenAI, Anthropic), Generative UI, Prompt Engineering",
      "State & Data": "GraphQL (Apollo), TanStack Query, Server Actions, RESTful APIs",
      "Product Design": "Figma (Dev Mode, Design Systems), UX/UI Prototyping, Adobe XD",
      "Tools & Methods": "Git, CI/CD, Agile/Scrum, Jira, Vercel Deployment, Docker"
    },
    "education": [
      {
        "degree": "Ingeniería en Informática",
        "institution": "Universidad Rómulo Gallegos",
        "year": "2016"
      }
    ],
    "testimonials": [
      {
        "id": "t1",
        "name": "Andrew Papa",
        "role": "Product Lead",
        "company": "Humancore AI",
        "content": "Me gusta tu diseño para el reporte de insights, Max. ¡Buen trabajo, gracias por llevar eso hasta su finalización!"
      },
      {
        "id": "t2",
        "name": "Robert Stephens",
        "role": "CTO",
        "company": "Humancore AI",
        "content": "Apreciamos todo tu arduo trabajo y te valoramos enormemente. (Reconocimiento otorgado junto con bono de desempeño)."
      },
      {
        "id": "t3",
        "name": "Douglas Acosta",
        "role": "Full Stack Engineer",
        "company": "",
        "content": "Maximilian is an excellent developer, with a high sense of detail and always motivated. All the designs he has done are really impressive, for this and other skills I recommend Max for any related position, he is a valuable resource for any company."
      },
      {
        "id": "t4",
        "name": "Esael Angel",
        "role": "CTO",
        "company": "Laika Mascotas",
        "content": "Great Job with the new web 3.0"
      }
    ],
    "articles": [
      {
        "id": "article-1",
        "title": "Arquitecturando Contexto Multijugador en Tiempo Real con Next.js",
        "date": "2024",
        "description": "Cómo construí un sistema escalable en tiempo real usando Next.js App Router, WebSockets y React Server Components para manejar interacciones concurrentes de usuarios a escala.",
        "tags": ["Next.js", "Arquitectura", "Tiempo Real", "WebSockets"],
        "url": "/blog/arquitecturando-contexto-multijugador-nextjs",
        "external": false,
        "content": "# Arquitecturando Contexto Multijugador en Tiempo Real con Next.js\n\nEn Humancore AI, enfrentamos el desafío de construir un sistema que permitiera a múltiples usuarios interactuar en tiempo real dentro del mismo contexto de coaching. Este artículo detalla cómo arquitecturé la solución usando Next.js App Router, WebSockets y React Server Components.\n\n## El Problema\n\nNecesitábamos un sistema donde:\n- Múltiples usuarios pudieran ver actualizaciones en tiempo real\n- El estado se sincronizara entre clientes sin conflictos\n- La latencia fuera mínima (<100ms)\n- El sistema fuera escalable para miles de usuarios concurrentes\n\n## La Arquitectura\n\n### Next.js App Router como Base\n\nElegí Next.js App Router sobre Pages Router por varias razones:\n\n1. **Server Components**: Permiten reducir el JavaScript enviado al cliente\n2. **Streaming**: Mejor experiencia de usuario con carga progresiva\n3. **Route Handlers**: API routes integradas para manejar WebSockets\n\n### WebSockets para Tiempo Real\n\nImplementé WebSockets usando `ws` en el servidor y `Socket.io-client` en el cliente:\n\n```typescript\n// Server-side WebSocket handler\nimport { Server } from 'socket.io';\n\nconst io = new Server(server, {\n  cors: { origin: '*' }\n});\n\nio.on('connection', (socket) => {\n  socket.on('join-context', (contextId) => {\n    socket.join(contextId);\n  });\n  \n  socket.on('update-context', (data) => {\n    io.to(data.contextId).emit('context-updated', data);\n  });\n});\n```\n\n### React Server Components para Estado\n\nUsé Server Components para manejar el estado inicial y Server Actions para mutaciones:\n\n```typescript\n// app/context/[id]/page.tsx\nexport default async function ContextPage({ params }) {\n  const initialData = await getContextData(params.id);\n  \n  return <ContextClient initialData={initialData} />;\n}\n```\n\n## Desafíos y Soluciones\n\n### Sincronización de Estado\n\nEl mayor desafío fue mantener el estado sincronizado entre múltiples clientes. Implementé un sistema de versionado:\n\n- Cada actualización incluye un timestamp y versión\n- Los clientes rechazan actualizaciones obsoletas\n- Usamos operaciones transformativas (OT) para resolver conflictos\n\n### Escalabilidad\n\nPara escalar horizontalmente:\n\n1. **Redis Pub/Sub**: Para compartir eventos entre instancias del servidor\n2. **Sticky Sessions**: Para mantener conexiones WebSocket en la misma instancia\n3. **Rate Limiting**: Para prevenir abuso\n\n## Resultados\n\n- Latencia promedio: <100ms\n- Soporta 10K+ usuarios concurrentes\n- 99.9% uptime\n- Reducción del 40% en uso de memoria comparado con solución anterior\n\n## Lecciones Aprendidas\n\n1. **Optimistic Updates**: Implementar actualizaciones optimistas mejora la percepción de velocidad\n2. **Debouncing**: Agregar debounce a actualizaciones frecuentes reduce carga del servidor\n3. **Monitoring**: Implementar métricas detalladas es crucial para debugging en producción\n\n## Conclusión\n\nConstruir sistemas en tiempo real requiere pensar cuidadosamente en arquitectura, sincronización y escalabilidad. Next.js App Router combinado con WebSockets proporciona una base sólida para estas aplicaciones."
      },
      {
        "id": "article-2",
        "title": "Escalando Integración de LLMs: Lecciones de Producción",
        "date": "2024",
        "description": "Insights prácticos sobre integrar LLMs de OpenAI y Anthropic en aplicaciones de producción, cubriendo prompt engineering, manejo de errores y optimización de costos.",
        "tags": ["IA", "LLMs", "OpenAI", "Producción"],
        "url": "/blog/escalando-integracion-llms-produccion",
        "external": false,
        "content": "# Escalando Integración de LLMs: Lecciones de Producción\n\nIntegrar LLMs en producción es más que hacer llamadas a la API. Este artículo comparte lecciones aprendidas integrando OpenAI y Anthropic en Humancore AI.\n\n## El Contexto\n\nEn Humancore AI, necesitábamos proporcionar coaching personalizado a escala usando LLMs. El desafío no era solo la integración técnica, sino hacerlo de manera confiable, escalable y costeable.\n\n## Prompt Engineering\n\n### Estructura de Prompts\n\nDesarrollé un sistema de templates de prompts que incluye:\n\n1. **Contexto del Usuario**: Información psicológica y de comportamiento\n2. **Instrucciones Específicas**: Qué tipo de respuesta necesitamos\n3. **Ejemplos**: Few-shot learning para mejorar consistencia\n4. **Formato de Salida**: JSON estructurado para parsing fácil\n\n```typescript\nconst prompt = `\nEres un coach de performance ejecutivo. Analiza el siguiente contexto:\n\nUsuario: ${userData.name}\nRol: ${userData.role}\nMétricas: ${JSON.stringify(metrics)}\n\nGenera 3 acciones específicas y accionables para mejorar su performance.\n\nFormato de respuesta (JSON):\n{\n  \"actions\": [\n    {\"title\": string, \"description\": string, \"priority\": number}\n  ]\n}\n`;\n```\n\n### Optimización de Prompts\n\n- **Reducción de tokens**: Eliminar palabras innecesarias reduce costos\n- **Claridad**: Instrucciones claras reducen necesidad de re-prompting\n- **Validación**: Siempre validar formato de respuesta antes de procesar\n\n## Manejo de Errores\n\n### Rate Limiting\n\nLos LLMs tienen límites de rate. Implementé:\n\n- **Queue System**: Cola de requests con priorización\n- **Retry Logic**: Exponential backoff para reintentos\n- **Fallback Models**: Usar modelos más baratos cuando el principal falla\n\n```typescript\nasync function callLLM(prompt: string, retries = 3) {\n  try {\n    return await openai.chat.completions.create({\n      model: 'gpt-4',\n      messages: [{ role: 'user', content: prompt }]\n    });\n  } catch (error) {\n    if (retries > 0 && error.status === 429) {\n      await sleep(Math.pow(2, 3 - retries) * 1000);\n      return callLLM(prompt, retries - 1);\n    }\n    throw error;\n  }\n}\n```\n\n### Validación de Respuestas\n\nSiempre validar que la respuesta del LLM sea útil:\n\n- **Schema Validation**: Usar Zod para validar estructura\n- **Content Filtering**: Filtrar contenido inapropiado\n- **Fallback**: Tener respuestas pre-generadas como backup\n\n## Optimización de Costos\n\n### Estrategias de Ahorro\n\n1. **Caching**: Cachear respuestas similares usando embeddings\n2. **Model Selection**: Usar GPT-3.5 para tareas simples, GPT-4 solo cuando necesario\n3. **Streaming**: Usar streaming para mejor UX sin aumentar costos\n4. **Batch Processing**: Procesar múltiples requests juntos cuando sea posible\n\n### Monitoreo\n\nImplementé tracking detallado:\n\n- Costo por request\n- Latencia promedio\n- Tasa de éxito/fallo\n- Uso de tokens\n\nEsto nos permitió identificar oportunidades de optimización.\n\n## Escalabilidad\n\n### Arquitectura\n\n- **API Gateway**: Unificar llamadas a diferentes proveedores\n- **Load Balancing**: Distribuir carga entre múltiples instancias\n- **Async Processing**: Procesar requests pesados de forma asíncrona\n\n### Caching Inteligente\n\nUsé embeddings para encontrar respuestas similares:\n\n```typescript\nconst embedding = await getEmbedding(userQuery);\nconst similar = await findSimilarCachedResponses(embedding);\n\nif (similar && similar.similarity > 0.95) {\n  return similar.response; // Reusar respuesta cacheada\n}\n```\n\n## Resultados\n\n- Reducción del 60% en costos de API\n- Latencia promedio: 2.5s (aceptable para UX)\n- 99.5% tasa de éxito\n- Escalado a 50K+ requests diarios\n\n## Lecciones Clave\n\n1. **No confiar ciegamente**: Siempre validar y tener fallbacks\n2. **Monitorear todo**: Los costos pueden escalar rápidamente\n3. **Optimizar prompts**: Pequeños cambios pueden tener gran impacto\n4. **Planear para escala**: Diseñar desde el inicio pensando en crecimiento\n\n## Conclusión\n\nIntegrar LLMs en producción requiere pensar en más que solo la integración técnica. Es crucial considerar costos, escalabilidad, confiabilidad y experiencia de usuario desde el inicio."
      },
      {
        "id": "article-3",
        "title": "Migrando PHP Legacy a React Moderno: Una Guía Completa",
        "date": "2023",
        "description": "Lecciones aprendidas liderando un equipo de 16 desarrolladores para migrar una aplicación PHP monolítica a una arquitectura moderna React/GraphQL, incluyendo implementación i18n y optimización de performance.",
        "tags": ["React", "Migración", "Arquitectura", "GraphQL"],
        "url": "/blog/migrando-php-legacy-react-moderno",
        "external": false,
        "content": "# Migrando PHP Legacy a React Moderno: Una Guía Completa\n\nLiderar la migración de un monolito PHP a React/GraphQL con un equipo de 16 desarrolladores fue uno de los proyectos más desafiantes de mi carrera. Este artículo documenta el proceso completo.\n\n## El Contexto\n\nLaika Mascotas tenía una aplicación PHP monolítica de más de 10 años que:\n- No soportaba internacionalización (i18n)\n- Tenía código legacy difícil de mantener\n- No podía escalar para expansión internacional\n- Tenía problemas de performance\n\n## Estrategia de Migración\n\n### Enfoque Incremental\n\nEn lugar de una reescritura completa, elegimos migración incremental:\n\n1. **Strangler Fig Pattern**: Construir nuevo sistema alrededor del legacy\n2. **Feature Flags**: Migrar features una por una\n3. **Coexistencia**: Ambos sistemas funcionando en paralelo\n4. **Cutover Gradual**: Cambiar tráfico gradualmente\n\n### Arquitectura Target\n\nDiseñé una arquitectura moderna:\n\n- **Frontend**: React + TypeScript\n- **API**: GraphQL (Apollo Server)\n- **State Management**: Apollo Client + React Context\n- **i18n**: react-i18next con soporte multi-locale\n- **Build**: Webpack con code splitting\n\n## Desafíos Técnicos\n\n### 1. Internacionalización (i18n)\n\nUno de los requisitos principales era soportar múltiples países (MX, CL, CO).\n\n**Solución**:\n\n```typescript\n// Estructura de traducciones\nconst translations = {\n  es: { /* español colombiano */ },\n  'es-MX': { /* español mexicano */ },\n  'es-CL': { /* español chileno */ }\n};\n\n// Detección automática de locale\nconst locale = detectLocaleFromDomain();\ni18n.changeLanguage(locale);\n```\n\nImplementé:\n- Detección automática de locale desde dominio\n- Fallback a español colombiano\n- Formateo de fechas, números y monedas por locale\n- RTL support preparado (aunque no usado)\n\n### 2. Migración de Datos\n\nMigrar datos sin downtime fue crítico:\n\n- **Dual Write**: Escribir en ambos sistemas durante transición\n- **Data Sync**: Scripts de sincronización bidireccional\n- **Validation**: Verificar consistencia entre sistemas\n- **Rollback Plan**: Poder revertir si algo sale mal\n\n### 3. Performance\n\nEl sistema legacy tenía problemas de performance:\n\n**Optimizaciones implementadas**:\n\n- **Code Splitting**: Cargar solo código necesario\n- **Lazy Loading**: Cargar componentes bajo demanda\n- **Image Optimization**: WebP, lazy loading, responsive images\n- **GraphQL Query Optimization**: Reducir over-fetching\n- **CDN**: Servir assets estáticos desde CDN\n\n```typescript\n// Code splitting por ruta\nconst ProductPage = lazy(() => import('./pages/ProductPage'));\nconst CartPage = lazy(() => import('./pages/CartPage'));\n\n// En el router\n<Suspense fallback={<Loading />}>\n  <Routes>\n    <Route path=\"/product\" element={<ProductPage />} />\n  </Routes>\n</Suspense>\n```\n\n## Liderazgo de Equipo\n\n### Organización\n\nCon 16 desarrolladores, organización fue clave:\n\n- **Squads**: Dividí el equipo en 4 squads de 4 personas\n- **Sprint Planning**: Planning semanal con toda la organización\n- **Code Reviews**: Todas las PRs requerían 2 aprobaciones\n- **Pair Programming**: Para features complejas\n- **Daily Standups**: 15 minutos diarios por squad\n\n### Comunicación\n\n- **Documentación**: Wiki con arquitectura y decisiones\n- **Slack Channels**: Canales por feature/squad\n- **Retrospectives**: Retrospectivas semanales\n- **Tech Talks**: Sesiones técnicas internas\n\n### Calidad de Código\n\n- **ESLint + Prettier**: Formato consistente\n- **TypeScript**: Type safety desde el inicio\n- **Testing**: Unit tests + Integration tests\n- **CI/CD**: Pipeline automático con checks\n\n## Resultados\n\n### Métricas de Éxito\n\n- **Lanzamiento**: MX y CL lanzados exitosamente\n- **Performance**: Lighthouse score mejoró de 45 a 92\n- **Core Web Vitals**: LCP mejoró de 4.2s a 1.8s\n- **SEO**: 40% aumento en tráfico orgánico\n- **Tiempo de Desarrollo**: Reducción del 30% en tiempo de features\n\n### Aprendizajes del Equipo\n\n- **Modern Stack**: Equipo aprendió React, GraphQL, TypeScript\n- **Best Practices**: Establecimos estándares de código\n- **Documentación**: Cultura de documentar decisiones\n- **Testing**: Mejor cobertura de tests\n\n## Lecciones Aprendidas\n\n### Lo que Funcionó Bien\n\n1. **Migración Incremental**: Redujo riesgo significativamente\n2. **Feature Flags**: Permitió rollback rápido\n3. **Documentación**: Fue crucial para onboarding\n4. **Code Reviews**: Mejoró calidad del código\n\n### Lo que Haría Diferente\n\n1. **Empezar con Tests**: Escribir tests del sistema legacy primero\n2. **Más Prototipos**: Validar arquitectura con POCs antes\n3. **Mejor Estimación**: Subestimamos complejidad inicialmente\n4. **Comunicación Temprana**: Comunicar cambios a stakeholders antes\n\n## Conclusión\n\nMigrar un sistema legacy es más que cambiar tecnología. Requiere:\n- Planificación cuidadosa\n- Liderazgo técnico fuerte\n- Comunicación efectiva\n- Compromiso del equipo\n- Flexibilidad para adaptarse\n\nEl resultado fue un sistema moderno, escalable y mantenible que permitió la expansión internacional de Laika Mascotas."
      },
    ]
  },
  "english": {
    "headline": "Technical Product Lead & Senior Frontend Developer",
    "sub_headline": "Bridging the gap between Design, Engineering & Business",
    "summary": "Senior Software Engineer and Technical Lead with 10 years of experience, specializing in Frontend Architecture. I combine technical precision (React/Next.js) with product sensitivity (UX/UI) to translate complex requirements into scalable interfaces. I value clear documentation and knowledge sharing as the foundation for team success.",
    "experience": [
      {
        "company": "HUMANCORE AI",
        "location": "Remote, USA",
        "role": "Technical Product Lead & Senior Frontend",
        "dates": "2023 – Present",
        "highlights": [
          "Frontend Architecture: Architected the product core from scratch (Next.js App Router, TypeScript) to handle real-time 'Multiplayer' context logic.",
          "UX/UI & Product: Designed the 'Advisor' interface in Figma, turning complex psychological data into simple daily actions.",
          "AI Innovation: Integrated LLMs to provide personalized, science-backed coaching at scale.",
          "Impact: Recognized for technical leadership and full execution of key insight reporting features."
        ]
      },
      {
        "company": "LAIKA MASCOTAS",
        "location": "Barranquilla, Colombia",
        "role": "Senior Frontend Developer & Tech Lead",
        "dates": "2022 – 2023",
        "highlights": [
          "Re-platforming: Architected and led the complete migration from a legacy PHP monolith to a modern frontend architecture from scratch.",
          "Squad Leadership: Led a squad of 16 developers, ensuring code quality and on-time delivery.",
          "Global Scale: Enabled the launch of localized storefronts for MX and CL through a robust i18n architecture.",
          "Legacy: Delivered complete technical documentation and trained the team to ensure post-departure maintainability."
        ]
      },
      {
        "company": "IKATECH SOLUTIONS",
        "location": "Remote",
        "role": "Frontend Developer & UX/UI Designer",
        "dates": "2020 – 2021",
        "highlights": [
          "Modernization: Redesigned UX/UI and architecture for V2 launch.",
          "Migration: Led migration from legacy systems to React/TypeScript."
        ]
      },
      {
        "company": "DEVELOPAPP SAS",
        "location": "Barranquilla, Colombia",
        "role": "Frontend Developer",
        "dates": "2018 – 2020",
        "highlights": [
          "Multi-Industry: Led frontend for Fintech, E-Commerce, and SaaS clients.",
          "Delivery: Implemented Scrum strategies for efficient delivery."
        ]
      },
      {
        "company": "GOVERNMENT OF LARA STATE",
        "location": "Venezuela",
        "role": "Web Developer",
        "dates": "2017 – 2018",
        "highlights": [
          "Large-Scale Systems: Academic system for 20,000+ students.",
          "Automation: Optimized workflows, replacing manual data entry."
        ]
      },
      {
        "company": "EMERSON FREITES ACADEMY",
        "location": "Venezuela",
        "role": "Web Developer (Freelance)",
        "dates": "2017",
        "highlights": [
          "Management Software: Custom software for automatic PDF certificate issuance."
        ]
      },
      {
        "company": "GOVERNMENT OF LARA STATE",
        "location": "Venezuela",
        "role": "Software Developer",
        "dates": "2016 – 2017",
        "highlights": [
          "Document Management: Internal software reducing response times by 50%."
        ]
      }
    ],
    "skills": {
      "Frontend Architecture": "Next.js, React, TypeScript, Vue, Turborepo",
      "Modern UI & Styling": "Tailwind CSS, Shadcn/UI, Framer Motion, CSS Modules, Responsive Design",
      "AI & Innovation": "LLMs Integration (OpenAI, Anthropic), Generative UI, Prompt Engineering",
      "State & Data": "GraphQL (Apollo), TanStack Query, Server Actions, RESTful APIs",
      "Product Design": "Figma (Dev Mode, Design Systems), UX/UI Prototyping, Adobe XD",
      "Tools & Methods": "Git, CI/CD, Agile/Scrum, Jira, Vercel Deployment, Docker"
    },
    "education": [
      {
        "degree": "Computer Engineering",
        "institution": "Romulo Gallegos University",
        "year": "2016"
      }
    ],
    "testimonials": [
      {
        "id": "t1",
        "name": "Andrew Papa",
        "role": "Product Lead",
        "company": "Humancore AI",
        "content": "I like your design for the insight report Max. Nice work, Thanks for running that to completion!"
      },
      {
        "id": "t2",
        "name": "Robert Stephens",
        "role": "CTO",
        "company": "Humancore AI",
        "content": "We appreciate all the hard work and value you greatly. (Spot bonus awarded for performance)."
      },
      {
        "id": "t3",
        "name": "Douglas Acosta",
        "role": "Full Stack Engineer",
        "company": "",
        "content": "Maximilian is an excellent developer, with a high sense of detail and always motivated. All the designs he has done are really impressive, for this and other skills I recommend Max for any related position, he is a valuable resource for any company."
      },
      {
        "id": "t4",
        "name": "Esael Angel",
        "role": "CTO",
        "company": "Laika Mascotas",
        "content": "Great Job with the new web 3.0"
      }
    ],
    "articles": [
      {
        "id": "article-1",
        "title": "Architecting Real-time Multiplayer Context in Next.js",
        "date": "2024",
        "description": "How I built a scalable real-time system using Next.js App Router, WebSockets, and React Server Components to handle concurrent user interactions at scale.",
        "tags": ["Next.js", "Architecture", "Real-time", "WebSockets"],
        "url": "/blog/architecting-realtime-multiplayer-nextjs",
        "external": false,
        "content": "# Architecting Real-time Multiplayer Context in Next.js\n\nAt Humancore AI, we faced the challenge of building a system that allowed multiple users to interact in real-time within the same coaching context. This article details how I architected the solution using Next.js App Router, WebSockets, and React Server Components.\n\n## The Problem\n\nWe needed a system where:\n- Multiple users could see real-time updates\n- State synchronized between clients without conflicts\n- Latency was minimal (<100ms)\n- The system was scalable for thousands of concurrent users\n\n## The Architecture\n\n### Next.js App Router as Foundation\n\nI chose Next.js App Router over Pages Router for several reasons:\n\n1. **Server Components**: Allow reducing JavaScript sent to client\n2. **Streaming**: Better user experience with progressive loading\n3. **Route Handlers**: Integrated API routes to handle WebSockets\n\n### WebSockets for Real-time\n\nI implemented WebSockets using `ws` on the server and `Socket.io-client` on the client:\n\n```typescript\n// Server-side WebSocket handler\nimport { Server } from 'socket.io';\n\nconst io = new Server(server, {\n  cors: { origin: '*' }\n});\n\nio.on('connection', (socket) => {\n  socket.on('join-context', (contextId) => {\n    socket.join(contextId);\n  });\n  \n  socket.on('update-context', (data) => {\n    io.to(data.contextId).emit('context-updated', data);\n  });\n});\n```\n\n### React Server Components for State\n\nI used Server Components to handle initial state and Server Actions for mutations:\n\n```typescript\n// app/context/[id]/page.tsx\nexport default async function ContextPage({ params }) {\n  const initialData = await getContextData(params.id);\n  \n  return <ContextClient initialData={initialData} />;\n}\n```\n\n## Challenges and Solutions\n\n### State Synchronization\n\nThe biggest challenge was keeping state synchronized between multiple clients. I implemented a versioning system:\n\n- Each update includes a timestamp and version\n- Clients reject stale updates\n- We use operational transformations (OT) to resolve conflicts\n\n### Scalability\n\nTo scale horizontally:\n\n1. **Redis Pub/Sub**: To share events between server instances\n2. **Sticky Sessions**: To keep WebSocket connections on the same instance\n3. **Rate Limiting**: To prevent abuse\n\n## Results\n\n- Average latency: <100ms\n- Supports 10K+ concurrent users\n- 99.9% uptime\n- 40% reduction in memory usage compared to previous solution\n\n## Lessons Learned\n\n1. **Optimistic Updates**: Implementing optimistic updates improves perceived speed\n2. **Debouncing**: Adding debounce to frequent updates reduces server load\n3. **Monitoring**: Implementing detailed metrics is crucial for debugging in production\n\n## Conclusion\n\nBuilding real-time systems requires careful thinking about architecture, synchronization, and scalability. Next.js App Router combined with WebSockets provides a solid foundation for these applications."
      },
      {
        "id": "article-2",
        "title": "Scaling LLM Integration: Lessons from Production",
        "date": "2024",
        "description": "Practical insights on integrating OpenAI and Anthropic LLMs into production applications, covering prompt engineering, error handling, and cost optimization.",
        "tags": ["AI", "LLMs", "OpenAI", "Production"],
        "url": "/blog/scaling-llm-integration-production",
        "external": false,
        "content": "# Scaling LLM Integration: Lessons from Production\n\nIntegrating LLMs into production is more than making API calls. This article shares lessons learned integrating OpenAI and Anthropic at Humancore AI.\n\n## The Context\n\nAt Humancore AI, we needed to provide personalized coaching at scale using LLMs. The challenge wasn't just technical integration, but doing it reliably, scalably, and cost-effectively.\n\n## Prompt Engineering\n\n### Prompt Structure\n\nI developed a system of prompt templates that includes:\n\n1. **User Context**: Psychological and behavioral information\n2. **Specific Instructions**: What type of response we need\n3. **Examples**: Few-shot learning to improve consistency\n4. **Output Format**: Structured JSON for easy parsing\n\n```typescript\nconst prompt = `\nYou are an executive performance coach. Analyze the following context:\n\nUser: ${userData.name}\nRole: ${userData.role}\nMetrics: ${JSON.stringify(metrics)}\n\nGenerate 3 specific and actionable actions to improve their performance.\n\nResponse format (JSON):\n{\n  \"actions\": [\n    {\"title\": string, \"description\": string, \"priority\": number}\n  ]\n}\n`;\n```\n\n### Prompt Optimization\n\n- **Token Reduction**: Removing unnecessary words reduces costs\n- **Clarity**: Clear instructions reduce need for re-prompting\n- **Validation**: Always validate response format before processing\n\n## Error Handling\n\n### Rate Limiting\n\nLLMs have rate limits. I implemented:\n\n- **Queue System**: Request queue with prioritization\n- **Retry Logic**: Exponential backoff for retries\n- **Fallback Models**: Use cheaper models when primary fails\n\n```typescript\nasync function callLLM(prompt: string, retries = 3) {\n  try {\n    return await openai.chat.completions.create({\n      model: 'gpt-4',\n      messages: [{ role: 'user', content: prompt }]\n    });\n  } catch (error) {\n    if (retries > 0 && error.status === 429) {\n      await sleep(Math.pow(2, 3 - retries) * 1000);\n      return callLLM(prompt, retries - 1);\n    }\n    throw error;\n  }\n}\n```\n\n### Response Validation\n\nAlways validate that LLM response is useful:\n\n- **Schema Validation**: Use Zod to validate structure\n- **Content Filtering**: Filter inappropriate content\n- **Fallback**: Have pre-generated responses as backup\n\n## Cost Optimization\n\n### Savings Strategies\n\n1. **Caching**: Cache similar responses using embeddings\n2. **Model Selection**: Use GPT-3.5 for simple tasks, GPT-4 only when needed\n3. **Streaming**: Use streaming for better UX without increasing costs\n4. **Batch Processing**: Process multiple requests together when possible\n\n### Monitoring\n\nI implemented detailed tracking:\n\n- Cost per request\n- Average latency\n- Success/failure rate\n- Token usage\n\nThis allowed us to identify optimization opportunities.\n\n## Scalability\n\n### Architecture\n\n- **API Gateway**: Unify calls to different providers\n- **Load Balancing**: Distribute load across multiple instances\n- **Async Processing**: Process heavy requests asynchronously\n\n### Smart Caching\n\nI used embeddings to find similar responses:\n\n```typescript\nconst embedding = await getEmbedding(userQuery);\nconst similar = await findSimilarCachedResponses(embedding);\n\nif (similar && similar.similarity > 0.95) {\n  return similar.response; // Reuse cached response\n}\n```\n\n## Results\n\n- 60% reduction in API costs\n- Average latency: 2.5s (acceptable for UX)\n- 99.5% success rate\n- Scaled to 50K+ daily requests\n\n## Key Lessons\n\n1. **Don't trust blindly**: Always validate and have fallbacks\n2. **Monitor everything**: Costs can scale quickly\n3. **Optimize prompts**: Small changes can have big impact\n4. **Plan for scale**: Design from start thinking about growth\n\n## Conclusion\n\nIntegrating LLMs into production requires thinking about more than just technical integration. It's crucial to consider costs, scalability, reliability, and user experience from the start."
      },
      {
        "id": "article-3",
        "title": "Migrating Legacy PHP to Modern React: A Complete Guide",
        "date": "2023",
        "description": "Lessons learned from leading a team of 16 developers to migrate a monolithic PHP application to a modern React/GraphQL architecture, including i18n implementation and performance optimization.",
        "tags": ["React", "Migration", "Architecture", "GraphQL"],
        "url": "/blog/migrating-legacy-php-react-modern",
        "external": false,
        "content": "# Migrating Legacy PHP to Modern React: A Complete Guide\n\nLeading the migration of a PHP monolith to React/GraphQL with a team of 16 developers was one of the most challenging projects of my career. This article documents the complete process.\n\n## The Context\n\nLaika Mascotas had a PHP monolithic application over 10 years old that:\n- Didn't support internationalization (i18n)\n- Had legacy code difficult to maintain\n- Couldn't scale for international expansion\n- Had performance issues\n\n## Migration Strategy\n\n### Incremental Approach\n\nInstead of a complete rewrite, we chose incremental migration:\n\n1. **Strangler Fig Pattern**: Build new system around legacy\n2. **Feature Flags**: Migrate features one by one\n3. **Coexistence**: Both systems working in parallel\n4. **Gradual Cutover**: Change traffic gradually\n\n### Target Architecture\n\nI designed a modern architecture:\n\n- **Frontend**: React + TypeScript\n- **API**: GraphQL (Apollo Server)\n- **State Management**: Apollo Client + React Context\n- **i18n**: react-i18next with multi-locale support\n- **Build**: Webpack with code splitting\n\n## Technical Challenges\n\n### 1. Internationalization (i18n)\n\nOne of the main requirements was supporting multiple countries (MX, CL, CO).\n\n**Solution**:\n\n```typescript\n// Translation structure\nconst translations = {\n  es: { /* Colombian Spanish */ },\n  'es-MX': { /* Mexican Spanish */ },\n  'es-CL': { /* Chilean Spanish */ }\n};\n\n// Automatic locale detection\nconst locale = detectLocaleFromDomain();\ni18n.changeLanguage(locale);\n```\n\nI implemented:\n- Automatic locale detection from domain\n- Fallback to Colombian Spanish\n- Date, number, and currency formatting by locale\n- RTL support prepared (though not used)\n\n### 2. Data Migration\n\nMigrating data without downtime was critical:\n\n- **Dual Write**: Write to both systems during transition\n- **Data Sync**: Bidirectional synchronization scripts\n- **Validation**: Verify consistency between systems\n- **Rollback Plan**: Ability to revert if something goes wrong\n\n### 3. Performance\n\nThe legacy system had performance issues:\n\n**Optimizations implemented**:\n\n- **Code Splitting**: Load only necessary code\n- **Lazy Loading**: Load components on demand\n- **Image Optimization**: WebP, lazy loading, responsive images\n- **GraphQL Query Optimization**: Reduce over-fetching\n- **CDN**: Serve static assets from CDN\n\n```typescript\n// Code splitting by route\nconst ProductPage = lazy(() => import('./pages/ProductPage'));\nconst CartPage = lazy(() => import('./pages/CartPage'));\n\n// In router\n<Suspense fallback={<Loading />}>\n  <Routes>\n    <Route path=\"/product\" element={<ProductPage />} />\n  </Routes>\n</Suspense>\n```\n\n## Team Leadership\n\n### Organization\n\nWith 16 developers, organization was key:\n\n- **Squads**: I divided the team into 4 squads of 4 people\n- **Sprint Planning**: Weekly planning with entire organization\n- **Code Reviews**: All PRs required 2 approvals\n- **Pair Programming**: For complex features\n- **Daily Standups**: 15 minutes daily per squad\n\n### Communication\n\n- **Documentation**: Wiki with architecture and decisions\n- **Slack Channels**: Channels by feature/squad\n- **Retrospectives**: Weekly retrospectives\n- **Tech Talks**: Internal technical sessions\n\n### Code Quality\n\n- **ESLint + Prettier**: Consistent formatting\n- **TypeScript**: Type safety from the start\n- **Testing**: Unit tests + Integration tests\n- **CI/CD**: Automated pipeline with checks\n\n## Results\n\n### Success Metrics\n\n- **Launch**: MX and CL launched successfully\n- **Performance**: Lighthouse score improved from 45 to 92\n- **Core Web Vitals**: LCP improved from 4.2s to 1.8s\n- **SEO**: 40% increase in organic traffic\n- **Development Time**: 30% reduction in feature time\n\n### Team Learnings\n\n- **Modern Stack**: Team learned React, GraphQL, TypeScript\n- **Best Practices**: We established code standards\n- **Documentation**: Culture of documenting decisions\n- **Testing**: Better test coverage\n\n## Lessons Learned\n\n### What Worked Well\n\n1. **Incremental Migration**: Significantly reduced risk\n2. **Feature Flags**: Allowed quick rollback\n3. **Documentation**: Was crucial for onboarding\n4. **Code Reviews**: Improved code quality\n\n### What I Would Do Differently\n\n1. **Start with Tests**: Write tests of legacy system first\n2. **More Prototypes**: Validate architecture with POCs before\n3. **Better Estimation**: We underestimated complexity initially\n4. **Early Communication**: Communicate changes to stakeholders earlier\n\n## Conclusion\n\nMigrating a legacy system is more than changing technology. It requires:\n- Careful planning\n- Strong technical leadership\n- Effective communication\n- Team commitment\n- Flexibility to adapt\n\nThe result was a modern, scalable, and maintainable system that enabled Laika Mascotas' international expansion."
      },
    ]
  },
  "projects": [
    {
      "id": "1",
      "title": "Humancore AI",
      "description": "An AI-powered \"Performance Advisor\" that scales executive coaching using real-time multiplayer context and LLMs.",
      "tags": ["Next.js", "TypeScript", "OpenAI", "Figma"],
      "image": "https://humancore.ai/og.png",
      "link": "https://humancore.ai/",
      "problem": "Executive coaching is impactful but impossible to scale to every employee manually.",
      "solution": "Built a Next.js core to handle real-time logic and integrated LLMs to provide personalized, science-backed coaching at scale.",
      "impact": [
        "Architecture built from scratch",
        "Real-time multiplayer context",
        "End-to-end design to code"
      ]
    },
    {
      "id": "2",
      "title": "Laika Mascotas",
      "description": "Complete greenfield re-platforming of a leading pet e-commerce to support international expansion.",
      "tags": ["React", "GraphQL", "Architecture", "i18n"],
      "image": "https://laikamascotas.cl/og.png",
      "link": "https://laikamascotas.cl/",
      "problem": "International expansion blocked by an unmaintainable legacy PHP monolith without i18n support.",
      "solution": "Architected a scalable frontend from scratch, leading a squad of 16 devs to replace the legacy system.",
      "impact": [
        "Successful launch in MX & CL",
        "Drastic Core Web Vitals improvement",
        "SEO optimized architecture"
      ]
    }
  ]
};