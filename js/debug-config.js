// ===== DEBUG CONFIGURATION =====
// Script para debugar problemas de login

(function() {
    console.log('🔍 DEBUG CONFIG - Iniciando verificação...');
    
    // Verificar se ConfigManager existe
    if (typeof window.ConfigManager === 'undefined') {
        console.error('❌ ConfigManager não encontrado!');
        return;
    }
    
    // Verificar configurações carregadas
    const config = window.ConfigManager.config;
    console.log('📋 Configurações carregadas:');
    console.log('- adminEmail:', config.adminEmail || 'NÃO DEFINIDO');
    console.log('- adminPassword:', config.adminPassword ? '***DEFINIDO***' : 'NÃO DEFINIDO');
    console.log('- jwtSecret:', config.jwtSecret ? '***DEFINIDO***' : 'NÃO DEFINIDO');
    console.log('- sessionTimeout:', config.sessionTimeout || 'NÃO DEFINIDO');
    
    // Verificar VERCEL_CONFIG
    if (typeof window.VERCEL_CONFIG !== 'undefined') {
        console.log('✅ VERCEL_CONFIG encontrado');
        console.log('- adminEmail:', window.VERCEL_CONFIG.adminEmail || 'NÃO DEFINIDO');
        console.log('- adminPassword:', window.VERCEL_CONFIG.adminPassword ? '***EXISTE***' : 'NÃO DEFINIDO');
    } else {
        console.log('⚠️ VERCEL_CONFIG não encontrado');
    }
    
    // Verificar process.env
    if (typeof process !== 'undefined' && process.env) {
        console.log('✅ process.env encontrado');
        console.log('- ADMIN_EMAIL:', process.env.ADMIN_EMAIL || 'NÃO DEFINIDO');
        console.log('- ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD ? '***EXISTE***' : 'NÃO DEFINIDO');
    } else {
        console.log('⚠️ process.env não encontrado');
    }
    
    // Testar credenciais padrão
    console.log('🧪 Testando credenciais padrão...');
    const testEmail = 'admin@mestres-cafe.com';
    const testPassword = 'MestresCAFE2024@Seguro';
    
    try {
        const isValid = window.ConfigManager.validateCredentials(testEmail, testPassword);
        console.log('✅ Teste de credenciais:', isValid ? 'VÁLIDO' : 'INVÁLIDO');
        
        if (!isValid) {
            console.log('🔍 Comparação detalhada:');
            console.log('- Email esperado:', window.ConfigManager.get('adminEmail'));
            console.log('- Email testado:', testEmail);
            console.log('- Senha esperada:', window.ConfigManager.get('adminPassword'));
            console.log('- Senha testada:', testPassword);
            console.log('- Match email:', window.ConfigManager.get('adminEmail') === testEmail);
            console.log('- Match senha:', window.ConfigManager.get('adminPassword') === testPassword);
        }
    } catch (error) {
        console.error('❌ Erro ao testar credenciais:', error);
    }
    
    console.log('🔍 DEBUG CONFIG - Verificação completa');
})(); 