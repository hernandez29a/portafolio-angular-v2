import { Component, signal, computed, HostListener, effect } from '@angular/core';


interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  images: string[];
  category: 'microservices' | 'fullstack' | 'game';
  tech: string[];
  highlights: string[];
}

interface Skill {
  name: string;
  level: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

interface TimelineItem {
  date: string;
  role: string;
  company: string;
  achievements: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Mobile Navigation Menu Toggle
  protected readonly mobileMenuOpen = signal(false);

  // Theme & Language Global States
  protected readonly isDarkMode = signal(true);
  protected readonly isSpanish = signal(true);

  // Projects Filter & Modal Selection State
  protected readonly activeFilter = signal<'all' | 'microservices' | 'fullstack' | 'game'>('all');
  protected readonly selectedProject = signal<Project | null>(null);
  protected readonly activeImageIndex = signal(0);
  protected readonly showBackToTop = signal(false);

  constructor() {
    // Side effect to dynamically apply the light-theme class to document.body
    effect(() => {
      if (this.isDarkMode()) {
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
      }
    });
  }

  // --- SPANISH DATA ---
  private readonly esProjects: Project[] = [
    {
      id: 'loomflow',
      title: 'Loomflow',
      tagline: 'SaaS ERP/CRM Multi-tenant Textil',
      description: 'Plataforma empresarial de microservicios políglotas especializada en confección textil, con base de datos MongoDB aislada por empresa.',
      fullDescription: 'Loomflow es una solución SaaS integral diseñada para centralizar la gestión de fábricas de ropa y comercios textiles. Al ser multi-tenant, implementa un estricto aislamiento de datos para garantizar la confidencialidad de cada empresa. Destaca por su arquitectura modular con comunicación asíncrona de eventos en tiempo real, permitiendo sincronizar las ventas de retail con las colas de costura de forma automática.',
      images: [
        'assets/loomflow/administracion-tasas.png',
        'assets/loomflow/login.png',
        'assets/loomflow/soporte-bd-inquilino.png',
        'assets/loomflow/vista de creacion de inquilinos.png'
      ],
      category: 'microservices',
      tech: ['Angular 19+', 'NestJS', 'Rust', 'RabbitMQ', 'MongoDB', 'Caddy', 'Docker'],
      highlights: [
        'Arquitectura de Microservicios Políglotas con API Gateway y Auth Service (RBAC/PBAC).',
        'Servicio de taller desarrollado en Rust (Axum/Tokio) para alta concurrencia de producción.',
        'Bus de eventos distribuido con RabbitMQ para sincronizar el stock del inventario.',
        'Proxy inverso con Caddy para servir el frontend estático y gestionar certificados SSL.'
      ]
    },
    {
      id: 'peyber',
      title: 'Peyber Inventory System',
      tagline: 'ERP Full-Stack & Inteligencia Artificial',
      description: 'Sistema administrativo con recetas de producción (BOM), nómina a destajo, control fiscal SENIAT y agentes inteligentes de atención e informes.',
      fullDescription: 'Desplegado para Confecciones Peyber, este sistema unifica la cadena productiva y financiera. Automatiza la estimación del costo de confección por prenda (telas, hilos, botones y mermas), el cálculo de nómina basado en el trabajo diario del taller (piecework) aplicando retenciones del SENIAT (IVA y control fiscal), y la conciliación bancaria. Cuenta con potentes integraciones de IA para facilitar la administración diaria.',
      images: [
        'assets/peyber-inventory-system/dashboard-graficas.png',
        'assets/peyber-inventory-system/login.png',
        'assets/peyber-inventory-system/orden-agente.png',
        'assets/peyber-inventory-system/registrar-factura.png'
      ],
      category: 'fullstack',
      tech: ['Angular', 'NestJS', 'MongoDB', 'Mongoose', 'Cloudinary API', 'Gemini AI', 'Meta Webhooks'],
      highlights: [
        'Ficha Técnica (BOM) dinámica que desglosa el costo de fabricación por versión de prenda.',
        'Accounting Agent (IA): Consultas de saldos y registros de destajos mediante comandos de lenguaje natural.',
        'Instagram Agent (IA): Consultas automáticas de disponibilidad de stock e imágenes de Cloudinary para DMs de clientes.',
        'Generación contable de egresos automáticos tras el registro de compras de materia prima.'
      ]
    },
    {
      id: 'erebo',
      title: 'Proyecto Érebo',
      tagline: 'Motor de Videojuego Táctico RPG & Deckbuilder',
      description: 'Motor lógico de exploración en base a cartas con inicialización dinámica de mapas en grafo y sincronización de pantallas HUD en tiempo real.',
      fullDescription: 'Érebo es un juego de exploración y supervivencia espacial por turnos. Destaca por su diseño asimétrico en doble pantalla: el jugador usa su móvil para planificar cartas y equipar inventario (sin hacer ruido que atraiga enemigos), y una tablet visualiza el HUD de pánico, estrés, vida y lo que los sentidos del personaje perciben en la habitación.',
      images: [
        'assets/proyecto-erebo/creacion-pj.png',
        'assets/proyecto-erebo/login.png',
        'assets/proyecto-erebo/acciones-personaje.png',
        'assets/proyecto-erebo/creacion-mesa.png'
      ],
      category: 'game',
      tech: ['Angular CLI', 'NestJS CLI', 'MongoDB', 'Postman collections', 'Node.js'],
      highlights: [
        'Mapa Vivo: Servidor NestJS calcula el escenario como un grafo dinámico de losetas físicas (nodos) y salidas (aristas).',
        'Mazo de Destino (Fate Deck): Motor de 14 cartas cerrado que reemplaza el azar de los dados para una planeación estratégica.',
        'Sincronización HUD de estados (metabolismo, paranoia, sangre de zona) disparados desde el servidor.',
        'Base de datos MongoDB sembrada (seeding) con bestiario de 17 enemigos, loot y losetas de aventura.'
      ]
    }
  ];

