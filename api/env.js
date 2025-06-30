// Vercel Serverless Function para injetar variáveis de ambiente
export default function handler(req, res) {
    // Configurar CORS e headers de segurança
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Retornar configurações (sem expor valores sensíveis diretamente)
    const config = {
        adminEmail: process.env.ADMIN_EMAIL || 'admin@mestres-cafe.com',
        // Por segurança, não retornamos a senha real
        hasPassword: !!(process.env.ADMIN_PASSWORD),
        sessionTimeout: process.env.SESSION_TIMEOUT || '3600000',
        hasJwtSecret: !!(process.env.JWT_SECRET),
        gaId: process.env.GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID'
    };
    
    res.status(200).json(config);
} 