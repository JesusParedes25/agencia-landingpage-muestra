// Government Offices Data
const governmentOffices = {
    "licencia de conducir": [
        {
            name: "Oficina de Tránsito Municipal - Pachuca",
            address: "Av. Revolución 1234, Centro, Pachuca",
            phone: "(771) 123-4567",
            hours: "Lunes a Viernes 8:00 - 15:00",
            coordinates: [20.1011, -98.7591]
        },
        {
            name: "Módulo de Tránsito - Plaza Galerías",
            address: "Blvd. Colosio 1500, Pachuca",
            phone: "(771) 234-5678",
            hours: "Lunes a Sábado 9:00 - 18:00",
            coordinates: [20.0847, -98.7514]
        }
    ],
    "acta de nacimiento": [
        {
            name: "Registro Civil - Pachuca Centro",
            address: "Plaza Independencia s/n, Centro, Pachuca",
            phone: "(771) 345-6789",
            hours: "Lunes a Viernes 8:00 - 15:00",
            coordinates: [20.1219, -98.7324]
        },
        {
            name: "Registro Civil - Tulancingo",
            address: "Av. Juárez 456, Centro, Tulancingo",
            phone: "(775) 456-7890",
            hours: "Lunes a Viernes 8:00 - 14:00",
            coordinates: [20.0833, -98.3667]
        }
    ],
    "pasaporte": [
        {
            name: "Delegación SRE - Pachuca",
            address: "Blvd. Felipe Ángeles 2020, Pachuca",
            phone: "(771) 567-8901",
            hours: "Lunes a Viernes 8:00 - 13:00",
            coordinates: [20.1167, -98.7333]
        }
    ],
    "curp": [
        {
            name: "Módulo CURP - Palacio Municipal",
            address: "Plaza Independencia s/n, Centro, Pachuca",
            phone: "(771) 678-9012",
            hours: "Lunes a Viernes 8:00 - 15:00",
            coordinates: [20.1219, -98.7324]
        }
    ]
};

// Timeline Data
const timelineData = [
    {
        year: "2022",
        title: "Se fortalece la Comisión Estatal de Mejora Regulatoria",
        description: "Consolidación de los procesos de simplificación administrativa en el estado."
    },
    {
        year: "2023",
        title: "Implementación de Plataformas Digitales",
        description: "Lanzamiento de las primeras herramientas digitales para ciudadanos."
    },
    {
        year: "2024",
        title: "Digitalización Masiva de Trámites",
        description: "Más del 70% de los trámites estatales disponibles en línea."
    },
    {
        year: "2025",
        title: "Emisión de la Ley Nacional para Eliminar Trámites Burocráticos",
        description: "Marco legal para la simplificación de procesos gubernamentales."
    },
    {
        year: "2026",
        title: "Se crea la Agencia Estatal de Simplificación y Digitalización",
        description: "Establecimiento formal de la agencia como ente rector de la transformación digital."
    }
];

// DOM Elements
const tramiteSearch = document.getElementById('tramiteSearch');
const searchBtn = document.getElementById('searchBtn');
const resultsPanel = document.getElementById('resultsPanel');
const officeResults = document.getElementById('officeResults');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const faqQuestions = document.querySelectorAll('.faq-question');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// LlaveMX Login Function
function loginWithLlaveMX() {
    alert('Redirigiendo a LlaveMX para autenticación...\n\nEsta es una demostración. En producción se conectaría con el sistema real de LlaveMX.');
}

// Initialize timeline
function initializeTimeline() {
    renderTimeline();
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTimeline();
    initializeEducationTabs();
    initializeFAQ();
    initializeParticipationModals();
    initializeMapSearch();
});

// Search for government offices
function searchOffices() {
    const query = tramiteSearch.value.toLowerCase().trim();
    
    if (!query) {
        resultsPanel.style.display = 'none';
        return;
    }
    
    // Find matching offices
    let foundOffices = [];
    for (const [tramite, offices] of Object.entries(governmentOffices)) {
        if (tramite.includes(query) || query.includes(tramite.split(' ')[0])) {
            foundOffices = [...foundOffices, ...offices.map(office => ({...office, tramite}))];
        }
    }
    
    if (foundOffices.length > 0) {
        displayOfficeResults(foundOffices);
        resultsPanel.style.display = 'block';
    } else {
        displayNoResults();
        resultsPanel.style.display = 'block';
    }
}