  private readonly esTimeline: TimelineItem[] = [
    {
      date: '2023 - 2025',
      role: 'Engineering Manager / Lead Architect',
      company: 'Dazlabs (Software Factory)',
      achievements: [
        'Liderazgo y mentoría técnica para un departamento técnico compuesto por hasta 24 ingenieros de desarrollo.',
        'Diseño de arquitectura backend 100% dinámica con NestJS, reduciendo en un 60% la necesidad de despliegues ante modificaciones UI.',
        'Implementación de microservicios robustos en Rust y Parse-Server para resolver cargas de alta concurrencia en entornos críticos.'
      ]
    },
    {
      date: '2022 - 2023',
      role: 'Senior Backend Developer',
      company: 'Alaxatech',
      achievements: [
        'Modelado de infraestructura crítica e integración de pasarelas y APIs para el portal transaccional Terraza Club.',
        'Desarrollo de módulos del sistema contable y documental de la ACHS utilizando Nest.js y bases de datos PostgreSQL.'
      ]
    },
    {
      date: '2020 - 2021',
      role: 'Coordinador de Sistemas / IT Manager',
      company: 'CorpoLara',
      achievements: [
        'Administración y optimización de servidores corporativos en Linux y del motor de bases de datos para el ERP gubernamental SIGESP.',
        'Diseño de protocolos de seguridad interna, logrando blindar las operaciones de datos del organismo en un 50%.'
      ]
    }
  ];

