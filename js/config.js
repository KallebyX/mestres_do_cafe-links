// ===== CONFIGURATION MANAGER =====
class ConfigManager {
    constructor() {
        this.config = this.loadConfig();
    }

    loadConfig() {
        // Configurações padrão (fallback)
        const defaultConfig = {
            adminEmail: 'admin@mestres-cafe.com',
            adminPassword: 'mestres2024',
            sessionTimeout: 3600000, // 1 hora
            jwtSecret: 'mestres_cafe_jwt_secret_2024',
            gaId: 'GA_MEASUREMENT_ID'
        };

        // Tenta carregar do ambiente (Render/Vercel/Netlify)
        if (typeof process !== 'undefined' && process.env) {
            return {
                adminEmail: process.env.ADMIN_EMAIL || defaultConfig.adminEmail,
                adminPassword: process.env.ADMIN_PASSWORD || defaultConfig.adminPassword,
                sessionTimeout: parseInt(process.env.SESSION_TIMEOUT) || defaultConfig.sessionTimeout,
                jwtSecret: process.env.JWT_SECRET || defaultConfig.jwtSecret,
                gaId: process.env.GA_MEASUREMENT_ID || defaultConfig.gaId
            };
        }

        // Para desenvolvimento local - carrega do window.ENV se disponível
        if (typeof window !== 'undefined' && window.ENV) {
            return {
                adminEmail: window.ENV.ADMIN_EMAIL || defaultConfig.adminEmail,
                adminPassword: window.ENV.ADMIN_PASSWORD || defaultConfig.adminPassword,
                sessionTimeout: parseInt(window.ENV.SESSION_TIMEOUT) || defaultConfig.sessionTimeout,
                jwtSecret: window.ENV.JWT_SECRET || defaultConfig.jwtSecret,
                gaId: window.ENV.GA_MEASUREMENT_ID || defaultConfig.gaId
            };
        }

        // Fallback para configurações padrão
        return defaultConfig;
    }

    get(key) {
        return this.config[key];
    }

    // Método para validar credenciais
    validateCredentials(email, password) {
        return email === this.get('adminEmail') && password === this.get('adminPassword');
    }

    // Gerar token simples (sem backend)
    generateToken(email) {
        const payload = {
            email,
            timestamp: Date.now(),
            exp: Date.now() + this.get('sessionTimeout')
        };
        
        // Simula JWT sem backend usando base64 + hash simples
        const tokenData = btoa(JSON.stringify(payload));
        const signature = this.simpleHash(tokenData + this.get('jwtSecret'));
        
        return `${tokenData}.${signature}`;
    }

    // Validar token
    validateToken(token) {
        try {
            if (!token) return false;
            
            const [tokenData, signature] = token.split('.');
            if (!tokenData || !signature) return false;
            
            // Verificar assinatura
            const expectedSignature = this.simpleHash(tokenData + this.get('jwtSecret'));
            if (signature !== expectedSignature) return false;
            
            // Verificar expiração
            const payload = JSON.parse(atob(tokenData));
            if (Date.now() > payload.exp) return false;
            
            return payload;
        } catch (error) {
            console.error('Token validation error:', error);
            return false;
        }
    }

    // Hash simples para assinatura
    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(36);
    }
}

// Exportar instância global
window.ConfigManager = new ConfigManager(); 