# Informe de Planificación y Diagnóstico - Portafolio Profesional de Gustavo Hernández

Este documento contiene el diagnóstico inicial basado en la información extraída de tu currículum (CV) y el plan estratégico para el desarrollo de tu portafolio web profesional.

---

## 1. Diagnóstico del Perfil Detectado

A partir de los archivos de currículum analizados, hemos detectado el siguiente perfil profesional:

* **Nombre:** Gustavo Hernández
* **Rol Principal:** Engineering Manager / Lead Architect / Tech Lead
* **Ubicación:** Barquisimeto, Venezuela
* **Contacto:** hernandez29a@mail.com | +58 416 631 1773 | [LinkedIn](https://linkedin.com/in/gustavohernandezsalazar)
* **Idiomas:** 
  * Español: Nativo.
  * Inglés: *"Intermedio B2".*
* **Resumen Profesional:** Líder tecnológico y Arquitecto de Software con más de 9 años de trayectoria liderando equipos multidisciplinarios de alto rendimiento (hasta 24 ingenieros). Especialista en escalabilidad backend, diseño de microservicios, clean code (SOLID) y automatización de procesos para maximizar la eficiencia y el ROI.
* **Stack Tecnológico Principal:**
  * **Lenguajes:** TypeScript (Experto), Rust, Node.js, HTML/CSS.
  * **Frameworks y Librerías:** NestJS, Parse-Server, GraphQL, Angular.
  * **Bases de Datos:** PostgreSQL, MongoDB.
  * **DevOps y Herramientas:** Docker, Servidores Linux, automatizaciones con n8n.
  * **Metodologías:** Lean Six Sigma White Belt, SOLID, Patrones de Diseño, Arquitectura Limpia.

### Experiencias Clave a Resaltar:
1. **Dazlabs (2023 - 2025):** Como Engineering Manager / Lead Architect. Gestión de 24 ingenieros y arquitectura de un backend 100% dinámico con NestJS (reducción del 60% de despliegues por cambios de UI) y microservicios escalables en Rust.
2. **Alaxatech (2022 - 2023):** Como Senior Backend Developer. Infraestructura crítica para Terraza Club y ACHS con Nest.js y PostgreSQL.
3. **CorpoLara (2020 - 2021):** Como IT Manager. Administración Linux, SIGESP y optimización operativa de seguridad (+50%).

---

## 2. Propuesta de Arquitectura e Interfaz del Portafolio

Para reflejar un perfil de **Engineering Manager & Architect**, el portafolio no puede ser genérico. Debe transmitir robustez técnica, organización y modernidad. 

### Propuesta Estética (Premium & Tech):
* **Tema y Colores:** Modo oscuro por defecto con una paleta de colores sofisticada. Fondo en gris espacial oscuro/azul pizarra (`#0f172a`), acentos de luz en azul cian/eléctrico (`#3b82f6` y `#06b6d4`), y tipografía moderna y limpia (ej. *Inter* u *Outfit*).
* **Efectos Visuales:** Glassmorphism (paneles semi-transparentes con desenfoque de fondo), micro-animaciones suaves al pasar el mouse por las tecnologías y proyectos, y tiempos de carga imperceptibles.
* **Diseño Dinámico:** Un diseño totalmente responsive enfocado en la experiencia del usuario (UX) tanto en móviles como en computadoras.

### Secciones Propuestas:
1. **Hero / Presentación:** Introducción de alto impacto con tu rol, un tagline profesional conciso y accesos rápidos a tu contacto y descarga de CV.
2. **Estadísticas Clave (Métricas de Impacto):** Un panel interactivo que muestre métricas rápidas (ej. "+5 Años de Exp", "Hasta 24 Ingenieros Liderados", "60% Reducción de Depliegues Backend", "2 Certificaciones Clave").
3. **Experiencia Profesional:** Una línea de tiempo interactiva donde se desglose tu trayectoria técnica y directiva de forma elegante.
4. **Proyectos Destacados (Casos de Estudio):** Grid interactivo con filtros por categoría (Backend, Arquitectura, Automatización). Al hacer clic en un proyecto, se abre un modal con detalles técnicos ampliados.
5. **Stack Tecnológico Interactivo:** Tarjetas organizadas por categorías (Backend & API, Languages, DevOps & Databases, Automation & Management) con visualización de nivel de dominio.
6. **Formulario de Contacto y Redes:** Enlaces directos a GitHub, LinkedIn, correo electrónico y formulario funcional.

---

## 3. Detalle de Proyectos Analizados y Exhibición (Casos de Estudio)

Tras analizar los repositorios locales indicados, se ha estructurado la exhibición detallada de tus principales desarrollos. Mostraremos 3 grandes bloques que demuestran tus competencias en **Arquitectura de Microservicios**, **Ingeniería Full-Stack e IA**, y **Lógica de Videojuegos & Estructuras de Datos**.

### Proyecto A: Loomflow — SaaS ERP/CRM Multi-tenant Textil
* **Ubicación en disco:** `D:\Disco D\proyectos\saas-GH-Soft-Devs`
* **Descripción Funcional:** Plataforma SaaS empresarial diseñada específicamente para la industria textil y de confección de prendas de vestir. Centraliza toda la administración empresarial, incluyendo inventarios, presupuestos, nómina, ventas y facturación con soporte nativo de multi-inquilino (multi-tenant) con aislamiento por base de datos para cada empresa afiliada.
* **Stack Tecnológico & Arquitectura:** Monorepo orquestado bajo una topología de microservicios políglotas:
  * **API Gateway (NestJS):** Punto único de entrada seguro, gestión de CORS y enrutamiento dinámico.
  * **Auth Service (NestJS):** Manejo independiente de identidad, JWT, y control de accesos granular basado en permisos (RBAC/PBAC).
  * **Admin Service (NestJS):** Núcleo funcional del ERP (ventas, finanzas, presupuestos).
  * **Production Service (Rust - Axum & Tokio):** Servicio de alto rendimiento concurrente para la administración de las líneas de costura y taller en tiempo real.
  * **Event Bus (RabbitMQ):** Bus de mensajería AMQP para comunicación de eventos asíncronos entre producción e inventario.
  * **Persistencia & Entorno:** MongoDB y Proxy Inverso con **Caddy** encargado de servir el frontend estático y redirección web segura SSL/TLS.
  * **Frontend Client:** Angular (Signals, Tailwind CSS, Componentes Standalone).
* **Forma de Mostrar en la Web (Exhibición):**
  * **Ilustración/Imagen:** Diagrama técnico de microservicios e interactividad entre el API Gateway, NestJS, Rust y RabbitMQ.
  * **Foco Técnico:** Exhibición de la estructura del monorepo y la decisión de diseño de usar **Rust** para el procesamiento concurrente de producción y **NestJS** para la gestión de negocio.

### Proyecto B: Peyber Inventory & Management System
* **Ubicación en disco:** `peyber uniformes` (Frontend) y `peyber-backend` (Backend).
* **Descripción Funcional:** Implementación y despliegue a producción del sistema a medida para la empresa *Confecciones Peyber*. Gestiona el flujo comercial completo:
  * **BOM (Ficha Técnica / Receta):** Cálculo automático de costos unitarios de mano de obra directa (MOD), costos indirectos (CIF) y materiales con cálculo dinámico de porcentaje de merma.
  * **Destajos (Piecework):** Bitácoras de trabajo diario del taller de costura con control de calidad (descuento automático de piezas rechazadas) y cálculo integrado de nómina (semanal/quincenal) aplicando deducciones legales de Venezuela (SSO, SPF, FAOV).
  * **Finanzas y Facturación SENIAT:** Egresos multi-moneda (USD/VES) con conversión automatizada diaria y desglose fiscal (número de control, base imponible e IVA).
* **Integración de Agentes de Inteligencia Artificial (IA):**
  * **Accounting Agent (Asistente Contable):** Integración de LLM (Gemini/OpenAI) que audita finanzas en lenguaje natural y permite registrar destajo de trabajadores por comandos textuales sencillos.
  * **Instagram Agent (Bot de Atención y Venta):** Integración con Meta Webhooks para responder DMs en Instagram de forma autónoma, consultar stock real en base de datos MongoDB y enviar links de imágenes de Cloudinary a los usuarios.
* **Stack Tecnológico:** Angular standalone, NestJS, Mongoose/MongoDB, Cloudinary API para recursos multimedia.
* **Forma de Mostrar en la Web (Exhibición):**
  * **Ilustración/Imagen:** Simulación interactiva de una conversación con el *Instagram Agent* respondiendo disponibilidad en tiempo real con imágenes, y capturas del panel del *Accounting Agent* auditiando balances.
  * **Foco Técnico:** Demuestra la integración práctica de Inteligencia Artificial conectada a bases de datos transaccionales de negocio.

### Proyecto C: Proyecto Érebo — Motor RPG & Deckbuilder
* **Ubicación en disco:** `D:\Disco D\proyectos\proyecto-erebo`
* **Descripción Funcional:** Videojuego táctico de exploración y construcción de mazos (deckbuilder) con ambientación de sigilo y horror de ciencia ficción. Su mecánica se divide en dos pantallas: una App Móvil interactiva (para que el jugador gestione en secreto sus cartas, AP e inventario sin alertar al mapa) y una App Informativa (HUD dinámico proyectado en tablet que refleja la vida, esfuerzo, pánico, paranoia del personaje, y lo que percibe del entorno).
* **Lógica Técnica de Ingeniería:**
  * **Mapa Vivo pre-generado como Grafo:** El servidor NestJS inicializa el escenario completo como un grafo dinámico, donde las salas son los nodos y trackean ruido por sector y bultos invisibles (`potentialityLayer`), conectándose dinámicamente mediante aristas (conexiones).
  * **Mazo de Destino (Fate Deck) Finito:** Algoritmo aleatorio con un mazo cerrado de 14 cartas en el servidor que sustituye la tirada de dados clásica. Permite contar cartas para predecir fallos críticos (pifias) o aciertos superiores, haciendo de la exploración una toma de decisiones de riesgo controlado.
  * **Sincronización en Tiempo Real:** Intercambio de estado entre el servidor Mongoose y el frontend del HUD vital (HUD que reacciona con desenfoques e interactividad visual a los estados de hambre, cansancio, pánico o heridas del personaje).
* **Stack Tecnológico:** Angular, NestJS, MongoDB (Seeds de datos para 17 enemigos, eventos de exploración, héroes, losetas de Acto 0 y decks de cartas).
* **Forma de Mostrar en la Web (Exhibición):**
  * **Ilustración/Imagen:** Composición de doble pantalla (móvil de cartas y tablet HUD) con interfaz de estética inmersiva y oscura, más un grafo conceptual del mapa interactivo de exploración.
  * **Foco Técnico:** Modelado de estados de juego complejos, programación de motores lógicos basados en cartas y optimización del rendimiento en la persistencia de sesiones vivas.

---

## 4. Preguntas Actualizadas para el Usuario

Ya que hemos analizado tus repositorios locales y estructurado los proyectos principales, solo nos restan unas pocas preguntas para afinar el diseño y el stack del portafolio:

### Sobre la Información de los Proyectos:
1. **¿Qué imágenes o capturas de pantalla reales tienes de estos proyectos en tu máquina local?** 
   * Si tienes capturas de la UI de *Peyber Uniformes* o *Proyecto Érebo*, indícanos las rutas para copiarlas y agregarlas al portafolio. 
   * De lo contrario, ¿deseas que preparemos diagramas conceptuales interactivos (ej. el esquema de microservicios de Loomflow y el grafo del mapa de Érebo) directamente programados en la interfaz?

### Sobre las Preferencias Técnicas y de Diseño:
2. **Fotografía de Perfil:** ¿Deseas que usemos la foto `foto de perfil laboral.jpg` ubicada en `cv-linea/CV Gustavo Hernández - Engineering Manager_files/` o prefieres pasarnos otra?
3. **Stack del Portafolio:** ¿Prefieres que construyamos el portafolio en **HTML, CSS vainilla y JavaScript puro** (para velocidad de carga y portabilidad máxima) o prefieres que usemos **React con Vite** (enfoque basado en componentes)?
4. **Enlace a GitHub:** ¿Cuál es tu usuario de GitHub para agregarlo a los enlaces sociales y de los proyectos?