  private readonly esSkillsCategories: SkillCategory[] = [
    {
      title: 'Backend & APIs',
      icon: 'fa-solid fa-server',
      skills: [
        { name: 'TypeScript / Node.js', level: 'Experto' },
        { name: 'NestJS Framework', level: 'Experto' },
        { name: 'Rust (Axum & Tokio)', level: 'Avanzado' },
        { name: 'GraphQL / REST APIs', level: 'Experto' },
        { name: 'Parse-Server', level: 'Experto' }
      ]
    },
    {
      title: 'Frontend & UI',
      icon: 'fa-solid fa-laptop-code',
      skills: [
        { name: 'Angular (v14-v21)', level: 'Experto' },
        { name: 'Signals & State Management', level: 'Experto' },
        { name: 'HTML5 & Vanilla CSS3', level: 'Experto' },
        { name: 'Tailwind CSS', level: 'Avanzado' },
        { name: 'Responsive Layouts', level: 'Experto' }
      ]
    },
    {
      title: 'Databases & Messaging',
      icon: 'fa-solid fa-database',
      skills: [
        { name: 'MongoDB / Mongoose', level: 'Experto' },
        { name: 'PostgreSQL / SQL', level: 'Experto' },
        { name: 'RabbitMQ (Event Bus)', level: 'Avanzado' },
        { name: 'Redis (Cache)', level: 'Avanzado' }
      ]
    },
    {
      title: 'DevOps & Automations',
      icon: 'fa-solid fa-gears',
      skills: [
        { name: 'Docker / Docker Compose', level: 'Experto' },
        { name: 'Caddy Reverse Proxy', level: 'Avanzado' },
        { name: 'n8n Automations', level: 'Avanzado' },
        { name: 'Linux / Bash Scripting', level: 'Experto' },
        { name: 'Git / CI-CD', level: 'Avanzado' }
      ]
    }
  ];

  private readonly esGeneralTexts = {
    navHome: 'Inicio',
    navProjects: 'Proyectos',
    navExperience: 'Experiencia',
    navSkills: 'Habilidades',
    navContact: 'Contacto',
    heroBadge: 'Disponible para Liderazgo',
    heroTitle: 'Gustavo Hernández',
    heroSubtitle: 'Engineering Manager & Lead Software Architect',
    heroDescription: 'Líder tecnológico y Arquitecto de Software con más de 9 años de trayectoria escalando departamentos técnicos. Especialista en la creación de ecosistemas de backend distribuidos, desarrollo full-stack, automatización de procesos y dirección de equipos de alto rendimiento, enfocados en Clean Code y el retorno de inversión tecnológica (ROI).',
    heroContactBtn: 'Contáctame',
    heroCvEsBtn: 'Descargar CV (ES)',
    heroCvEnBtn: 'Download CV (EN)',
    statsExp: 'Años de Exp. Técnica',
    statsEngineers: 'Ingenieros Liderados',
    statsDeploys: 'Reducción en Deploys',
    statsPatterns: 'Clean Code & Patrones',
    projectsHeader: 'Proyectos Destacados',
    projectsSub: 'Casos de estudio reales y sistemas empresariales en producción diseñados para resolver problemas complejos de negocio.',
    filterAll: 'Todos',
    filterMicro: 'Microservicios',
    filterFull: 'Full-Stack / IA',
    filterGame: 'Juegos & Grafos',
    expHeader: 'Trayectoria Profesional',
    expSub: 'Dirección de departamentos de desarrollo e ingeniería de infraestructura crítica en empresas de tecnología.',
    skillsHeader: 'Stack Tecnológico',
    skillsSub: 'Tecnologías, arquitecturas y herramientas que domino e implemento en el desarrollo de software profesional.',
    contactHeader: '¿Conversamos?',
    contactSub: 'Si estás buscando un líder técnico que estructure tus metodologías de desarrollo, un arquitecto de software para escalar tu backend o un manager enfocado en eficiencia, contáctame directamente.',
    contactLocLabel: 'Ubicación',
    contactLocValue: 'Barquisimeto, Venezuela',
    contactEmailLabel: 'Correo Electrónico',
    contactLinkedInLabel: 'LinkedIn',
    formName: 'Nombre',
    formEmail: 'Correo',
    formSubject: 'Asunto',
    formMsg: 'Mensaje',
    formSuccess: '¡Mensaje enviado con éxito! Te responderé lo antes posible.',
    formSubmit: 'Enviar Mensaje',
    formSubmitting: 'Enviando...',
    footerRights: 'Gustavo Hernández. Todos los derechos reservados. | Diseñado en Angular con rendimiento optimizado.',
    modalDesc: 'Descripción General',
    modalHighlights: 'Aspectos Técnicos Destacados',
    modalTech: 'Tecnologías Empleadas',
    modalCloseBtn: 'Cerrar'
  };

