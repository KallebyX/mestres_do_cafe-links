// ===== ANALYTICS DASHBOARD JAVASCRIPT =====

// Configuration
const CONFIG = {
    sessionKey: 'mestres_analytics_session',
    tokenKey: 'mestres_analytics_token',
    refreshInterval: 30000, // 30 seconds
};

// Global variables
let charts = {};
let refreshTimer;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    initializeEventListeners();
});

// ===== AUTHENTICATION =====
function checkAuthentication() {
    const token = sessionStorage.getItem(CONFIG.tokenKey);
    
    if (token && window.ConfigManager && window.ConfigManager.validateToken(token)) {
        showDashboard();
    } else {
        // Limpar token inválido
        sessionStorage.removeItem(CONFIG.tokenKey);
        sessionStorage.removeItem(CONFIG.sessionKey);
        showLoginModal();
    }
}

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('passwordInput').focus();
}

function showDashboard() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    initializeDashboard();
}

function login(email, password) {
    if (!window.ConfigManager) {
        showError('Sistema de configuração não carregado. Recarregue a página.');
        return false;
    }
    
    if (window.ConfigManager.validateCredentials(email, password)) {
        const token = window.ConfigManager.generateToken(email);
        sessionStorage.setItem(CONFIG.tokenKey, token);
        sessionStorage.setItem(CONFIG.sessionKey, 'true');
        showDashboard();
        return true;
    } else {
        showError('Email ou senha incorretos. Tente novamente.');
        return false;
    }
}

function logout() {
    sessionStorage.removeItem(CONFIG.sessionKey);
    sessionStorage.removeItem(CONFIG.tokenKey);
    clearInterval(refreshTimer);
    showLoginModal();
}

function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    setTimeout(() => {
        errorElement.classList.remove('show');
    }, 3000);
}

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('emailInput').value;
            const password = document.getElementById('passwordInput').value;
            login(email, password);
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Refresh button
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            refreshData();
            
            // Add loading animation
            const icon = this.querySelector('i');
            icon.classList.add('fa-spin');
            setTimeout(() => {
                icon.classList.remove('fa-spin');
            }, 1000);
        });
    }

    // Chart period buttons
    const chartBtns = document.querySelectorAll('.chart-btn');
    chartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            chartBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const period = this.dataset.period;
            updateTrafficChart(period);
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('loginModal').style.display === 'flex') {
            document.getElementById('passwordInput').focus();
        }
        
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            refreshData();
        }
    });
}

// ===== DASHBOARD INITIALIZATION =====
function initializeDashboard() {
    loadStatistics();
    initializeCharts();
    loadRecentActivity();
    startAutoRefresh();
    
    // Track dashboard access
    if (typeof gtag !== 'undefined') {
        gtag('event', 'dashboard_access', {
            'event_category': 'Analytics',
            'event_label': 'Dashboard Access'
        });
    }
}

// ===== STATISTICS =====
function loadStatistics() {
    // Simulate loading with realistic data
    const stats = generateMockStats();
    
    updateStatCard('whatsappClicks', stats.whatsappClicks);
    updateStatCard('googleClicks', stats.googleClicks);
    updateStatCard('uniqueVisitors', stats.uniqueVisitors);
    updateStatCard('avgTime', stats.avgTime);
}

function updateStatCard(id, value) {
    const element = document.getElementById(id);
    if (element) {
        // Animate number counting
        animateNumber(element, parseInt(element.textContent) || 0, value);
    }
}

function animateNumber(element, start, end) {
    const duration = 1000;
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        
        if (element.id === 'avgTime') {
            element.textContent = formatTime(current);
        } else {
            element.textContent = current.toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function generateMockStats() {
    const baseDate = new Date();
    const dayOfWeek = baseDate.getDay();
    const hour = baseDate.getHours();
    
    // Simulate realistic patterns
    const weekdayMultiplier = dayOfWeek >= 1 && dayOfWeek <= 5 ? 1.2 : 0.8;
    const hourMultiplier = hour >= 9 && hour <= 18 ? 1.3 : 0.7;
    
    return {
        whatsappClicks: Math.floor((45 + Math.random() * 20) * weekdayMultiplier * hourMultiplier),
        googleClicks: Math.floor((23 + Math.random() * 15) * weekdayMultiplier * hourMultiplier),
        uniqueVisitors: Math.floor((156 + Math.random() * 50) * weekdayMultiplier * hourMultiplier),
        avgTime: Math.floor(125 + Math.random() * 60) // seconds
    };
}

// ===== CHARTS =====
function initializeCharts() {
    initializeTrafficChart();
    initializeDeviceChart();
}

function initializeTrafficChart() {
    const ctx = document.getElementById('trafficChart');
    if (!ctx) return;
    
    const data = generateTrafficData('7d');
    
    charts.traffic = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Visitantes',
                data: data.visitors,
                borderColor: '#b58150',
                backgroundColor: 'rgba(181, 129, 80, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#b58150',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        color: '#6c757d'
                    }
                }
            },
            elements: {
                point: {
                    hoverBackgroundColor: '#b58150'
                }
            }
        }
    });
}

