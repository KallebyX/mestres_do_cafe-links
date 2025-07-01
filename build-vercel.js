#!/usr/bin/env node

// Script de build para Vercel - Injeta variáveis de ambiente no código
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build para Vercel...');

// Função para copiar arquivo com log
function copyFileWithLog(src, dest) {
    try {
        const content = fs.readFileSync(src, 'utf8');
        fs.writeFileSync(dest, content);
        const stats = fs.statSync(dest);
        console.log(`✅ Copiado: ${src} -> ${dest} (${stats.size} bytes)`);
        return true;
    } catch (error) {
        console.error(`❌ Erro ao copiar ${src}:`, error.message);
        return false;
    }
}

// Lista de arquivos para garantir que existam
const filesToCheck = [
    'index.html',
    'links.html',
    'admin-analytics.html'
];

console.log('📋 Verificando arquivos necessários...');

filesToCheck.forEach(file => {
    if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        const content = fs.readFileSync(file, 'utf8');
        
        // Verificação especial para links.html
        if (file === 'links.html') {
            const hasInstagram = content.includes('instagram');
            const hasLinkedIn = content.includes('linkedin');
            const hasCache = content.includes('Cache bust');
            
            console.log(`📱 ${file}: ${stats.size} bytes`);
            console.log(`   - Instagram: ${hasInstagram ? '✅' : '❌'}`);
            console.log(`   - LinkedIn: ${hasLinkedIn ? '✅' : '❌'}`);
            console.log(`   - Cache bust: ${hasCache ? '✅' : '❌'}`);
            
            if (!hasInstagram || !hasLinkedIn) {
                console.error('❌ ERRO: links.html não contém Instagram ou LinkedIn!');
                process.exit(1);
            }
        } else {
            console.log(`✅ ${file}: ${stats.size} bytes`);
        }
    } else {
        console.error(`❌ Arquivo não encontrado: ${file}`);
        process.exit(1);
    }
});

// Verificar diretórios necessários
const dirsToCheck = ['css', 'js', 'assets'];
dirsToCheck.forEach(dir => {
    if (fs.existsSync(dir)) {
        console.log(`✅ Diretório: ${dir}/`);
    } else {
        console.error(`❌ Diretório não encontrado: ${dir}/`);
    }
});

// Adicionar timestamp no links.html para forçar cache invalidation
const linksPath = 'links.html';
if (fs.existsSync(linksPath)) {
    let content = fs.readFileSync(linksPath, 'utf8');
    const timestamp = new Date().toISOString();
    
    // Atualizar o comentário de cache bust
    content = content.replace(
        /<!-- Cache bust: .* -->/,
        `<!-- Cache bust: ${timestamp} - Instagram/LinkedIn badges -->`
    );
    
    fs.writeFileSync(linksPath, content);
    console.log(`🔄 Cache bust atualizado: ${timestamp}`);
}

console.log('✅ Build concluído com sucesso!');
console.log('📊 Resumo do build:');
console.log(`   - Arquivos HTML: ${filesToCheck.length}`);
console.log(`   - Diretórios: ${dirsToCheck.length}`);
console.log(`   - Status: Pronto para deploy`);

module.exports = { copyFileWithLog }; 