  // --- ENGLISH DATA ---
  private readonly enProjects: Project[] = [
    {
      id: 'loomflow',
      title: 'Loomflow',
      tagline: 'Multi-tenant Textile ERP/CRM SaaS',
      description: 'Polyglot microservices enterprise platform specialized in textile manufacturing, featuring company-isolated MongoDB databases.',
      fullDescription: 'Loomflow is a comprehensive SaaS solution designed to centralize the management of garment factories and textile businesses. Being multi-tenant, it implements strict data isolation to guarantee confidentiality for each company. It stands out due to its modular architecture with real-time asynchronous event communication, allowing retail sales to automatically synchronize with workshop sewing queues.',
      images: [
        'assets/loomflow/administracion-tasas.png',
        'assets/loomflow/login.png',
        'assets/loomflow/soporte-bd-inquilino.png',
        'assets/loomflow/vista de creacion de inquilinos.png'
      ],
      category: 'microservices',
      tech: ['Angular 19+', 'NestJS', 'Rust', 'RabbitMQ', 'MongoDB', 'Caddy', 'Docker'],
      highlights: [
        'Polyglot Microservices Architecture with API Gateway and Auth Service (RBAC/PBAC).',
        'Workshop service developed in Rust (Axum/Tokio) for high concurrency production tracking.',
        'Distributed event bus using RabbitMQ to synchronize stock inventory across services.',
        'Reverse proxy with Caddy to serve the static frontend and manage SSL certificates.'
      ]
    },
    {
      id: 'peyber',
      title: 'Peyber Inventory System',
      tagline: 'Full-Stack ERP & Artificial Intelligence',
      description: 'Administrative system featuring production recipes (BOM), piecework payroll, SENIAT fiscal compliance, and intelligent agents for reports and support.',
      fullDescription: 'Deployed for Confecciones Peyber, this system unifies the production and financial chain. It automates costing estimation per garment (fabrics, threads, buttons, and waste), piecework-based payroll calculations applying Venezuelan legal deductions (SSO, SPF, FAOV), and bank reconciliation. It features powerful AI integrations to ease daily operations.',
      images: [
        'assets/peyber-inventory-system/dashboard-graficas.png',
        'assets/peyber-inventory-system/login.png',
        'assets/peyber-inventory-system/orden-agente.png',
        'assets/peyber-inventory-system/registrar-factura.png'
      ],
      category: 'fullstack',
      tech: ['Angular', 'NestJS', 'MongoDB', 'Mongoose', 'Cloudinary API', 'Gemini AI', 'Meta Webhooks'],
      highlights: [
        'Dynamic Bill of Materials (BOM) detailing manufacturing costs per garment version.',
        'Accounting Agent (AI): Query balances and record workshop logs using natural language.',
        'Instagram Agent (AI): Automate customer support, check real-time stock in MongoDB, and send Cloudinary links via Meta webhooks.',
        'Automated bookkeeping generating expenses upon material purchase registrations.'
      ]
    },
    {
      id: 'erebo',
      title: 'Proyecto Érebo',
      tagline: 'Tactical RPG & Deckbuilder Game Engine',
      description: 'Logical card-based exploration engine featuring dynamic graph map initialization and real-time dual-screen HUD synchronization.',
      fullDescription: 'Érebo is a turn-based tactical sci-fi exploration game. It stands out due to its asymmetric dual-screen design: players use their mobile devices to plan cards and manage inventory quietly (to avoid attracting enemies), while a tablet displays the HUD indicating panic, stress, health, and environmental perceptions.',
      images: [
        'assets/proyecto-erebo/creacion-pj.png',
        'assets/proyecto-erebo/login.png',
        'assets/proyecto-erebo/acciones-personaje.png',
        'assets/proyecto-erebo/creacion-mesa.png'
      ],
      category: 'game',
      tech: ['Angular CLI', 'NestJS CLI', 'MongoDB', 'Postman collections', 'Node.js'],
      highlights: [
        'Live Map: NestJS server initializes the entire scenario as a dynamic graph of physical tiles (nodes) and connections (edges).',
        'Fate Deck: A closed 14-card randomizer engine replacing dice rolls for strategic risk planning.',
        'Real-time HUD synchronization of status conditions (metabolism, paranoia, zone blood) triggered from the server.',
        'MongoDB database seeded with a bestiary of 17 enemies, loot, and exploration tiles.'
      ]
    }
  ];

