// ===== ENVIRONMENT LOADER =====
// Este arquivo carrega variáveis de ambiente para desenvolvimento local

(function() {
    // Só executa se não estivermos em produção
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        return;
    }

    // Função para carregar .env
    async function loadEnvironment() {
        try {
            const response = await fetch('/.env');
            if (!response.ok) {
                console.log('Arquivo .env não encontrado, usando configurações padrão');
                return;
            }
            
            const envText = await response.text();
            const envVars = {};
            
            envText.split('\n').forEach(line => {
                line = line.trim();
                if (line && !line.startsWith('#')) {
                    const [key, ...valueParts] = line.split('=');
                    if (key && valueParts.length > 0) {
                        envVars[key.trim()] = valueParts.join('=').trim();
                    }
                }
            });
            
            // Disponibilizar as variáveis globalmente
            window.ENV = envVars;
            console.log('Variáveis de ambiente carregadas:', Object.keys(envVars));
            
        } catch (error) {
            console.log('Não foi possível carregar .env, usando configurações padrão');
        }
    }

    // Carregar no início
    loadEnvironment();
})();