function initializeDeviceChart() {
    const ctx = document.getElementById('deviceChart');
    if (!ctx) return;
    
    charts.device = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Mobile', 'Desktop', 'Tablet'],
            datasets: [{
                data: [65, 28, 7],
                backgroundColor: [
                    '#b58150',
                    '#101820',
                    '#6c757d'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        color: '#6c757d'
                    }
                }
            }
        }
    });
}

function updateTrafficChart(period) {
    if (!charts.traffic) return;
    
    const data = generateTrafficData(period);
    charts.traffic.data.labels = data.labels;
    charts.traffic.data.datasets[0].data = data.visitors;
    charts.traffic.update('active');
}

function generateTrafficData(period) {
    const days = period === '7d' ? 7 : 30;
    const labels = [];
    const visitors = [];
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        if (period === '7d') {
            labels.push(date.toLocaleDateString('pt-BR', { weekday: 'short' }));
        } else {
            labels.push(date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
        }
        
        // Generate realistic traffic patterns
        const baseTraffic = 20 + Math.random() * 40;
        const weekdayBoost = date.getDay() >= 1 && date.getDay() <= 5 ? 1.3 : 0.8;
        visitors.push(Math.floor(baseTraffic * weekdayBoost));
    }
    
    return { labels, visitors };
}

// ===== RECENT ACTIVITY =====
function loadRecentActivity() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    const activities = generateMockActivity();
    
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon" style="background: ${activity.color}">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
            </div>
            <div class="activity-time-stamp">${activity.time}</div>
        </div>
    `).join('');
}

function generateMockActivity() {
    const activities = [
        {
            icon: 'fab fa-whatsapp',
            color: '#25D366',
            title: 'Novo clique no WhatsApp',
            description: 'Usuário clicou no botão do Fabricio',
            time: '2 min atrás'
        },
        {
            icon: 'fas fa-users',
            color: '#b58150',
            title: 'Novo visitante',
            description: 'Acesso via página principal',
            time: '5 min atrás'
        },
        {
            icon: 'fab fa-google',
            color: '#4285F4',
            title: 'Avaliação visualizada',
            description: 'Clique nas avaliações do Google',
            time: '12 min atrás'
        },
        {
            icon: 'fas fa-link',
            color: '#6c5ce7',
            title: 'Página Links acessada',
            description: 'Usuário visitou a página Linktree',
            time: '18 min atrás'
        },
        {
            icon: 'fas fa-mobile-alt',
            color: '#fd79a8',
            title: 'Acesso mobile',
            description: 'Novo visitante via dispositivo móvel',
            time: '25 min atrás'
        }
    ];
    
    return activities;
}

// ===== DATA REFRESH =====
function refreshData() {
    loadStatistics();
    loadRecentActivity();
    
    // Update charts with new data
    if (charts.traffic) {
        const activePeriod = document.querySelector('.chart-btn.active')?.dataset.period || '7d';
        updateTrafficChart(activePeriod);
    }
    
    if (charts.device) {
        // Simulate slight changes in device distribution
        const newData = [
            65 + Math.floor(Math.random() * 10 - 5),
            28 + Math.floor(Math.random() * 8 - 4),
            7 + Math.floor(Math.random() * 4 - 2)
        ];
        charts.device.data.datasets[0].data = newData;
        charts.device.update('active');
    }
}

function startAutoRefresh() {
    refreshTimer = setInterval(refreshData, CONFIG.refreshInterval);
}

// ===== UTILITY FUNCTIONS =====
function exportData() {
    const data = {
        timestamp: new Date().toISOString(),
        stats: {
            whatsappClicks: document.getElementById('whatsappClicks').textContent,
            googleClicks: document.getElementById('googleClicks').textContent,
            uniqueVisitors: document.getElementById('uniqueVisitors').textContent,
            avgTime: document.getElementById('avgTime').textContent
        },
        exportedBy: 'Mestres do Café Analytics Dashboard'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mestres-cafe-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Track export event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'data_export', {
            'event_category': 'Analytics',
            'event_label': 'Data Export'
        });
    }
}

function clearCache() {
    if (confirm('Tem certeza que deseja limpar o cache? Isso pode afetar o carregamento das páginas.')) {
        // Clear various caches
        if ('caches' in window) {
            caches.keys().then(names => {
                names.forEach(name => {
                    caches.delete(name);
                });
            });
        }
        
        // Clear local storage (except session)
        const session = sessionStorage.getItem(CONFIG.sessionKey);
        localStorage.clear();
        if (session) {
            sessionStorage.setItem(CONFIG.sessionKey, session);
        }
        
        alert('Cache limpo com sucesso!');
        
        // Track cache clear event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cache_clear', {
                'event_category': 'Analytics',
                'event_label': 'Cache Clear'
            });
        }
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Analytics Dashboard Error:', e.error);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        z-index: 10000;
        max-width: 300px;
    `;
    errorDiv.textContent = 'Ocorreu um erro no dashboard. Recarregue a página se o problema persistir.';
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
});

// ===== CONSOLE BRANDING =====
console.log('%c📊 Analytics Dashboard', 'color: #b58150; font-size: 16px; font-weight: bold;');
console.log('%cMestres do Café - Dashboard de Analytics', 'color: #101820; font-size: 12px;');
console.log('%cPara suporte técnico, entre em contato via WhatsApp.', 'color: #6c757d; font-size: 10px;');