  private readonly enTimeline: TimelineItem[] = [
    {
      date: '2023 - 2025',
      role: 'Engineering Manager / Lead Architect',
      company: 'Dazlabs (Software Factory)',
      achievements: [
        'Technical leadership and mentorship for a development department consisting of up to 24 software engineers.',
        'Designed a 100% dynamic backend architecture with NestJS, reducing UI-driven server redeployments by 60%.',
        'Implemented robust microservices in Rust and Parse-Server to handle high concurrency under critical workloads.'
      ]
    },
    {
      date: '2022 - 2023',
      role: 'Senior Backend Developer',
      company: 'Alaxatech',
      achievements: [
        'Modeled critical infrastructure and integrated API gateways for the transactional portal Terraza Club.',
        'Developed bookkeeping and document management modules for ACHS using Nest.js and PostgreSQL databases.'
      ]
    },
    {
      date: '2020 - 2021',
      role: 'Systems Coordinator / IT Manager',
      company: 'CorpoLara',
      achievements: [
        'Managed and optimized corporate Linux servers and database engines for the SIGESP government ERP.',
        'Designed internal security protocols, securing the organization\'s data operations by 50%.'
      ]
    }
  ];

  private readonly enSkillsCategories: SkillCategory[] = [
    {
      title: 'Backend & APIs',
      icon: 'fa-solid fa-server',
      skills: [
        { name: 'TypeScript / Node.js', level: 'Expert' },
        { name: 'NestJS Framework', level: 'Expert' },
        { name: 'Rust (Axum & Tokio)', level: 'Advanced' },
        { name: 'GraphQL / REST APIs', level: 'Expert' },
        { name: 'Parse-Server', level: 'Expert' }
      ]
    },
    {
      title: 'Frontend & UI',
      icon: 'fa-solid fa-laptop-code',
      skills: [
        { name: 'Angular (v14-v21)', level: 'Expert' },
        { name: 'Signals & State Management', level: 'Expert' },
        { name: 'HTML5 & Vanilla CSS3', level: 'Expert' },
        { name: 'Tailwind CSS', level: 'Advanced' },
        { name: 'Responsive Layouts', level: 'Expert' }
      ]
    },
    {
      title: 'Databases & Messaging',
      icon: 'fa-solid fa-database',
      skills: [
        { name: 'MongoDB / Mongoose', level: 'Expert' },
        { name: 'PostgreSQL / SQL', level: 'Expert' },
        { name: 'RabbitMQ (Event Bus)', level: 'Advanced' },
        { name: 'Redis (Cache)', level: 'Advanced' }
      ]
    },
    {
      title: 'DevOps & Automations',
      icon: 'fa-solid fa-gears',
      skills: [
        { name: 'Docker / Docker Compose', level: 'Expert' },
        { name: 'Caddy Reverse Proxy', level: 'Advanced' },
        { name: 'n8n Automations', level: 'Advanced' },
        { name: 'Linux / Bash Scripting', level: 'Expert' },
        { name: 'Git / CI-CD', level: 'Advanced' }
      ]
    }
  ];

