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
    
    // Record that admin panel was accessed
    recordActivity(
        'Acesso ao painel admin',
        'Administrador fez login no sistema',
        'fas fa-user-shield',
        '#28a745'
    );
    
    // Record daily visit for traffic stats
    recordDailyVisit();
    
    // Record device visit
    recordDeviceVisit();
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
    // Load real data from localStorage or Google Analytics
    const realStats = getRealStatistics();
    
    updateStatCard('whatsappClicks', realStats.whatsappClicks);
    updateStatCard('googleClicks', realStats.googleClicks);
    updateStatCard('uniqueVisitors', realStats.uniqueVisitors);
    updateStatCard('avgTime', realStats.avgTime);
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

// ===== REAL STATISTICS =====
function getRealStatistics() {
    // Get real data from localStorage
    const realData = {
        whatsappClicks: getStoredData('whatsapp_clicks', 0),
        googleClicks: getStoredData('google_clicks', 0),
        uniqueVisitors: getStoredData('unique_visitors', 0),
        avgTime: getStoredData('average_time', 0)
    };
    
    // Also try to get from Google Analytics if available
    if (typeof gtag !== 'undefined' && window.gtag) {
        getGoogleAnalyticsData(realData);
    }
    
    return realData;
}

function getStoredData(key, defaultValue) {
    try {
        const stored = localStorage.getItem(`mestres_analytics_${key}`);
        return stored ? parseInt(stored) : defaultValue;
    } catch (error) {
        console.warn(`Could not retrieve ${key}:`, error);
        return defaultValue;
    }
}

function setStoredData(key, value) {
    try {
        localStorage.setItem(`mestres_analytics_${key}`, value.toString());
    } catch (error) {
        console.warn(`Could not store ${key}:`, error);
    }
}

function incrementCounter(type) {
    const currentValue = getStoredData(type, 0);
    const newValue = currentValue + 1;
    setStoredData(type, newValue);
    return newValue;
}

