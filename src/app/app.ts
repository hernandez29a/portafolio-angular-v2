import { Component, signal, computed } from '@angular/core';

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  image: string;
  category: 'microservices' | 'fullstack' | 'game';
  tech: string[];
  github: string;
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

  // Projects Filter & Modal Selection State
  protected readonly activeFilter = signal<'all' | 'microservices' | 'fullstack' | 'game'>('all');
  protected readonly selectedProject = signal<Project | null>(null);

  // Projects Data
  protected readonly projects: Project[] = [
    {
      id: 'loomflow',
      title: 'Loomflow',
      tagline: 'SaaS ERP/CRM Multi-tenant Textil',
      description: 'Plataforma empresarial de microservicios políglotas especializada en confección textil, con base de datos MongoDB aislada por empresa.',
      fullDescription: 'Loomflow es una solución SaaS integral diseñada para centralizar la gestión de fábricas de ropa y comercios textiles. Al ser multi-tenant, implementa un estricto aislamiento de datos para garantizar la confidencialidad de cada empresa. Destaca por su arquitectura modular con comunicación asíncrona de eventos en tiempo real, permitiendo sincronizar las ventas de retail con las colas de costura de forma automática.',
      image: 'images/loomflow_mockup.png',
      category: 'microservices',
      tech: ['Angular 19+', 'NestJS', 'Rust', 'RabbitMQ', 'MongoDB', 'Caddy', 'Docker'],
      github: 'https://github.com/hernandez29a/saas-GH-Soft-Devs',
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
      image: 'images/peyber_mockup.png',
      category: 'fullstack',
      tech: ['Angular', 'NestJS', 'MongoDB', 'Mongoose', 'Cloudinary API', 'Gemini AI', 'Meta Webhooks'],
      github: 'https://github.com/hernandez29a/peyber_inventory_sistem',
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
      image: 'images/erebo_mockup.png',
      category: 'game',
      tech: ['Angular CLI', 'NestJS CLI', 'MongoDB', 'Postman collections', 'Node.js'],
      github: 'https://github.com/hernandez29a/proyecto-erebo',
      highlights: [
        'Mapa Vivo: Servidor NestJS calcula el escenario como un grafo dinámico de losetas físicas (nodos) y salidas (aristas).',
        'Mazo de Destino (Fate Deck): Motor de 14 cartas cerrado que reemplaza el azar de los dados para una planeación estratégica.',
        'Sincronización HUD de estados (metabolismo, paranoia, sangre de zona) disparados desde el servidor.',
        'Base de datos MongoDB sembrada (seeding) con bestiario de 17 enemigos, loot y losetas de aventura.'
      ]
    }
  ];

  // Computed signal to filter projects dynamically
  protected readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === filter);
  });

  // Skills Categories Data
  protected readonly skillsCategories: SkillCategory[] = [
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

  // Professional Experience Timeline
  protected readonly timeline: TimelineItem[] = [
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

  // Contact Form Signals
  protected readonly nameInput = signal('');
  protected readonly emailInput = signal('');
  protected readonly messageInput = signal('');
  protected readonly isSubmitting = signal(false);
  protected readonly submitSuccess = signal(false);

  // Form submit simulator
  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.nameInput() || !this.emailInput() || !this.messageInput()) {
      return;
    }

    this.isSubmitting.set(true);

    // Simulate server response delay
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitSuccess.set(true);
      
      // Clear form signals
      this.nameInput.set('');
      this.emailInput.set('');
      this.messageInput.set('');

      // Fade out success message after 5 seconds
      setTimeout(() => {
        this.submitSuccess.set(false);
      }, 5000);
    }, 1500);
  }

  // Update form state helper methods
  protected updateName(value: string): void {
    this.nameInput.set(value);
  }

  protected updateEmail(value: string): void {
    this.emailInput.set(value);
  }

  protected updateMessage(value: string): void {
    this.messageInput.set(value);
  }

  // Helper getters/toggles
  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update(val => !val);
  }

  protected setFilter(filter: 'all' | 'microservices' | 'fullstack' | 'game'): void {
    this.activeFilter.set(filter);
  }

  protected openProject(project: Project): void {
    this.selectedProject.set(project);
    document.body.style.overflow = 'hidden'; // Lock body scroll when modal open
  }

  protected closeProject(): void {
    this.selectedProject.set(null);
    document.body.style.overflow = ''; // Unlock body scroll
  }
}