  private readonly enGeneralTexts = {
    navHome: 'Home',
    navProjects: 'Projects',
    navExperience: 'Experience',
    navSkills: 'Skills',
    navContact: 'Contact',
    heroBadge: 'Available for Leadership',
    heroTitle: 'Gustavo Hernández',
    heroSubtitle: 'Engineering Manager & Lead Software Architect',
    heroDescription: 'Technical Leader and Software Architect with over 9 years of experience scaling technical departments. Specialist in creating distributed backend ecosystems, full-stack development, process automation, and leading high-performance multidisciplinary teams (up to 24 engineers) focused on Clean Code and technology ROI.',
    heroContactBtn: 'Contact Me',
    heroCvEsBtn: 'Download CV (ES)',
    heroCvEnBtn: 'Download CV (EN)',
    statsExp: 'Years of Tech Exp.',
    statsEngineers: 'Engineers Managed',
    statsDeploys: 'Reduction in Deploys',
    statsPatterns: 'Clean Code & Patterns',
    projectsHeader: 'Featured Projects',
    projectsSub: 'Real case studies and production enterprise systems designed to solve complex business challenges.',
    filterAll: 'All',
    filterMicro: 'Microservices',
    filterFull: 'Full-Stack / AI',
    filterGame: 'Games & Graphs',
    expHeader: 'Professional Experience',
    expSub: 'Leading software development departments and managing critical infrastructure engineering in tech companies.',
    skillsHeader: 'Tech Stack',
    skillsSub: 'Technologies, architectures, and tools that I master and implement in professional software development.',
    contactHeader: 'Let\'s Connect',
    contactSub: 'If you are looking for a technical leader to structure your development methodologies, a software architect to scale your backend, or a manager focused on efficiency, contact me directly.',
    contactLocLabel: 'Location',
    contactLocValue: 'Barquisimeto, Venezuela',
    contactEmailLabel: 'Email Address',
    contactLinkedInLabel: 'LinkedIn',
    formName: 'Name',
    formEmail: 'Email',
    formSubject: 'Subject',
    formMsg: 'Message',
    formSuccess: 'Message sent successfully! I will reply to you as soon as possible.',
    formSubmit: 'Send Message',
    formSubmitting: 'Sending...',
    footerRights: 'Gustavo Hernández. All rights reserved. | Designed in Angular with optimized performance.',
    modalDesc: 'General Description',
    modalHighlights: 'Technical Highlights',
    modalTech: 'Technologies Used',
    modalCloseBtn: 'Close'
  };

  // --- RECTIVE COMPUTED SIGNALS FOR SELECTED LANG ---
  protected readonly projects = computed(() => this.isSpanish() ? this.esProjects : this.enProjects);
  protected readonly timeline = computed(() => this.isSpanish() ? this.esTimeline : this.enTimeline);
  protected readonly skillsCategories = computed(() => this.isSpanish() ? this.esSkillsCategories : this.enSkillsCategories);
  protected readonly general = computed(() => this.isSpanish() ? this.esGeneralTexts : this.enGeneralTexts);

