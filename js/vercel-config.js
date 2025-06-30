// ===== VERCEL CONFIGURATION MANAGER =====
// Este arquivo carrega variáveis de ambiente específicas do Vercel

(function() {
    // Função para carregar configurações do Vercel
    function loadVercelConfig() {
        // Vercel injeta as variáveis no build time
        // Criamos um objeto global com as configurações
        if (typeof window !== 'undefined') {
            // Configurações padrão para fallback
            const defaultConfig = {
                adminEmail: 'admin@mestres-cafe.com',
                adminPassword: 'MestresCAFE2024@Seguro',
                sessionTimeout: 3600000,
                jwtSecret: 'mestres_cafe_jwt_secret_2024',
                gaId: 'GA_MEASUREMENT_ID'
            };

            // Tentativa de carregar do processo (se disponível)
            const config = {
                adminEmail: '${ADMIN_EMAIL}' !== '${ADMIN_EMAIL}' ? '${ADMIN_EMAIL}' : defaultConfig.adminEmail,
                adminPassword: '${ADMIN_PASSWORD}' !== '${ADMIN_PASSWORD}' ? '${ADMIN_PASSWORD}' : defaultConfig.adminPassword,
                sessionTimeout: '${SESSION_TIMEOUT}' !== '${SESSION_TIMEOUT}' ? parseInt('${SESSION_TIMEOUT}') : defaultConfig.sessionTimeout,
                jwtSecret: '${JWT_SECRET}' !== '${JWT_SECRET}' ? '${JWT_SECRET}' : defaultConfig.jwtSecret,
                gaId: '${GA_MEASUREMENT_ID}' !== '${GA_MEASUREMENT_ID}' ? '${GA_MEASUREMENT_ID}' : defaultConfig.gaId
            };

            // Disponibilizar globalmente para o ConfigManager
            window.VERCEL_CONFIG = config;
            
            console.log('Vercel configuration loaded successfully');
        }
    }

    // Carregar configuração imediatamente
    loadVercelConfig();
})(); 