function getGoogleAnalyticsData(realData) {
    // Try to get real data from Google Analytics
    // This would require Google Analytics Reporting API
    // For now, we'll use localStorage data as primary source
    
    if (window.gtag && typeof window.gtag === 'function') {
        // Track current session
        const sessionStart = sessionStorage.getItem('session_start') || Date.now();
        const currentTime = Date.now();
        const sessionTime = Math.floor((currentTime - sessionStart) / 1000);
        
        // Update average time if this session is longer
        if (sessionTime > realData.avgTime) {
            realData.avgTime = sessionTime;
            setStoredData('average_time', sessionTime);
        }
        
        // Increment unique visitors (once per session)
        if (!sessionStorage.getItem('counted_visitor')) {
            realData.uniqueVisitors = incrementCounter('unique_visitors');
            sessionStorage.setItem('counted_visitor', 'true');
            sessionStorage.setItem('session_start', sessionStart);
        }
    }
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
    
    const deviceData = getRealDeviceData();
    
    charts.device = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Mobile', 'Desktop', 'Tablet'],
            datasets: [{
                data: [deviceData.mobile, deviceData.desktop, deviceData.tablet],
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

function getRealDeviceData() {
    try {
        const stored = localStorage.getItem('mestres_device_stats');
        const deviceStats = stored ? JSON.parse(stored) : { mobile: 0, desktop: 0, tablet: 0 };
        
        // If no data yet, record current device
        if (deviceStats.mobile === 0 && deviceStats.desktop === 0 && deviceStats.tablet === 0) {
            const currentDevice = detectDevice();
            deviceStats[currentDevice] = 1;
            localStorage.setItem('mestres_device_stats', JSON.stringify(deviceStats));
        }
        
        return deviceStats;
    } catch (error) {
        console.warn('Could not retrieve device data:', error);
        return { mobile: 1, desktop: 0, tablet: 0 };
    }
}

function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
    
    if (isTablet) return 'tablet';
    if (isMobile) return 'mobile';
    return 'desktop';
}

function recordDeviceVisit() {
    try {
        const device = detectDevice();
        const deviceStats = getRealDeviceData();
        
        // Increment current device
        deviceStats[device] = (deviceStats[device] || 0) + 1;
        
        localStorage.setItem('mestres_device_stats', JSON.stringify(deviceStats));
        
        // Record activity
        recordActivity(
            `Acesso via ${device}`,
            `Usuário acessou o site usando dispositivo ${device}`,
            device === 'mobile' ? 'fas fa-mobile-alt' : device === 'tablet' ? 'fas fa-tablet-alt' : 'fas fa-desktop',
            device === 'mobile' ? '#fd79a8' : device === 'tablet' ? '#74b9ff' : '#636e72'
        );
    } catch (error) {
        console.warn('Could not record device visit:', error);
    }
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
    
    // Get real traffic data from localStorage
    const trafficHistory = getTrafficHistory(days);
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split('T')[0];
        
        if (period === '7d') {
            labels.push(date.toLocaleDateString('pt-BR', { weekday: 'short' }));
        } else {
            labels.push(date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
        }
        
        // Use real data if available, otherwise 0
        const dayVisitors = trafficHistory[dateKey] || 0;
        visitors.push(dayVisitors);
    }
    
    return { labels, visitors };
}

function getTrafficHistory(days) {
    try {
        const stored = localStorage.getItem('mestres_traffic_history');
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.warn('Could not retrieve traffic history:', error);
        return {};
    }
}

function recordDailyVisit() {
    try {
        const today = new Date().toISOString().split('T')[0];
        const trafficHistory = getTrafficHistory();
        
        // Increment today's count
        trafficHistory[today] = (trafficHistory[today] || 0) + 1;
        
        // Keep only last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        Object.keys(trafficHistory).forEach(date => {
            if (new Date(date) < thirtyDaysAgo) {
                delete trafficHistory[date];
            }
        });
        
        localStorage.setItem('mestres_traffic_history', JSON.stringify(trafficHistory));
    } catch (error) {
        console.warn('Could not record daily visit:', error);
    }
}

// ===== RECENT ACTIVITY =====
function loadRecentActivity() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    const activities = generateRealActivity();
    
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

function generateRealActivity() {
    // Get real activity from localStorage
    const activities = getRealActivityHistory();
    
    // If no real activity, return empty array or recent actions
    if (activities.length === 0) {
        return [{
            icon: 'fas fa-info-circle',
            color: '#6c757d',
            title: 'Sistema iniciado',
            description: 'Analytics carregado com sucesso',
            time: 'Agora'
        }];
    }
    
    return activities.slice(0, 10); // Show last 10 activities
}

function getRealActivityHistory() {
    try {
        const stored = localStorage.getItem('mestres_activity_history');
        const activities = stored ? JSON.parse(stored) : [];
        
        // Sort by timestamp (newest first)
        return activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
        console.warn('Could not retrieve activity history:', error);
        return [];
    }
}

function recordActivity(type, description, icon = 'fas fa-circle', color = '#b58150') {
    try {
        const activities = getRealActivityHistory();
        const now = new Date();
        
        const newActivity = {
            icon: icon,
            color: color,
            title: type,
            description: description,
            time: getTimeAgo(now),
            timestamp: now.toISOString()
        };
        
        activities.unshift(newActivity);
        
        // Keep only last 50 activities
        if (activities.length > 50) {
            activities.splice(50);
        }
        
        localStorage.setItem('mestres_activity_history', JSON.stringify(activities));
    } catch (error) {
        console.warn('Could not record activity:', error);
    }
}

function getTimeAgo(date) {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `${diffMins} min atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    return `${diffDays}d atrás`;
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
        // Update with real device data
        const deviceData = getRealDeviceData();
        const newData = [deviceData.mobile, deviceData.desktop, deviceData.tablet];
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

