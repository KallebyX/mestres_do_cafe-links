#!/usr/bin/env node

// Script de build para Vercel - Injeta variáveis de ambiente no código
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel build process...');

// Função para substituir variáveis de ambiente no código
function injectEnvironmentVariables() {
    const vercelConfigPath = path.join(__dirname, 'js', 'vercel-config.js');
    
    if (fs.existsSync(vercelConfigPath)) {
        let content = fs.readFileSync(vercelConfigPath, 'utf8');
        
        // Substituir placeholders pelas variáveis de ambiente reais
        content = content.replace(/\$\{ADMIN_EMAIL\}/g, process.env.ADMIN_EMAIL || 'admin@mestres-cafe.com');
        content = content.replace(/\$\{ADMIN_PASSWORD\}/g, process.env.ADMIN_PASSWORD || 'mestres2024');
        content = content.replace(/\$\{JWT_SECRET\}/g, process.env.JWT_SECRET || 'mestres_cafe_jwt_secret_2024');
        content = content.replace(/\$\{SESSION_TIMEOUT\}/g, process.env.SESSION_TIMEOUT || '3600000');
        content = content.replace(/\$\{GA_MEASUREMENT_ID\}/g, process.env.GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID');
        
        // Criar versão com variáveis injetadas
        const buildConfigPath = path.join(__dirname, 'js', 'vercel-config-built.js');
        fs.writeFileSync(buildConfigPath, content);
        
        console.log('✅ Environment variables injected successfully');
    }
}

// Função para atualizar referências nos HTMLs
function updateHTMLReferences() {
    const files = ['admin-analytics.html'];
    
    files.forEach(filename => {
        const filePath = path.join(__dirname, filename);
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Substituir referência para versão com build
            content = content.replace(
                'src="js/vercel-config.js"',
                'src="js/vercel-config-built.js"'
            );
            
            fs.writeFileSync(filePath, content);
            console.log(`✅ Updated ${filename}`);
        }
    });
}

// Executar processo de build
try {
    injectEnvironmentVariables();
    updateHTMLReferences();
    console.log('🎉 Vercel build completed successfully!');
} catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
}

module.exports = { injectEnvironmentVariables, updateHTMLReferences }; 