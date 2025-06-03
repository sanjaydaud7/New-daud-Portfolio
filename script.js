// Google Sheets API Configuration
const SPREADSHEET_ID = '1uJIiNGzAJ93PJxi4qwfvjBaOeL6lmNoQlW2koo_m1jw';
const API_KEY = 'AIzaSyBr8r3BIycQMTkywmzRs4NTupHgl_qHuEw';
const RANGE = 'projects!A2:E';

// Function to fetch project data from Google Sheets
async function fetchProjects() {
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        const data = await response.json();
        if (!data.values || data.values.length === 0) {
            console.error('No data found in Google Sheet');
            return [];
        }
        return data.values.map(row => ({
            title: row[0] || 'Untitled Project',
            type: row[1] || 'Unknown Type',
            description: row[2] || 'No description available.',
            link: row[3] || '#',
            image: row[4] || 'https://via.placeholder.com/350x200' // Updated fallback image size
        }));
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

// Function to render projects on the page
function renderProjects(projects, containerId) {
    const container = document.querySelector(containerId);
    if (!container) return;

    container.innerHTML = '';

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" style="height: 200px;">
            <h2>${project.title}</h2>
            <h4>${project.type}</h4>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank" class="view-project-btn">View Project</a>
        `;
        container.appendChild(projectCard);
    });
}

// Load projects when the DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    const projects = await fetchProjects();
    renderProjects(projects, '#index-projects .projects-container');
    renderProjects(projects, '#projects .projects-container');
});

// ========== HAMBURGER MENU TOGGLE ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// ========== EDUCATION ROADMAP ANIMATION ==========
function animateEducationCards() {
    const cards = document.querySelectorAll('.education-card');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    cards.forEach((card) => observer.observe(card));
}

document.addEventListener('DOMContentLoaded', () => {
    animateEducationCards();
});

// ========== PARALLAX EFFECT FOR HERO IMAGE ==========
const heroImage = document.querySelector('.intro-section .image-container');
if (heroImage) {
    window.addEventListener('scroll', function () {
        const scrollValue = window.scrollY;
        heroImage.style.transform = `translateY(${scrollValue * 0.3}px)`;
    });
}

// ========== PARTICLE BACKGROUND FOR HERO SECTION ==========
function createParticles() {
    const container = document.querySelector('.intro-section');
    if (!container) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 10 + 12;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;

        container.appendChild(particle);
    }
}
createParticles();

// Add CSS dynamically
const style = document.createElement('style');
style.textContent = `
    /* Active nav link */
    .header ul li.active {
        color: rgb(58, 225, 244) !important;
        text-decoration: underline;
    }
    
    /* Skill bars */
    .skill-bar-container {
        background: #444;
        border-radius: 5px;
    }
    
    .skill-bar {
        background: linear-gradient(90deg, #f4a261, #e76f51);
        border-radius: 5px;
    }
    
    .skill-name {
        color: #b0b0b0;
    }
    
    .skill-percent {
        color: #f4a261;
    }
`;
document.head.appendChild(style);

// Animate skill bars
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    const skillsList = document.querySelector('.skill ol');
    if (skillsList) {
        skillsList.innerHTML = '';
        
        const skillsData = [
            { name: 'C Programming', level: '90%' },
            { name: 'C++ Programming', level: '85%' },
            { name: 'Python Programming', level: '80%' },
            { name: 'Frontend Development', level: '100%' },
            { name: 'HTML', level: '100%' },
            { name: 'CSS', level: '100%' },
            { name: 'JavaScript', level: '75%' },
            { name: 'Node.js', level: '75%' },
            { name: 'Java Development', level: '75%' },
            { name: 'Advanced MS Excel', level: '90%' }
        ];
        
        skillsData.forEach(skill => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="skill-name">${skill.name}</span>
                <div class="skill-bar-container">
                    <div class="skill-bar" data-level="${skill.level}"></div>
                </div>
                <span class="skill-percent">${skill.level}</span>
            `;
            skillsList.appendChild(li);
        });
    }

    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        const sectionTop = skillsSection.offsetTop;
        const sectionHeight = skillsSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        if (scrollPosition > sectionTop + 200) {
            skillBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                bar.style.width = level;
                bar.style.opacity = '1';
            });
        }
    }

    window.addEventListener('scroll', animateSkillBars);
}

// Internship popup functionality
document.querySelectorAll('.view-details-btn').forEach((button, index) => {
    button.addEventListener('click', () => {
        const internshipId = index;
        window.location.href = `details.html?id=${internshipId}`;
    });
});

// Popup functionality for certificates
const certificateCards = document.querySelectorAll('.certificate-card');
const popup = document.querySelector('.certificate-popup');
const popupOverlay = document.querySelector('.popup-overlay');
const popupImage = popup.querySelector('img');
const popupTitle = popup.querySelector('h2');
const popupIssuer = popup.querySelector('h4');
const popupDescription = popup.querySelector('.description');
const popupDate = popup.querySelector('.date');
const popupVerificationLink = popup.querySelector('.verification-link') || document.createElement('p');
popupVerificationLink.classList.add('verification-link');
if (!popup.querySelector('.verification-link')) popup.appendChild(popupVerificationLink);

let hoverTimeout;

certificateCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        hoverTimeout = setTimeout(() => {
            const image = card.getAttribute('data-image');
            const title = card.getAttribute('data-title');
            const issuer = card.getAttribute('data-issuer');
            const description = card.getAttribute('data-description');
            const date = card.getAttribute('data-date');
            const certificateVerification = card.getAttribute('data-certificate-verification');

            popupImage.src = image;
            popupTitle.textContent = title;
            popupIssuer.textContent = issuer;
            popupDescription.textContent = description;
            popupDate.textContent = date;

            if (certificateVerification) {
                popupVerificationLink.innerHTML = `<a href="${certificateVerification}" target="_blank">Verify Certificate</a>`;
            } else {
                popupVerificationLink.innerHTML = '';
            }

            popup.classList.add('active');
            popupOverlay.classList.add('active');
        }, 2000);
    });

    card.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
    });
});

popup.addEventListener('mouseleave', () => {
    popup.classList.remove('active');
    popupOverlay.classList.remove('active');
});

popupOverlay.addEventListener('click', () => {
    popup.classList.remove('active');
    popupOverlay.classList.remove('active');
});



// Existing code from your script.js remains unchanged above this point

// ========== EDUCATION ROADMAP ANIMATION ==========
function animateEducationCards() {
    const cards = document.querySelectorAll('.education-card');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        },
        {
            threshold: 0.5, // Trigger when 20% of the card is visible
            rootMargin: '0px 0px -50px 0px' // Adjust for better timing
        }
    );

    cards.forEach((card) => observer.observe(card));
}

// Call the animation function when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    animateEducationCards();
});

// Existing code from your script.js continues below this point