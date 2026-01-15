// ===== 資料管理 =====
const planData = [
    {
        id: 'task1',
        title: '專案計劃完成',
        milestones: [
            { id: 'm1-1', text: '原型迭代', checked: false },
            { id: 'm1-2', text: '場域驗證', checked: false },
            { id: 'm1-3', text: '專案階段性簡報', checked: false }
        ]
    },
    {
        id: 'task2',
        title: '論文撰寫',
        milestones: [
            { id: 'm2-1', text: '研討會全文投稿', checked: false },
            { id: 'm2-2', text: '一提', checked: false }
        ]
    }
];

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeroButton();
    initPlanCards();
    loadChecklistState();
    initParallax();
    initScrollAnimations();
    initHeroParallax();
});

// ===== 導覽列功能 =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // 平滑滾動
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // navbar 高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // 關閉 mobile 選單
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // 漢堡選單切換
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // 點擊外部關閉選單
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ===== Hero 按鈕功能 =====
function initHeroButton() {
    const btn0 = document.getElementById('btn0');
    
    if (btn0) {
        btn0.addEventListener('click', () => {
            const planSection = document.querySelector('#plan');
            if (planSection) {
                const offsetTop = planSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ===== 半年規劃卡片功能 =====
function initPlanCards() {
    const planCardsContainer = document.getElementById('planCards');
    
    if (!planCardsContainer) return;

    // 清空容器
    planCardsContainer.innerHTML = '';

    // 從 localStorage 載入狀態
    const savedState = loadChecklistState();

    // 生成卡片
    planData.forEach((task, index) => {
        const card = createPlanCard(task, savedState);
        planCardsContainer.appendChild(card);
    });
}

function createPlanCard(task, savedState) {
    const card = document.createElement('div');
    card.className = 'plan-card';
    card.dataset.taskId = task.id;

    // 檢查是否已展開（從 localStorage 或預設收合）
    const isExpanded = savedState.expandedCards?.includes(task.id) || false;
    if (isExpanded) {
        card.classList.add('active');
    }

    // 卡片標題
    const header = document.createElement('div');
    header.className = 'plan-card-header';
    header.innerHTML = `
        <h3 class="plan-card-title">${task.title}</h3>
        <span class="plan-card-icon">▼</span>
    `;

    // 卡片內容
    const content = document.createElement('div');
    content.className = 'plan-card-content';
    
    const milestoneList = document.createElement('ul');
    milestoneList.className = 'milestone-list';

    task.milestones.forEach(milestone => {
        const milestoneItem = document.createElement('li');
        milestoneItem.className = 'milestone-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'milestone-checkbox';
        checkbox.id = milestone.id;
        checkbox.dataset.taskId = task.id;
        checkbox.dataset.milestoneId = milestone.id;

        // 從 localStorage 載入勾選狀態
        const isChecked = savedState.checkedItems?.includes(milestone.id) || false;
        checkbox.checked = isChecked;

        const label = document.createElement('label');
        label.className = 'milestone-label';
        label.setAttribute('for', milestone.id);
        label.textContent = milestone.text;

        // 勾選事件
        checkbox.addEventListener('change', () => {
            saveChecklistState();
        });

        milestoneItem.appendChild(checkbox);
        milestoneItem.appendChild(label);
        milestoneList.appendChild(milestoneItem);
    });

    content.appendChild(milestoneList);

    // 展開/收合事件
    header.addEventListener('click', () => {
        card.classList.toggle('active');
        saveChecklistState();
    });

    card.appendChild(header);
    card.appendChild(content);

    return card;
}

// ===== localStorage 管理 =====
function saveChecklistState() {
    const state = {
        expandedCards: [],
        checkedItems: []
    };

    // 收集展開的卡片
    document.querySelectorAll('.plan-card.active').forEach(card => {
        state.expandedCards.push(card.dataset.taskId);
    });

    // 收集勾選的項目
    document.querySelectorAll('.milestone-checkbox:checked').forEach(checkbox => {
        state.checkedItems.push(checkbox.id);
    });

    localStorage.setItem('planChecklistState', JSON.stringify(state));
}

function loadChecklistState() {
    try {
        const saved = localStorage.getItem('planChecklistState');
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error('載入狀態失敗:', e);
    }
    return { expandedCards: [], checkedItems: [] };
}

// ===== 滾動時導覽列樣式調整 =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===== 平滑滾動 polyfill（舊瀏覽器支援） =====
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href !== '') {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    };
    smoothScrollPolyfill();
}

// ===== 滾動視差效果 =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== 滾動觸發的淡入動畫 =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 觀察需要動畫的元素
    const animatedElements = document.querySelectorAll(
        '.scroll-fade-in, .project-card, .work-item, .section-title'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== Hero 區塊視差效果 =====
function initHeroParallax() {
    const heroSection = document.querySelector('.block-1');
    const portraitWrapper = document.querySelector('.portrait-wrapper');
    const heroText = document.querySelector('.hero-text');
    
    if (!heroSection) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;
        
        // 只在 Hero 區塊範圍內應用視差
        if (scrolled < heroHeight) {
            const parallaxSpeed = scrolled * 0.3;
            
            if (portraitWrapper) {
                portraitWrapper.style.transform = `translateY(${parallaxSpeed * 0.5}px)`;
            }
            
            if (heroText) {
                heroText.style.transform = `translateY(${parallaxSpeed * 0.3}px)`;
            }
        }
    });
}
