# 🚀 Guia de Deploy - Mestres do Café

## 🔐 Configuração de Segurança

### **Variáveis de Ambiente Necessárias**

Para deploy em produção, configure estas variáveis de ambiente:

```env
ADMIN_EMAIL=seu_email@exemplo.com
ADMIN_PASSWORD=sua_senha_super_segura
JWT_SECRET=sua_chave_jwt_muito_segura_aqui_2024
SESSION_TIMEOUT=3600000
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 🌐 Deploy no Render

### **1. Preparação**

1. Clone o repositório
2. Certifique-se que o `.env` está no `.gitignore`
3. Tenha as credenciais em mãos

### **2. Configuração no Render**

1. Conecte seu repositório GitHub
2. Configure como **Static Site**
3. Adicione as variáveis de ambiente:

```
ADMIN_EMAIL = admin@mestres-cafe.com
ADMIN_PASSWORD = MestresCAFE2024@Seguro
JWT_SECRET = mestres_cafe_jwt_super_secret_key_2024_render
SESSION_TIMEOUT = 3600000
GA_MEASUREMENT_ID = G-XXXXXXXXXX
```

### **3. Deploy**

```bash
# O Render detectará automaticamente e fará o deploy
# Configuração está no render.yaml
```

## 🔧 Deploy em Outras Plataformas

### **Netlify**
```bash
# Adicione as variáveis no painel do Netlify
# Site Settings > Environment Variables
```

### **Vercel**
```bash
# Configure no vercel.json ou painel web
vercel env add ADMIN_EMAIL
vercel env add ADMIN_PASSWORD
vercel env add JWT_SECRET
```

### **GitHub Pages + Actions**
```yaml
# .github/workflows/deploy.yml
env:
  ADMIN_EMAIL: ${{ secrets.ADMIN_EMAIL }}
  ADMIN_PASSWORD: ${{ secrets.ADMIN_PASSWORD }}
  JWT_SECRET: ${{ secrets.JWT_SECRET }}
```

## 🛡️ Segurança Implementada

### **Autenticação**
- ✅ Email + Senha obrigatórios
- ✅ Token JWT simples (sem backend)
- ✅ Sessão com expiração (1 hora)
- ✅ Validação contínua do token

### **Proteção de Dados**
- ✅ Credenciais em variáveis de ambiente
- ✅ `.env` no `.gitignore`
- ✅ Headers de segurança configurados
- ✅ Validação no cliente

### **Fallbacks**
- ✅ Configurações padrão se env não estiver disponível
- ✅ Sistema funciona em desenvolvimento local
- ✅ Compatível com todas as plataformas

## 📋 Checklist de Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] `.env` não está no repositório
- [ ] Credenciais seguras definidas
- [ ] Headers de segurança ativos
- [ ] Teste de login funcionando
- [ ] Analytics funcionando
- [ ] SSL/HTTPS ativo

## 🎯 URLs Finais

Após o deploy, o site estará disponível em:

- **Site**: `https://seu-site.render.com`
- **Links**: `https://seu-site.render.com/links.html`
- **Admin**: `https://seu-site.render.com/admin-analytics.html`

## 🆘 Troubleshooting

### **Login não funciona**
- Verifique se as variáveis de ambiente estão corretas
- Confirme que os arquivos `config.js` e `env-loader.js` estão carregando

### **Erro 404 no admin**
- Certifique-se que `admin-analytics.html` está no root
- Verifique se os arquivos JS estão sendo carregados

### **Variáveis não carregam**
- No Render: verifique o painel Environment Variables
- Localmente: certifique-se que `.env` existe

---

**🔐 Segurança Garantida + 🚀 Deploy Simples = ✅ Sucesso!** 