// Display office search results
function displayOfficeResults(offices) {
    officeResults.innerHTML = offices.map(office => `
        <div class="office-result">
            <div class="office-name">${office.name}</div>
            <div class="office-address">${office.address}</div>
            <div class="office-info">
                <small><i class="fas fa-phone"></i> ${office.phone}</small><br>
                <small><i class="fas fa-clock"></i> ${office.hours}</small>
            </div>
            <div class="office-actions">
                <button class="btn btn-small btn-primary" onclick="openInGoogleMaps(${office.coordinates[0]}, ${office.coordinates[1]}, '${office.name}')">
                    <i class="fas fa-map-marker-alt"></i> Ver en Maps
                </button>
            </div>
        </div>
    `).join('');
}

// Display no results message
function displayNoResults() {
    officeResults.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #666;">
            <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; color: #ccc;"></i>
            <h4>No se encontraron oficinas</h4>
            <p>Intenta buscar con términos como: "licencia", "acta", "pasaporte", "curp"</p>
        </div>
    `;
}

// Open location in Google Maps
function openInGoogleMaps(lat, lng, name) {
    const url = `https://www.google.com/maps?q=${lat},${lng}&z=15&t=m&hl=es&gl=MX&mapclient=embed&cid=${encodeURIComponent(name)}`;
    window.open(url, '_blank');
}

