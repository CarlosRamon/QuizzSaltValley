# 🎮 Salt Valley Quiz - Go!RN 2025

Mini game gamificado em React + Tailwind CSS desenvolvido para o evento **Go!RN** (o maior evento de empreendedorismo, tecnologia e inovação do Rio Grande do Norte), apresentando a comunidade **Salt Valley** de forma interativa e divertida.

## 🎯 Objetivo

Desenvolver um mini quiz simples e divertido que apresente a comunidade **Salt Valley** aos participantes do evento **Go!RN**. Inspirado no tema do evento "Inovar é Conectar: Pessoas, Ideias, Educação e Oportunidades", o quiz explora conceitos sobre ecossistemas de inovação e conexões. Ao completar o desafio com todas as respostas corretas, o jogador recebe a palavra-chave (selo) **SALT2025** que poderá ser usada no app oficial do evento.

## 🎨 Sobre o Go!RN

O **Go!RN** é o maior evento de inovação e tecnologia do Rio Grande do Norte, realizado em 07-08 de Novembro no Centro de Convenções de Natal. O evento reúne:
- **+15k participantes**
- **15 palcos**
- **13 trilhas de conteúdo**
- **+300 atividades**

O evento impulsiona o ecossistema de inovação potiguar, fortalecendo parcerias estratégicas, estimulando a criação de novos negócios e conectando o RN às principais tendências globais. Mais informações: [gorn.com.br](https://gorn.com.br/)

## ✨ Funcionalidades

- ✅ Quiz interativo com 3 perguntas inspiradas no tema Go!RN sobre inovação, conexões e ecossistema de inovação
- ✅ Barra de progresso visual mostrando o avanço no quiz
- ✅ Feedback visual imediato para acertos e erros
- ✅ Animações suaves com Framer Motion
- ✅ Efeito de confete ao completar todas as perguntas corretamente
- ✅ Exibição do selo **SALT2025** ao finalizar com sucesso
- ✅ Sons de feedback para acertos e erros (Web Audio API)
- ✅ Design responsivo (mobile-first)
- ✅ Paleta de cores da Salt Valley (#F9C526, #000000, #FFFFFF)

## 🚀 Como executar

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

### Instalação

1. Clone ou baixe este repositório
2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse a aplicação no navegador:

```
http://localhost:5173
```

### Build para produção

Para gerar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

Para visualizar o build de produção:

```bash
npm run preview
```

## 📁 Estrutura do projeto

```
salt-valley-quiz/
├── src/
│   ├── components/
│   │   ├── Quiz.jsx          # Componente principal do quiz
│   │   ├── QuizQuestion.jsx  # Componente de pergunta individual
│   │   ├── SuccessScreen.jsx # Tela de sucesso e selo
│   │   ├── Confetti.jsx      # Efeito de confete animado
│   │   └── Logo.jsx          # Logo da Salt Valley
│   ├── App.jsx               # Componente raiz
│   ├── main.jsx              # Entry point
│   └── index.css             # Estilos globais com Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Customização

### Alterar perguntas

Edite o array `questions` no arquivo `src/components/Quiz.jsx`:

```javascript
const questions = [
  {
    id: 1,
    question: 'Sua pergunta aqui?',
    options: [
      { id: 'a', text: 'Opção A' },
      { id: 'b', text: 'Opção B (correta)', isCorrect: true },
      { id: 'c', text: 'Opção C' },
    ],
  },
  // ... mais perguntas
]
```

### Alterar paleta de cores

Edite `tailwind.config.js`:

```javascript
colors: {
  'salt-yellow': '#F9C526',
  'salt-black': '#000000',
  'salt-white': '#FFFFFF',
}
```

### Alterar palavra-chave do selo

Edite o arquivo `src/components/SuccessScreen.jsx` e procure por `SALT2025`.

## 🛠️ Tecnologias utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Biblioteca de animações para React
- **Web Audio API** - Sons de feedback

## 📱 Responsividade

A aplicação foi desenvolvida com abordagem mobile-first, sendo totalmente responsiva para:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🎯 Como jogar

1. Leia a pergunta exibida na tela
2. Selecione uma das 3 alternativas disponíveis
3. Aguarde o feedback visual (verde para acerto, vermelho para erro)
4. Continue respondendo até completar todas as 3 perguntas
5. Se acertar todas, você ganha o selo **SALT2025**! 🎉
6. Use o botão "Jogar Novamente" para reiniciar

## 📝 Licença

Este projeto foi desenvolvido para o evento GoRN 2025 em parceria com a comunidade Salt Valley.

## 🤝 Contribuindo

Este é um projeto interno para o evento GoRN. Para sugestões ou melhorias, entre em contato com a equipe Salt Valley.

---

Desenvolvido com ❤️ para a comunidade Salt Valley e o evento GoRN 2025

