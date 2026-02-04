// Common script for guide pages
// Requires: topicDetails object to be defined before loading this script

// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const serviceCards = document.querySelectorAll('.service-card');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            filterServices(category);
            updateActiveButton(button);
        });
    });

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 100);
        });
    });

    updateServiceCount('all');
    createSearchBar();
    setupModal();
});

function filterServices(category) {
    serviceCards.forEach((card, index) => {
        const cardCategory = card.dataset.category;
        if (category === 'all' || cardCategory === category) {
            setTimeout(() => {
                card.classList.remove('hidden');
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = `fadeIn 0.5s ease ${index * 0.03}s forwards`;
                }, 10);
            }, index * 30);
        } else {
            card.classList.add('hidden');
        }
    });
    updateServiceCount(category);
}

function updateActiveButton(activeButton) {
    filterButtons.forEach(button => button.classList.remove('active'));
    activeButton.classList.add('active');
}

function updateServiceCount(category) {
    const count = category === 'all'
        ? serviceCards.length
        : document.querySelectorAll(`.service-card[data-category="${category}"]`).length;
    console.log(`表示中のトピック数: ${count}`);
}

function createSearchBar() {
    const nav = document.querySelector('.filter-nav .container');
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = 'width: 100%; margin-top: 15px;';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'トピックを検索...';
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
        searchInput.style.borderColor = '#4A90D9';
        searchInput.style.boxShadow = '0 0 0 3px rgba(74, 144, 217, 0.1)';
    });

    searchInput.addEventListener('blur', () => {
        searchInput.style.borderColor = '#e0e0e0';
        searchInput.style.boxShadow = 'none';
    });

    searchInput.addEventListener('input', (e) => {
        searchServices(e.target.value.toLowerCase());
    });

    searchContainer.appendChild(searchInput);
    nav.appendChild(searchContainer);
}

function searchServices(searchTerm) {
    serviceCards.forEach((card) => {
        const serviceName = card.querySelector('h3').textContent.toLowerCase();
        const serviceDesc = card.querySelector('h4').textContent.toLowerCase();
        const serviceText = card.querySelector('.card-body p').textContent.toLowerCase();

        const matches = serviceName.includes(searchTerm) ||
                       serviceDesc.includes(searchTerm) ||
                       serviceText.includes(searchTerm);

        card.classList.toggle('hidden', !matches && searchTerm !== '');
    });
}

function setupModal() {
    const modal = document.getElementById('serviceModal');
    if (!modal) return;

    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const topicName = card.querySelector('h3').textContent;
            if (typeof topicDetails !== 'undefined' && topicDetails[topicName]) {
                showModal(topicDetails[topicName], topicName);
            }
        });
    });

    function showModal(details, topicName) {
        const modalIcon = modal.querySelector('.modal-icon');
        const modalTitle = modal.querySelector('.modal-title');
        const modalFullName = modal.querySelector('.modal-full-name');
        const modalDescription = modal.querySelector('.modal-description');
        const modalFeatures = modal.querySelector('.modal-features');
        const modalUseCases = modal.querySelector('.modal-use-cases');
        const modalTips = modal.querySelector('.modal-tips');
        const modalRelated = modal.querySelector('.modal-related');
        const modalHeader = modal.querySelector('.modal-header');

        modalIcon.textContent = details.icon;
        modalTitle.textContent = topicName;
        modalFullName.textContent = details.fullName;
        modalDescription.textContent = details.description;

        if (details.category && modalHeader) {
            const categoryColors = {
                'basics': 'linear-gradient(135deg, #4A90D9, #6BA3E0)',
                'protocol': 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
                'addressing': 'linear-gradient(135deg, #9B59B6, #B07CC6)',
                'device': 'linear-gradient(135deg, #2ECC71, #58D68D)',
                'service': 'linear-gradient(135deg, #F39C12, #F5B041)',
                'security': 'linear-gradient(135deg, #E74C3C, #EC7063)',
                'design': 'linear-gradient(135deg, #FF9900, #FFB84D)',
                'organization': 'linear-gradient(135deg, #3B48CC, #5B68DC)',
                'network': 'linear-gradient(135deg, #1E8900, #2FB500)',
                'migration': 'linear-gradient(135deg, #9B59B6, #B07CC6)',
                'cost': 'linear-gradient(135deg, #01A88D, #02C9A9)',
                'resilience': 'linear-gradient(135deg, #5E6EBE, #8090DE)'
            };
            modalHeader.style.background = categoryColors[details.category] || categoryColors['design'];
        }

        modalFeatures.innerHTML = '';
        details.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalFeatures.appendChild(li);
        });

        modalUseCases.innerHTML = '';
        details.useCases.forEach(useCase => {
            const li = document.createElement('li');
            li.textContent = useCase;
            modalUseCases.appendChild(li);
        });

        modalTips.textContent = details.tips;

        modalRelated.innerHTML = '';
        details.related.forEach(relatedTopic => {
            const tag = document.createElement('span');
            tag.className = 'related-tag';
            tag.textContent = relatedTopic;
            tag.addEventListener('click', () => {
                if (topicDetails[relatedTopic]) {
                    showModal(topicDetails[relatedTopic], relatedTopic);
                }
            });
            modalRelated.appendChild(tag);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) modalContent.scrollTop = 0;
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        if (filterButtons[index]) filterButtons[index].click();
    }
});

console.log('📚 ガイドページが読み込まれました');
console.log('📊 合計トピック数:', serviceCards.length);
