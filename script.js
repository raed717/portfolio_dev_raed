// Custom cursor
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
    populateProjects();
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

// Project data
const projects = [
    {
        title: 'HR Assistant',
        description: 'Human Resource Assistant system for HR department to hel Agents analysing candidates profiles and interviews with AI.',
        technologies: ['React', 'Node.js', 'MongoDB'],
        image: 'images/HR2.png',
        github: '#',
        live: 'https://drive.google.com/file/d/15kMv9-dVafyeSacB4qJ7fSd2EiHoJvE8/view?usp=drive_link'
    },
    {
        title: 'Job search engine',
        description: 'Job search engine with recommendation system of required certificates and roadmaps.',
        technologies: ['fastAPI'],
        image: 'images/Job_search_engine.png',
        github: '#',
        live: '#'
    },
    {
        title: 'Space Vape',
        description: 'E-commerce website for vape accessories.',
        technologies: ['Angular'],
        image: 'images/space_vape.png',
        github: '#',
        live: '#'
    },
];

// Populate projects
function populateProjects() {
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
                            <a href="${project.github}" target="_blank" class="btn secondary">
                                <i class="fab fa-github"></i> GitHub
                            </a>
                            <a href="${project.live}" target="_blank" class="btn primary">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
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

if (contactForm) {
    contactForm.appendChild(successMessage);

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            date: new Date().toISOString(),
            time: new Date().toLocaleTimeString()
        };

        console.log('Sending form data:', formData);

        try {
            const response = await fetch('http://localhost:3000/save-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();
            console.log('Server response:', responseData);

            if (response.ok) {
                // Clear form
                contactForm.reset();
                
                // Show success message
                successMessage.style.display = 'block';
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send message. Please try again.');
        }
    });
}

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
