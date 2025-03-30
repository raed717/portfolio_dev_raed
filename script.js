const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Typing animation
const roles = ['Software Engineer', 'Full Stack Developer', 'Problem Solver', 'Tech Enthusiast'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;

function typeEffect() {
    const currentRole = roles[roleIndex];
    const dynamicText = document.querySelector('.dynamic-text');
    
    if (isDeleting) {
        dynamicText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        dynamicText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingDelay = 1000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 200;
    }

    setTimeout(typeEffect, isDeleting ? 100 : typingDelay);
}

// Start typing effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
    loadProjectData(); // Changed from populateProjects()
    loadEducationData();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Load project data
async function loadProjectData() {
    try {
        const response = await fetch('src/data/projects.json');
        const data = await response.json();
        populateProjects(data.projects);
    } catch (error) {
        console.error('Error loading project data:', error);
    }
}

// Update populate projects function
function populateProjects(projects) {
    const projectsGrid = document.querySelector('.projects-grid');
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" class="project-img" onclick="openModal(this.src)">
                <div class="project-overlay">
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tech">
                            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            ${project.github_available ? 
                                `<a href="${project.github}" target="_blank" class="btn secondary">
                                    <i class="fab fa-github"></i> GitHub
                                </a>` : ''
                            }
                            ${project.live_available ? 
                                `<a href="${project.live}" target="_blank" class="btn primary">
                                    <i class="fas fa-external-link-alt"></i> Live Demo
                                </a>` : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Modal functionality
function openModal(imgSrc) {
    const modal = document.getElementById('imageModal');
    if (modal) {
        const modalImg = modal.querySelector('.modal-content');
        const captionText = modal.querySelector('.caption');
        modal.style.display = "block";
        if (modalImg) modalImg.src = imgSrc;
        if (captionText) captionText.innerHTML = imgSrc;
    }
}

// Close modal when clicking the close button or outside the modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.onclick = () => {
            if (modal) modal.style.display = "none";
        };
    }
    
    if (modal) {
        modal.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }
});

// Get the modal
var modal = document.getElementById("imageModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");

// Get all images in the project section
var images = document.querySelectorAll(".project-section img");

images.forEach(function(img) {
  img.addEventListener('click', function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  });
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}

// Form handling
const contactForm = document.getElementById('contact-form');

// Create success message element
const successMessage = document.createElement('div');
successMessage.className = 'success-message';
successMessage.style.display = 'none';
successMessage.innerHTML = '<p>Message sent successfully! </p>';

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Load education data
async function loadEducationData() {
    try {
        const response = await fetch('src/data/education.json');
        const data = await response.json();
        populateEducation(data.education);
        populateCertifications(data.certifications);
    } catch (error) {
        console.error('Error loading education data:', error);
    }
}

// Update the populateEducation function
function populateEducation(educationData) {
    const timelineContainer = document.querySelector('.timeline-items');
    educationData.forEach(edu => {
        const eduItem = document.createElement('div');
        eduItem.className = 'education-item';
        eduItem.innerHTML = `
            <div class="education-header">
                <img src="${edu.institutionLogo}" alt="${edu.institution} logo" class="institution-logo">
                <div>
                    <h4>${edu.degree}</h4>
                    <p class="institution">${edu.institution}</p>
                </div>
            </div>
            <p class="location">${edu.location}</p>
            <p class="period">${edu.period}</p>
            <p class="description">${edu.description}</p>
            <ul class="achievements">
                ${edu.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
        `;
        timelineContainer.appendChild(eduItem);
    });
}

function populateCertifications(certifications) {
    const certContainer = document.querySelector('.cert-items');
    certifications.forEach(cert => {
        const certCard = document.createElement('div');
        certCard.className = 'cert-card';
        certCard.innerHTML = `
            <div class="cert-header">
                <img src="${cert.logo}" alt="${cert.issuer} logo" class="cert-logo">
                <h4>${cert.name}</h4>
            </div>
            <p class="issuer">${cert.issuer}</p>
            <p class="date">${cert.date}</p>
            <a href="${cert.link}" target="_blank">View Certificate <i class="fas fa-external-link-alt"></i></a>
        `;
        certContainer.appendChild(certCard);
    });
}
