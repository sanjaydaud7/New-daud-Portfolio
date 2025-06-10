// Navigation Toggle for Mobile
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
});

// Close Navigation on Link Click (Mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            mainNav.classList.remove('open');
        }
    });
});

// Skills Data
const skillsData = [
    {
        category: "Programming Languages",
        icon: "code",
        items: ["JavaScript (ES6+)",  "Python", "Java", "HTML5", "CSS3"]
    },
    {
        category: "Frameworks & Libraries",
        icon: "palette",
        items: ["React",  "Node.js", "Express.js", "Tailwind CSS", ]
    },
    {
        category: "Databases",
        icon: "database",
        items: ["MongoDB",  "MySQL"]
    },
    {
        category: "Tools & Platforms",
        icon: "settings",
        items: ["Git & GitHub",  "VS Code", "Firebase", "AWS (Basic)"]
    },
    {
        category: "Backend & APIs",
        icon: "server",
        items: ["RESTful APIs"]
    }
];

// Render Skills Function
function renderSkills() {
    const grid = document.getElementById('skills-grid');
    skillsData.forEach(skillCategory => {
        const card = document.createElement('div');
        card.className = 'card';

        const header = document.createElement('div');
        header.className = 'flex items-center mb-4';
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', skillCategory.icon);
        icon.className = 'mr-3 text-teal-500';
        icon.style.width = '1.75rem';
        icon.style.margin = '1.75rem';
        icon.style.height = '1.75rem';
        icon.style.color = '#4db6ac';
        const title = document.createElement('h3');
        title.className = 'text-xl font-semibold text-center text-gray-800';
        title.textContent = skillCategory.category;
        header.appendChild(icon);
        header.appendChild(title);

        const content = document.createElement('ul');
        content.className = 'space-y-2';
        skillCategory.items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex items-center text-gray-600';
            const checkIcon = document.createElement('i');
            checkIcon.setAttribute('data-lucide', 'check-circle');
            checkIcon.className = 'mr-2 text-teal-500';
            checkIcon.style.width = '1rem';
            checkIcon.style.height = '1rem';
            checkIcon.style.color = '#4db6ac';
            const span = document.createElement('span');
            span.textContent = item;
            li.appendChild(checkIcon);
            li.appendChild(span);
            content.appendChild(li);
        });

        card.appendChild(header);
        card.appendChild(content);
        grid.appendChild(card);
    });

    lucide.createIcons();
}