  // Computed filter selector based on language-computed projects array
  protected readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    const activeProjects = this.projects();
    if (filter === 'all') {
      return activeProjects;
    }
    return activeProjects.filter(project => project.category === filter);
  });

  // Contact Form Inputs
  protected readonly nameInput = signal('');
  protected readonly emailInput = signal('');
  protected readonly subjectInput = signal('');
  protected readonly messageInput = signal('');
  protected readonly isSubmitting = signal(false);
  protected readonly submitSuccess = signal(false);

  // Lightbox State
  protected readonly lightboxActive = signal(false);
  protected readonly lightboxImageIndex = signal(0);
  protected readonly lightboxImage = computed(() => {
    const project = this.selectedProject();
    if (!project) return '';
    return project.images[this.lightboxImageIndex()];
  });

  // Form submit handler
  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.nameInput() || !this.emailInput() || !this.subjectInput() || !this.messageInput()) {
      return;
    }

    this.isSubmitting.set(true);

    fetch('https://formsubmit.co/ajax/hernandez29a@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        Nombre: this.nameInput(),
        Email: this.emailInput(),
        Asunto: this.subjectInput(),
        Mensaje: this.messageInput(),
        _subject: 'Contacto Web: ' + this.subjectInput(),
        _captcha: 'false',
        _template: 'box'
      })
    })
    .then(response => response.json())
    .then(data => {
      this.isSubmitting.set(false);
      console.log('FormSubmit API Response:', data);
      if (data.success === 'true' || data.success === true) {
        this.submitSuccess.set(true);
        this.nameInput.set('');
        this.emailInput.set('');
        this.subjectInput.set('');
        this.messageInput.set('');
        
        setTimeout(() => {
          this.submitSuccess.set(false);
        }, 5000);
      } else {
        alert(this.isSpanish() ? 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.' : 'There was an error sending the message. Please try again.');
      }
    })
    .catch(error => {
      this.isSubmitting.set(false);
      console.error('Error:', error);
      alert(this.isSpanish() ? 'Hubo un error de conexión.' : 'Connection error.');
    });
  }

  // Update inputs methods
  protected updateName(value: string): void {
    this.nameInput.set(value);
  }

  protected updateEmail(value: string): void {
    this.emailInput.set(value);
  }

  protected updateSubject(value: string): void {
    this.subjectInput.set(value);
  }

  protected updateMessage(value: string): void {
    this.messageInput.set(value);
  }

  // Host listener scroll for FAB button
  @HostListener('window:scroll', [])
  protected onWindowScroll(): void {
    this.showBackToTop.set(window.scrollY > 300);
  }

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Toggles and getters
  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update(val => !val);
  }

  protected toggleTheme(): void {
    this.isDarkMode.update(val => !val);
  }

  protected toggleLanguage(): void {
    this.isSpanish.update(val => !val);
  }

  protected setFilter(filter: 'all' | 'microservices' | 'fullstack' | 'game'): void {
    this.activeFilter.set(filter);
  }

  protected openProject(project: Project): void {
    // Locate the translated project details matching the ID
    const currentProjects = this.projects();
    const matched = currentProjects.find(p => p.id === project.id);
    this.selectedProject.set(matched || project);
    this.activeImageIndex.set(0); 
    document.body.style.overflow = 'hidden'; 
  }

  protected closeProject(): void {
    this.selectedProject.set(null);
    this.closeLightbox();
    document.body.style.overflow = ''; 
  }

  // Lightbox methods
  protected openLightbox(index: number): void {
    this.lightboxImageIndex.set(index);
    this.lightboxActive.set(true);
  }

  protected closeLightbox(): void {
    this.lightboxActive.set(false);
  }

  protected prevLightboxImage(event?: Event): void {
    if (event) event.stopPropagation();
    const project = this.selectedProject();
    if (!project) return;
    const total = project.images.length;
    this.lightboxImageIndex.update(idx => (idx - 1 + total) % total);
  }

  protected nextLightboxImage(event?: Event): void {
    if (event) event.stopPropagation();
    const project = this.selectedProject();
    if (!project) return;
    const total = project.images.length;
    this.lightboxImageIndex.update(idx => (idx + 1) % total);
  }

  @HostListener('window:keydown', ['$event'])
  protected onKeyDown(event: KeyboardEvent): void {
    if (!this.lightboxActive()) return;
    
    if (event.key === 'Escape') {
      this.closeLightbox();
    } else if (event.key === 'ArrowLeft') {
      this.prevLightboxImage();
    } else if (event.key === 'ArrowRight') {
      this.nextLightboxImage();
    }
  }
}
