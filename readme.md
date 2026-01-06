# Simple Shop API 🛒

API REST desenvolvida como **exercício prático** para consolidar conceitos de backend com **Node.js, TypeScript, Express e Knex**. O projeto simula o funcionamento básico de uma loja: cadastro de clientes, produtos e operações relacionadas a compras.

Projeto simples, direto ao ponto e focado em **boas práticas**, organização de código e separação de responsabilidades.

---

## 🧱 Stack utilizada

* **Node.js**
* **TypeScript**
* **Express**
* **Knex.js** (Query Builder)
* **SQLite** (ambiente de estudo)

---

## 📁 Estrutura do projeto

```
src/
 ├── controllers/   # Lógica das requisições
 ├── routes/        # Definição das rotas
 ├── middlewares/   # Tratamento de erros e validações
 ├── data/          # Regras e acesso a dados
 ├── database.ts    # Configuração do Knex
 └── server.ts      # Inicialização da aplicação
```

Arquitetura simples, legível e fácil de evoluir. Nada de gambiarra.

---

## ⚙️ Funcionalidades

* API REST
* CRUD de entidades da loja
* Organização em camadas (routes → controllers → data)
* Tratamento centralizado de erros

> O foco aqui não é feature mirabolante, é **fundamento bem feito**.

---

## 🚀 Como rodar o projeto

### Pré-requisitos

* Node.js (18+ recomendado)
* npm ou yarn

### Instalação

```bash
npm install
```

### Executar em desenvolvimento

```bash
npm run dev
```

Servidor sobe por padrão em:

```
http://localhost:3000
```

---

## 🧪 Objetivo do projeto

Este projeto foi criado **exclusivamente para estudo**, com o objetivo de:

* Praticar TypeScript no backend
* Entender melhor o fluxo de uma API REST
* Trabalhar com banco de dados usando Knex
* Reforçar organização e padrão de código

Não é produção. É aprendizado — e aprendizado bem feito.

---

## 📌 Observações

* Banco simples para facilitar testes
* Código pensado para ser lido, não para impressionar recruiter
* Fácil de estender para autenticação, pedidos, pagamentos etc.

---

## 👨‍💻 Autor

**João Marcos de Jesus Braga**
Desenvolvedor Full Stack

---

Se quebrou, conserta. Se funciona, melhora. Se tá confuso, refatora.
