// ==================== Data ==================== 
const tabData = {
    individual: {
        title: "الفرد أو الكيان الكيميائي",
        content: "كيان كيميائي واحد، ويمكن أن يكون ذرة أو جزيئًا أو أيونًا."
    },
    species: {
        title: "النوع الكيميائي",
        content: "مجموعة من الكيانات الكيميائية المتماثلة."
    },
    mixture: {
        title: "الخليط الكيميائي",
        content: "عينة تحتوي على نوعين كيميائيين أو أكثر."
    },
    comparison: {
        title: "جدول المقارنة",
        content: "مقارنة شاملة بين المفاهيم الثلاثة."
    }
};

// ==================== DOM Elements ==================== 
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const expTabBtns = document.querySelectorAll('.exp-tab-btn');
const expContents = document.querySelectorAll('.exp-content');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const progressBar = document.getElementById('progressBar');

// ==================== Tab Functionality ==================== 
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(tabName + '-tab').classList.add('active');
        
        // Add animation
        document.getElementById(tabName + '-tab').style.animation = 'none';
        setTimeout(() => {
            document.getElementById(tabName + '-tab').style.animation = 'fadeIn 0.5s ease';
        }, 10);
    });
});

// ==================== Experiment Tab Functionality ==================== 
expTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-exp-tab');
        
        // Remove active class
        expTabBtns.forEach(button => button.classList.remove('active'));
        expContents.forEach(content => content.classList.remove('active'));
        
        // Add active class
        btn.classList.add('active');
        document.getElementById(tabName + '-exp').classList.add('active');
    });
});

// ==================== Progress Bar ==================== 
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
    
    // Show/Hide Scroll Top Button
    if (winScroll > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Scroll Top Button
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== Smooth Scrolling ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Add Pop-up Animations ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card, .section, .result-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== Add Stagger Animation to Results ==================== 
const resultItems = document.querySelectorAll('.result-item');
resultItems.forEach((item, index) => {
    item.style.animationDelay = (index * 0.1) + 's';
    item.style.opacity = '0';
});

// ==================== Highlight Text Animation ==================== 
const highlightElements = document.querySelectorAll('.highlight-text, .formula');
highlightElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.2s ease';
    });
    el.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ==================== Add Ripple Effect to Buttons ==================== 
function addRippleEffect(button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

document.querySelectorAll('.tab-button, .exp-tab-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        addRippleEffect(this);
    });
});

// ==================== Add CSS for Ripple Effect ==================== 
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== Search Functionality (Optional) ==================== 
function createSearch() {
    const searchBox = document.createElement('input');
    searchBox.type = 'text';
    searchBox.placeholder = 'ابحث في المحتوى...';
    searchBox.className = 'search-box';
    
    // Add search functionality
    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                section.style.display = 'block';
                section.style.animation = 'slideInUp 0.6s ease';
            } else if (searchTerm.length > 0) {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });
    });
}

// ==================== Load Event ==================== 
window.addEventListener('load', () => {
    console.log('✓ الموقع تم تحميله بنجاح');
    console.log('✓ جميع الرسوميات والانيميشنات نشطة');
    
    // Add fade-in animation to page
    document.body.style.animation = 'fadeIn 0.5s ease';
});

// ==================== Console Greeting ==================== 
console.log('%c🔬 مرحبًا بك في موقع الفيزياء والكيمياء', 'color: #1e3c72; font-size: 18px; font-weight: bold;');
console.log('%cالفرد الكيميائي والنوع الكيميائي والخليط الكيميائي', 'color: #ff6b6b; font-size: 14px;');