// Fetch and Render Projects from Google Sheet
// Fetch and Render Projects from Google Sheet
async function fetchAndRenderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = ''; // Clear existing projects

    const SPREADSHEET_ID = '1vjR8w4lPTJGZ3G4qX9fLPHdEzsMncZn9Yqcu1zlfxRo';
    const RANGE = 'Sheet1!A1:F';
    const API_KEY = 'AIzaSyDk4zMgDMwoTGC7kvacKXWw5C_DB_BTxZ0';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        if (!data.values || data.values.length < 2) {
            throw new Error('No project data found in the specified range.');
        }

        const headers = data.values[0];
        const projects = data.values.slice(1).map(row => {
            return headers.reduce((obj, header, index) => {
                obj[header.toLowerCase()] = row[index] || '';
                return obj;
            }, {});
        });

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'card';

            const img = document.createElement('img');
            img.src = project.imageurl || 'https://via.placeholder.com/600x400';
            img.alt = project.title;
            card.appendChild(img);

            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';

            const title = document.createElement('h3');
            title.textContent = project.title;
            cardContent.appendChild(title);

            const description = document.createElement('p');
            description.textContent = project.description;
            cardContent.appendChild(description);

            const tagsDiv = document.createElement('div');
            tagsDiv.className = 'tags';
            const tags = project.tags ? project.tags.split(',').map(tag => tag.trim()) : [];
            tags.forEach(tag => {
                const span = document.createElement('span');
                span.textContent = tag;
                tagsDiv.appendChild(span);
            });
            cardContent.appendChild(tagsDiv);

            const cardButtons = document.createElement('div');
            cardButtons.className = 'card-buttons';

            function isValidUrl(string) {
                try {
                    new URL(string);
                    return true;
                } catch (_) {
                    return false;
                }
            }

            const githubLink = document.createElement('a');
            githubLink.href = isValidUrl(project.githublink) ? project.githublink : '#';
            githubLink.target = '_blank';
            githubLink.className = 'btn btn-outline';
            githubLink.innerHTML = '<i class="fab fa-github"></i> GitHub';
            if (!isValidUrl(project.githublink)) githubLink.classList.add('disabled');
            cardButtons.appendChild(githubLink);

            const demoLink = document.createElement('a');
            demoLink.href = isValidUrl(project.demolink) ? project.demolink : '#';
            demoLink.target = '_blank';
            demoLink.className = 'btn btn-primary';
            demoLink.innerHTML = 'Live Demo <i class="fas fa-external-link-alt"></i>';
            if (!isValidUrl(project.demolink)) demoLink.classList.add('disabled');
            cardButtons.appendChild(demoLink);

            cardContent.appendChild(cardButtons);
            card.appendChild(cardContent);
            projectsGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        projectsGrid.innerHTML = '<p>Error loading projects. Please try again later.</p>';
    }
}
// Create Certificate Popup
function createPopup(imageUrl) {
    const popup = document.createElement('div');
    popup.className = 'certificate-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <img src="${imageUrl}" alt="Certificate" class="popup-image">
        </div>
    `;
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 2000);
}

// Fetch and Render Certificates from Google Sheet
async function fetchAndRenderCertificates() {
    const container = document.getElementById("certificatesContainer");
    container.innerHTML = ''; // Clear existing certificates

    const SPREADSHEET_ID = '1vjR8w4lPTJGZ3G4qX9fLPHdEzsMncZn9Yqcu1zlfxRo';
    const RANGE = 'certificate!A1:F';
    const API_KEY = 'AIzaSyDk4zMgDMwoTGC7kvacKXWw5C_DB_BTxZ0';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        if (!data.values || data.values.length < 2) {
            throw new Error('No certificate data found in the specified range.');
        }

        const headers = data.values[0];
        const certificates = data.values.slice(1).map(row => {
            return headers.reduce((obj, header, index) => {
                obj[header.toLowerCase()] = row[index] || '';
                return obj;
            }, {});
        });

        certificates.forEach(certificate => {
            const certDiv = document.createElement("div");
            certDiv.className = "certificate";
            certDiv.innerHTML = `
                <div class="certificate-header">
                    <h3>${certificate.title}</h3>
                </div>
                <p>Issued by: ${certificate.issuer}</p>
                <p>Date: ${certificate.date}</p>
                <a href="${certificate['certicate link']}" target="_blank" rel="noopener noreferrer" class="verify-link">
                    Verify Certificate
                </a>
                <button class="btn btn-primary view-certificate-btn" data-image="${certificate['view certificate']}">
                    View Certificate
                </button>
            `;
            container.appendChild(certDiv);
        });

        // Add event listeners to the view certificate buttons
        document.querySelectorAll('.view-certificate-btn').forEach(button => {
            button.addEventListener('click', () => {
                const imageUrl = button.getAttribute('data-image');
                if (imageUrl) {
                    createPopup(imageUrl);
                }
            });
        });
    } catch (error) {
        console.error('Error fetching certificates:', error);
        container.innerHTML = '<p>Error loading certificates. Please try again later.</p>';
    }
}

// Contact Form Validation and Submission
const form = document.getElementById('contact-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    let hasError = false;
    if (name.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters.';
        nameError.classList.add('error');
        hasError = true;
    } else {
        nameError.textContent = '';
        nameError.classList.remove('error');
    }

    if (!email.includes('@')) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.classList.add('error');
        hasError = true;
    } else {
        emailError.textContent = '';
        emailError.classList.remove('error');
    }

    if (message.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters.';
        messageError.classList.add('error');
        hasError = true;
    } else {
        messageError.textContent = '';
        messageError.classList.remove('error');
    }

    if (hasError) return;

    try {
        // Prepare data for Google Apps Script
        const data = {
            values: [
                [
                    new Date().toISOString(),
                    name,
                    email,
                    message
                ]
            ]
        };

        // Google Apps Script Web App URL
        const webAppUrl = 'https://script.google.com/macros/s/AKfycbxZf4OI5IIoeo8n0XNzFoTP8wo0r-2ONrGK3jnzh7biY8FNyVzhRWAqu0Q-Tf0aZwLF/exec';

        const response = await fetch(webAppUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'cors', // Enable CORS
            redirect: 'follow' // Follow redirects
        });

        const result = await response.json();

        if (result.status === 'success') {
            alert('Message Sent! Thanks for reaching out.');
            form.reset();
        } else {
            throw new Error(result.message || 'Failed to send message to Google Apps Script.');
        }
    } catch (error) {
        console.error('Error submitting contact form:', error);
        alert(`Error: Failed to send message. Please try again later. Details: ${error.message}`);
    }
});

// Animate Education Cards on Scroll
function animateEducationCards() {
    const cards = document.querySelectorAll('.education-card');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation with different delays
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    
                    // Add hover effects after animation completes
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.3s ease';
                    }, 600);
                    
                    // Add floating animation after card appears
                    setTimeout(() => {
                        entry.target.style.animation = 'float 6s ease-in-out infinite';
                        if (index % 2 === 1) {
                            entry.target.style.animationDelay = '1.5s';
                        }
                    }, 1000);
                }, index * 300);
                
                // Unobserve after animation starts to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px' // Trigger when 100px from bottom of viewport
    });

    // Observe each card
    cards.forEach(card => {
        // Add mouseenter/mouseleave events for additional interactivity
        card.addEventListener('mouseenter', () => {
            if (card.classList.contains('visible')) {
                card.style.transform = 'scale(1.02)';
                card.style.boxShadow = '0 15px 30px -10px rgba(0, 0, 0, 0.2)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('visible')) {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
            }
        });
        
        // Start observing
        observer.observe(card);
    });
    
    // Add parallax effect to the timeline line
    window.addEventListener('scroll', () => {
        const timelineLine = document.querySelector('.timeline-line');
        if (timelineLine) {
            const scrollPosition = window.pageYOffset;
            timelineLine.style.transform = `translateX(-50%) translateY(${scrollPosition * 0.1}px)`;
        }
    });
}

// Initialize on Page Load
window.onload = () => {
    renderSkills();
    fetchAndRenderProjects();
    fetchAndRenderCertificates();
    animateEducationCards();
};