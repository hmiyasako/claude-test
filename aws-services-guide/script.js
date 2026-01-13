// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const serviceCards = document.querySelectorAll('.service-card');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animation with stagger effect
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });

    // Setup filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            filterServices(category);
            updateActiveButton(button);
        });
    });

    // Add click effect to cards
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 100);
        });
    });

    // Display service count
    updateServiceCount('all');
});

// Filter services based on category
function filterServices(category) {
    let visibleCount = 0;

    serviceCards.forEach((card, index) => {
        const cardCategory = card.dataset.category;

        if (category === 'all' || cardCategory === category) {
            // Show card with animation
            setTimeout(() => {
                card.classList.remove('hidden');
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = `fadeIn 0.5s ease ${index * 0.03}s forwards`;
                }, 10);
            }, index * 30);
            visibleCount++;
        } else {
            // Hide card
            card.classList.add('hidden');
        }
    });

    updateServiceCount(category);
}

// Update active button style
function updateActiveButton(activeButton) {
    filterButtons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// Update service count display
function updateServiceCount(category) {
    const count = category === 'all'
        ? serviceCards.length
        : document.querySelectorAll(`.service-card[data-category="${category}"]`).length;

    console.log(`表示中のサービス数: ${count}`);
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '8') {
        const index = parseInt(e.key) - 1;
        if (filterButtons[index]) {
            filterButtons[index].click();
        }
    }
});

// Add smooth scroll behavior
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

// Add parallax effect on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('header');

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.style.transform = 'translateY(-5px)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// Add search functionality
function createSearchBar() {
    const nav = document.querySelector('.filter-nav .container');
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = 'width: 100%; margin-top: 15px;';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'サービスを検索...';
    searchInput.style.cssText = `
        width: 100%;
        padding: 12px 20px;
        border: 2px solid #e0e0e0;
        border-radius: 25px;
        font-size: 1rem;
        outline: none;
        transition: all 0.3s ease;
    `;

    searchInput.addEventListener('focus', () => {
        searchInput.style.borderColor = '#FF9900';
        searchInput.style.boxShadow = '0 0 0 3px rgba(255, 153, 0, 0.1)';
    });

    searchInput.addEventListener('blur', () => {
        searchInput.style.borderColor = '#e0e0e0';
        searchInput.style.boxShadow = 'none';
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        searchServices(searchTerm);
    });

    searchContainer.appendChild(searchInput);
    nav.appendChild(searchContainer);
}

// Search services by name or description
function searchServices(searchTerm) {
    serviceCards.forEach((card) => {
        const serviceName = card.querySelector('h3').textContent.toLowerCase();
        const serviceDesc = card.querySelector('h4').textContent.toLowerCase();
        const serviceText = card.querySelector('.card-body p').textContent.toLowerCase();

        const matches = serviceName.includes(searchTerm) ||
                       serviceDesc.includes(searchTerm) ||
                       serviceText.includes(searchTerm);

        if (matches || searchTerm === '') {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Initialize search bar
createSearchBar();

// Add category statistics
function showCategoryStats() {
    const categories = {};

    serviceCards.forEach(card => {
        const category = card.dataset.category;
        categories[category] = (categories[category] || 0) + 1;
    });

    console.log('カテゴリー別サービス数:', categories);
    return categories;
}

// Display stats on load
showCategoryStats();

// Add export functionality (for learning purposes)
function exportServicesList() {
    const services = [];

    serviceCards.forEach(card => {
        const service = {
            name: card.querySelector('h3').textContent,
            fullName: card.querySelector('h4').textContent,
            description: card.querySelector('.card-body p').textContent,
            category: card.dataset.category,
            tags: Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent)
        };
        services.push(service);
    });

    return services;
}

// Make export function available globally
window.exportServicesList = exportServicesList;

// Add dynamic theme support
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

// Add performance optimization: Intersection Observer for lazy animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards for better performance
serviceCards.forEach(card => {
    cardObserver.observe(card);
});

console.log('🚀 AWS Services Visual Guide が読み込まれました！');
console.log('📊 合計サービス数:', serviceCards.length);
console.log('⌨️ キーボードショートカット: 1-8でカテゴリーを切り替え');
console.log('💾 exportServicesList() を実行してサービス一覧をエクスポート可能');
