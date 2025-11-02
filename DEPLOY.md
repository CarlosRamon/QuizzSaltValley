# 🚀 Guia de Deploy Gratuito

Este guia mostra como hospedar o Salt Valley Quiz gratuitamente em diferentes plataformas.

## 📋 Opções de Hospedagem Gratuita

### 1. **Vercel** (Recomendado ⭐)
**Melhor para:** Deploy rápido e automático

#### Passos:
1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "New Project"
4. Conecte seu repositório GitHub
5. Vercel detecta automaticamente o Vite
6. Clique em "Deploy"

**Configuração automática detectada:**
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

**Vantagens:**
- ✅ Deploy automático a cada push
- ✅ HTTPS gratuito
- ✅ CDN global
- ✅ Preview de PRs
- ✅ Custom domains grátis

---

### 2. **Netlify**
**Melhor para:** Features adicionais e fácil configuração

#### Passos:
1. Faça push do código para o GitHub
2. Acesse [netlify.com](https://netlify.com)
3. Clique em "Add new site" → "Import an existing project"
4. Conecte seu repositório GitHub
5. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Clique em "Deploy site"

**Vantagens:**
- ✅ Deploy automático
- ✅ HTTPS gratuito
- ✅ Formulários gratuitos
- ✅ Funções serverless
- ✅ Custom domains grátis

---

### 3. **GitHub Pages**
**Melhor para:** Projetos open source

#### Passos:

1. **Atualize o `vite.config.js`:**
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/salt-valley-quiz/', // substitua pelo nome do seu repositório
})
```

2. **Adicione script no `package.json`:**
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. **Instale gh-pages:**
```bash
npm install --save-dev gh-pages
```

4. **Faça deploy:**
```bash
npm run deploy
```

5. **Ative GitHub Pages:**
   - Vá em Settings → Pages
   - Source: `gh-pages` branch
   - Salve

**URL:** `https://seu-usuario.github.io/salt-valley-quiz/`

---

### 4. **Cloudflare Pages**
**Melhor para:** Performance máxima

#### Passos:
1. Faça push do código para o GitHub
2. Acesse [dash.cloudflare.com](https://dash.cloudflare.com)
3. Vá em Pages → "Create a project"
4. Conecte seu repositório GitHub
5. Configure:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
6. Clique em "Save and Deploy"

**Vantagens:**
- ✅ Deploy extremamente rápido
- ✅ CDN global da Cloudflare
- ✅ HTTPS automático
- ✅ Custom domains grátis

---

## 🔧 Pré-requisitos

1. **Crie uma conta no GitHub** (se ainda não tiver)
2. **Crie um repositório** no GitHub
3. **Faça push do código:**

```bash
# Inicialize git (se ainda não tiver)
git init

# Adicione os arquivos
git add .

# Commit
git commit -m "Initial commit"

# Adicione o repositório remoto
git remote add origin https://github.com/seu-usuario/salt-valley-quiz.git

# Push
git branch -M main
git push -u origin main
```

---

## 📝 Recomendações

- **Para iniciantes:** Use **Vercel** - é o mais simples e rápido
- **Para mais features:** Use **Netlify** - oferece funções serverless
- **Para projetos open source:** Use **GitHub Pages** - integrado ao GitHub
- **Para melhor performance:** Use **Cloudflare Pages** - CDN mais rápido

---

## 🎯 Quick Start (Vercel)

```bash
# 1. Push para GitHub
git add .
git commit -m "Deploy ready"
git push

# 2. Acesse vercel.com
# 3. Clique em "New Project"
# 4. Selecione o repositório
# 5. Clique em "Deploy"
# Pronto! 🎉
```

---

## 🔒 Notas Importantes

- Todas as plataformas oferecem HTTPS gratuito
- Domínios customizados são gratuitos na maioria
- Limites de bandwidth generosos no plano gratuito
- Todos oferecem deploys automáticos via Git

