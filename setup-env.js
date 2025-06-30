#!/usr/bin/env node

// Script para configurar variáveis de ambiente localmente
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function setupEnvironment() {
    console.log('🔐 Configuração de Ambiente - Mestres do Café\n');
    
    const email = await askQuestion('Email do administrador: ');
    const password = await askQuestion('Senha do administrador: ');
    const jwtSecret = await askQuestion('JWT Secret (deixe vazio para gerar): ') || 
                     `mestres_cafe_jwt_${Date.now()}_${Math.random().toString(36)}`;
    const gaId = await askQuestion('Google Analytics ID (opcional): ') || 'GA_MEASUREMENT_ID';
    
    const envContent = `# Configurações de Autenticação
ADMIN_EMAIL=${email}
ADMIN_PASSWORD=${password}

# Configurações do Site
GA_MEASUREMENT_ID=${gaId}

# Configurações de Segurança
JWT_SECRET=${jwtSecret}
SESSION_TIMEOUT=3600000`;

    fs.writeFileSync('.env', envContent);
    console.log('\n✅ Arquivo .env criado com sucesso!');
    console.log('\n🚨 IMPORTANTE: Não commit este arquivo no Git!');
    console.log('📝 Adicione as mesmas variáveis no seu provedor de hospedagem.');
    
    rl.close();
}

if (require.main === module) {
    setupEnvironment().catch(console.error);
}

module.exports = { setupEnvironment }; 