// Render timeline
function renderTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    if (!timelineContainer) {
        console.error('Timeline container not found');
        return;
    }
    
    console.log('Rendering timeline with data:', timelineData);
    
    timelineContainer.innerHTML = timelineData.map((item, index) => `
        <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
            <div class="timeline-year">${item.year}</div>
            <div class="timeline-content">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');
    
    console.log('Timeline rendered successfully');
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', searchOffices);
    }
    
    if (tramiteSearch) {
        tramiteSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchOffices();
            }
        });
    }

    // Tab functionality for Education section
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });

    // FAQ accordion
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                icon.style.transform = 'rotate(0deg)';
            } else {
                // Close all other answers
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.style.display = 'none';
                });
                document.querySelectorAll('.faq-question i').forEach(ic => {
                    ic.style.transform = 'rotate(0deg)';
                });
                
                // Open clicked answer
                answer.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Modal functionality
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Mobile navigation
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

}

// Open modal for participation
function openModal(type) {
    const modalContent = getModalContent(type);
    modalBody.innerHTML = modalContent;
    modal.style.display = 'block';
    
    // Setup form submission
    const form = modalBody.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }
}

// Get modal content based on type
function getModalContent(type) {
    const contents = {
        suggestions: `
            <h2>Enviar Sugerencia</h2>
            <form id="suggestionForm">
                <div class="form-group">
                    <label for="name">Nombre completo</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Correo electrónico</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="category">Categoría</label>
                    <select id="category" name="category" required>
                        <option value="">Selecciona una categoría</option>
                        <option value="mejora-servicio">Mejora de servicio</option>
                        <option value="nueva-funcionalidad">Nueva funcionalidad</option>
                        <option value="usabilidad">Usabilidad</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="suggestion">Tu sugerencia</label>
                    <textarea id="suggestion" name="suggestion" placeholder="Describe tu sugerencia en detalle..." required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Enviar Sugerencia</button>
            </form>
        `,
        questions: `
            <h2>Hacer Pregunta</h2>
            <form id="questionForm">
                <div class="form-group">
                    <label for="name">Nombre completo</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Correo electrónico</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="topic">Tema de consulta</label>
                    <select id="topic" name="topic" required>
                        <option value="">Selecciona un tema</option>
                        <option value="llavemx">LlaveMX</option>
                        <option value="tramites">Trámites en línea</option>
                        <option value="seguridad">Seguridad digital</option>
                        <option value="herramientas">Herramientas digitales</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="question">Tu pregunta</label>
                    <textarea id="question" name="question" placeholder="Escribe tu pregunta..." required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Enviar Pregunta</button>
            </form>
        `,
        issues: `
            <h2>Reportar Problema</h2>
            <form id="issueForm">
                <div class="form-group">
                    <label for="name">Nombre completo</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Correo electrónico</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="service">Servicio afectado</label>
                    <select id="service" name="service" required>
                        <option value="">Selecciona el servicio</option>
                        <option value="portal-citas">Portal de Citas</option>
                        <option value="app-movil">App Móvil</option>
                        <option value="tramites">Trámites en línea</option>
                        <option value="llavemx">LlaveMX</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="priority">Prioridad</label>
                    <select id="priority" name="priority" required>
                        <option value="">Selecciona la prioridad</option>
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                        <option value="critica">Crítica</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="issue">Descripción del problema</label>
                    <textarea id="issue" name="issue" placeholder="Describe el problema que experimentaste..." required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Reportar Problema</button>
            </form>
        `,
        contact: {
            title: 'Contacto y Sugerencias',
            form: `
                <form id="contactForm">
                    <div class="form-group">
                        <label for="name">Nombre completo</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Correo electrónico</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="type">Tipo de contacto</label>
                        <select id="type" name="type" required>
                            <option value="">Selecciona el tipo</option>
                            <option value="sugerencia">Sugerencia de mejora</option>
                            <option value="duda">Duda o consulta</option>
                            <option value="felicitacion">Felicitación</option>
                            <option value="queja">Queja o reclamo</option>
                            <option value="informacion">Solicitud de información</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="message">Mensaje</label>
                        <textarea id="message" name="message" placeholder="Comparte tu mensaje, sugerencia o consulta..." required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
                        <button type="button" class="btn btn-secondary" onclick="closeModalHandler()">Cancelar</button>
                    </div>
                </form>
            `
        },
        report: {
            title: 'Reportar Falla en Plataforma',
            form: `
                <form id="reportForm">
                    <div class="form-group">
                        <label for="name">Nombre completo</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Correo electrónico</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="platform">Plataforma con falla</label>
                        <select id="platform" name="platform" required>
                            <option value="">Selecciona la plataforma</option>
                            <option value="ruts">RUTS - Registro Único de Trámites</option>
                            <option value="aid-ruts">Aid RUTS - Asistencia para trámites</option>
                            <option value="protesta">Protesta Ciudadana</option>
                            <option value="migrantes">Plataforma Migrantes Hidalgo</option>
                            <option value="pueblos">Plataforma Pueblos Indígenas</option>
                            <option value="sair">SAIR - Sistema de Atención Integral</option>
                            <option value="otra">Otra plataforma gubernamental</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="url">URL de la plataforma (opcional)</label>
                        <input type="url" id="url" name="url" placeholder="https://ejemplo.hidalgo.gob.mx">
                        <small>Incluye la dirección web donde encontraste el problema</small>
                    </div>
                    <div class="form-group">
                        <label for="severity">Severidad del problema</label>
                        <select id="severity" name="severity" required>
                            <option value="">Selecciona la severidad</option>
                            <option value="baja">Baja - Problema cosmético o menor</option>
                            <option value="media">Media - Afecta algunas funciones</option>
                            <option value="alta">Alta - Funcionalidad principal no funciona</option>
                            <option value="critica">Crítica - Plataforma completamente inaccesible</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="description">Descripción detallada del problema</label>
                        <textarea id="description" name="description" placeholder="Describe paso a paso qué estabas haciendo cuando ocurrió el problema, qué esperabas que pasara y qué pasó realmente..." required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="browser">Navegador y dispositivo (opcional)</label>
                        <input type="text" id="browser" name="browser" placeholder="Ej: Chrome en Windows, Safari en iPhone">
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">Reportar Falla</button>
                        <button type="button" class="btn btn-secondary" onclick="closeModalHandler()">Cancelar</button>
                    </div>
                </form>
            `
        }
    };

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.innerHTML = '<span class="spinner"></span>Enviando...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: #28a745; margin-bottom: 20px;"></i>
                <h2>¡Enviado exitosamente!</h2>
                <p>Gracias por tu participación. Hemos recibido tu ${getFormType(form.id)} y te contactaremos pronto.</p>
                <button class="btn btn-primary" onclick="modal.style.display='none'">Cerrar</button>
            </div>
        `;
        
        console.log('Form submitted:', data);
    }, 2000);
}

// Get form type for success message
function getFormType(formId) {
    const types = {
        'contactForm': 'mensaje',
        'reportForm': 'reporte de falla'
    };
    return types[formId] || 'información';
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup scroll animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.about-card, .pillar, .tool-card, .blog-card, .metric-card, .option-card, .news-card').forEach(el => {
        observer.observe(el);
    });
}

// Update active navigation link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Make functions globally available
window.openModal = openModal;
window.searchOffices = searchOffices;
window.openInGoogleMaps = openInGoogleMaps;
