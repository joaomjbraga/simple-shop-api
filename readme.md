# Simple Shop API 🛒

API REST desenvolvida como **exercício prático** para consolidar conceitos de backend com **Node.js, TypeScript, Express e Knex**. O projeto simula o funcionamento básico de uma loja: cadastro de clientes, produtos e operações relacionadas a compras.

Projeto simples, direto ao ponto e focado em **boas práticas**, organização de código e separação de responsabilidades.

---

## 🧱 Stack utilizada

* **Node.js** - Runtime JavaScript
* **TypeScript** - Superset tipado do JavaScript
* **Express** - Framework web para Node.js
* **Knex.js** - Query Builder para SQL
* **SQLite** - Banco de dados relacional (ambiente de estudo)
* **Zod** - Validação de schemas

---

## 📁 Estrutura do projeto

```
src/
 ├── controllers/        # Lógica de negócio das requisições
 │   ├── clients-controllers.ts
 │   ├── products-controlles.ts
 │   └── carrinho-controllers.ts
 ├── routes/             # Definição das rotas da API
 │   ├── index.ts
 │   ├── clients-routes.ts
 │   ├── products-routes.ts
 │   └── carrinho-routes.ts
 ├── middlewares/        # Middlewares (tratamento de erros)
 │   └── Error-handling.ts
 ├── data/               # Dados e configurações do banco
 │   ├── migrations/     # Migrações do banco de dados
 │   ├── seed/           # Seeds (dados iniciais)
 │   └── types/          # Definições de tipos TypeScript
 ├── database.ts         # Configuração do Knex
 └── server.ts           # Inicialização da aplicação
```

Arquitetura simples, legível e fácil de evoluir. Nada de gambiarra.

---

## 🚀 Como rodar o projeto

### Pré-requisitos

* **Node.js** versão 18 ou superior
* **npm** ou **yarn** (gerenciador de pacotes)

### Instalação

1. Clone o repositório ou navegue até a pasta do projeto:
```bash
cd api-loja
```

2. Instale as dependências:
```bash
npm install
```

3. Execute as migrações do banco de dados (se necessário):
```bash
npm run knex migrate:latest
```

4. (Opcional) Execute os seeds para popular o banco com dados iniciais:
```bash
npm run knex seed:run
```

### Executar em desenvolvimento

```bash
npm run dev
```

O servidor será iniciado e ficará disponível em:
```
http://localhost:3000
```

Você verá a mensagem: `Servidor ONLINE 🦸`

### Executar em produção

1. Compile o TypeScript:
```bash
npm run build
```

2. Execute o servidor:
```bash
npm start
```

---

## 📚 Documentação da API

### Base URL

Todas as rotas começam com:
```
http://localhost:3000
```

### Códigos de Status HTTP

A API utiliza os seguintes códigos de status:

- `200` - Sucesso (GET, PUT)
- `201` - Criado com sucesso (POST)
- `204` - Sem conteúdo (DELETE bem-sucedido)
- `400` - Erro de validação (dados inválidos)
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor

---

## 🔌 Rotas da API

### 👥 Rotas de Clientes (`/user`)

#### Listar todos os clientes
```http
GET /user
```

**Resposta de sucesso (200):**
```json
[
  {
    "id": 1,
    "name": "João Silva"
  },
  {
    "id": 2,
    "name": "Maria Santos"
  }
]
```

**Exemplo com cURL:**
```bash
curl -X GET http://localhost:3000/user
```

**Exemplo com Postman:**
- Método: `GET`
- URL: `http://localhost:3000/user`
- Headers: `Content-Type: application/json`

---

#### Buscar cliente por ID
```http
GET /user/:id
```

**Parâmetros:**
- `id` (path parameter) - ID do cliente

**Resposta de sucesso (200):**
```json
{
  "name": "João Silva"
}
```

**Resposta de erro (404):**
```json
{
  "message": "Usuário não encontrado"
}
```

**Exemplo com cURL:**
```bash
curl -X GET http://localhost:3000/user/1
```

**Exemplo com Postman:**
- Método: `GET`
- URL: `http://localhost:3000/user/1`

---

#### Criar novo cliente
```http
POST /user
```

**Body (JSON):**
```json
{
  "name": "João Silva"
}
```

**Validações:**
- `name`: obrigatório, string, mínimo 4 caracteres

**Resposta de sucesso (201):**
```json
{
  "message": "Usuário adicionado com sucesso"
}
```

**Resposta de erro (400):**
```json
{
  "message": "Erro de validação",
  "issues": {
    "name": {
      "_errors": ["String must contain at least 4 character(s)"]
    }
  }
}
```

**Exemplo com cURL:**
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva"}'
```

**Exemplo com Postman:**
- Método: `POST`
- URL: `http://localhost:3000/user`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "name": "João Silva"
}
```

---

#### Atualizar cliente
```http
PUT /user
```

**Body (JSON):**
```json
{
  "id": 1,
  "name": "João Silva Atualizado"
}
```

**Validações:**
- `id`: obrigatório, número
- `name`: obrigatório, string

**Resposta de sucesso (200):**
```json
{
  "message": "Usuário atualizado com sucesso"
}
```

**Resposta de erro (404):**
```json
{
  "message": "Usuário não encontrado"
}
```

**Exemplo com cURL:**
```bash
curl -X PUT http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "name": "João Silva Atualizado"}'
```

---

#### Deletar cliente
```http
DELETE /user
```

**Body (JSON):**
```json
{
  "id": 1
}
```

**Validações:**
- `id`: obrigatório, número

**Resposta de sucesso (204):**
Sem conteúdo no body

**Resposta de erro (404):**
```json
{
  "message": "Usuário não encontrado"
}
```

**Exemplo com cURL:**
```bash
curl -X DELETE http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'
```

---

### 📦 Rotas de Produtos (`/products`)

#### Listar todos os produtos
```http
GET /products
```

**Resposta de sucesso (200):**
```json
[
  {
    "id": 1,
    "products": "Notebook Dell",
    "Lançado_em": 2024
  },
  {
    "id": 2,
    "products": "Mouse Logitech",
    "Lançado_em": 2023
  }
]
```

**Exemplo com cURL:**
```bash
curl -X GET http://localhost:3000/products
```

---

#### Criar novo produto
```http
POST /products
```

**Body (JSON):**
```json
{
  "products": "Teclado Mecânico"
}
```

**Validações:**
- `products`: obrigatório, string, mínimo 4 caracteres

**Resposta de sucesso (201):**
```json
{
  "message": "Produto adicionado com sucesso"
}
```

**Exemplo com cURL:**
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"products": "Teclado Mecânico"}'
```

---

#### Atualizar produto
```http
PUT /products
```

**Body (JSON):**
```json
{
  "id": 1,
  "products": "Notebook Dell Atualizado"
}
```

**Validações:**
- `id`: obrigatório, número
- `products`: obrigatório, string, mínimo 4 caracteres

**Resposta de sucesso (200):**
```json
{
  "message": "Produto atualizado"
}
```

**Resposta de erro (404):**
```json
{
  "message": "Produto não encontrado"
}
```

**Exemplo com cURL:**
```bash
curl -X PUT http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "products": "Notebook Dell Atualizado"}'
```

---

#### Deletar produto
```http
DELETE /products
```

**Body (JSON):**
```json
{
  "id": 1
}
```

**Validações:**
- `id`: obrigatório, número

**Resposta de sucesso (204):**
Sem conteúdo no body

**Resposta de erro (404):**
```json
{
  "message": "Produto não encontrado"
}
```

**Exemplo com cURL:**
```bash
curl -X DELETE http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'
```

---

### 🛒 Rotas de Carrinho (`/carrinho`)

#### Listar todas as compras
```http
GET /carrinho
```

**Resposta de sucesso (200):**
```json
[
  {
    "ID do Cliente": 1,
    "Cliente": "João Silva",
    "ID do Produto": 1,
    "Produto": "Notebook Dell",
    "ID da Compra": 1
  },
  {
    "ID do Cliente": 2,
    "Cliente": "Maria Santos",
    "ID do Produto": 2,
    "Produto": "Mouse Logitech",
    "ID da Compra": 2
  }
]
```

**Exemplo com cURL:**
```bash
curl -X GET http://localhost:3000/carrinho
```

---

#### Criar nova compra (adicionar ao carrinho)
```http
POST /carrinho
```

**Body (JSON):**
```json
{
  "client_id": 1,
  "loja_id": 1
}
```

**Validações:**
- `client_id`: obrigatório, número (deve existir na tabela de clientes)
- `loja_id`: obrigatório, número (deve existir na tabela de produtos)

**Resposta de sucesso (201):**
```json
{
  "message": "Compra finalizada com sucesso"
}
```

**Resposta de erro (404):**
```json
{
  "message": "Cliente não encontrado"
}
```
ou
```json
{
  "message": "Produto não encontrado"
}
```

**Exemplo com cURL:**
```bash
curl -X POST http://localhost:3000/carrinho \
  -H "Content-Type: application/json" \
  -d '{"client_id": 1, "loja_id": 1}'
```

---

#### Atualizar compra
```http
PUT /carrinho
```

**Body (JSON):**
```json
{
  "id": 1,
  "client_id": 2,
  "loja_id": 2
}
```

**Validações:**
- `id`: obrigatório, número inteiro
- `client_id`: obrigatório, número inteiro (deve existir)
- `loja_id`: obrigatório, número inteiro (deve existir)

**Resposta de sucesso (200):**
```json
{
  "message": "Carrinho atualizado com sucesso"
}
```

**Resposta de erro (404):**
```json
{
  "message": "Carrinho não encontrado"
}
```
ou
```json
{
  "message": "Cliente não encontrado"
}
```
ou
```json
{
  "message": "Produto não encontrado"
}
```

**Exemplo com cURL:**
```bash
curl -X PUT http://localhost:3000/carrinho \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "client_id": 2, "loja_id": 2}'
```

---

#### Deletar compra
```http
DELETE /carrinho
```

**Body (JSON):**
```json
{
  "id": 1
}
```

**Validações:**
- `id`: obrigatório, número

**Resposta de sucesso (204):**
Sem conteúdo no body

**Resposta de erro (404):**
```json
{
  "message": "Compra não encontrada"
}
```

**Exemplo com cURL:**
```bash
curl -X DELETE http://localhost:3000/carrinho \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'
```

---

#### Buscar comprovante de compra
```http
GET /carrinho/:id
```

**Parâmetros:**
- `id` (path parameter) - ID da compra

**Resposta de sucesso (200):**
```json
{
  "Cliente": "João Silva",
  "Produto": "Notebook Dell"
}
```

**Resposta de erro (404):**
```json
{
  "message": "Registro não encontrado"
}
```

**Exemplo com cURL:**
```bash
curl -X GET http://localhost:3000/carrinho/1
```

---

## 🧪 Como testar as rotas

### Opção 1: Usando cURL (Terminal)

O cURL é uma ferramenta de linha de comando disponível na maioria dos sistemas operacionais.

**Exemplos básicos:**

```bash
# Listar clientes
curl http://localhost:3000/user

# Criar cliente
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva"}'

# Atualizar cliente
curl -X PUT http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "name": "João Atualizado"}'

# Deletar cliente
curl -X DELETE http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'
```

### Opção 2: Usando Postman

1. **Instale o Postman**: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

2. **Crie uma nova requisição:**
   - Clique em "New" → "HTTP Request"
   - Selecione o método HTTP (GET, POST, PUT, DELETE)
   - Digite a URL: `http://localhost:3000/user` (ou outra rota)

3. **Para requisições com body (POST, PUT, DELETE):**
   - Vá na aba "Body"
   - Selecione "raw"
   - Escolha "JSON" no dropdown
   - Cole o JSON no campo de texto

4. **Envie a requisição:**
   - Clique no botão "Send"
   - Veja a resposta na parte inferior

### Opção 3: Usando Insomnia

Similar ao Postman, o Insomnia é outra ferramenta popular para testar APIs.

1. **Instale o Insomnia**: [https://insomnia.rest/download](https://insomnia.rest/download)

2. **Crie uma nova requisição e siga os mesmos passos do Postman**

### Opção 4: Usando HTTPie (Terminal)

HTTPie é uma alternativa mais amigável ao cURL:

```bash
# Instalar (se não tiver)
# Linux/Mac: pip install httpie
# Windows: choco install httpie

# Listar clientes
http GET http://localhost:3000/user

# Criar cliente
http POST http://localhost:3000/user name="João Silva"

# Atualizar cliente
http PUT http://localhost:3000/user id:=1 name="João Atualizado"

# Deletar cliente
http DELETE http://localhost:3000/user id:=1
```

### Opção 5: Usando JavaScript/TypeScript (fetch)

```javascript
// Listar clientes
fetch('http://localhost:3000/user')
  .then(response => response.json())
  .then(data => console.log(data));

// Criar cliente
fetch('http://localhost:3000/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'João Silva' })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 🔄 Fluxo de trabalho recomendado

Para testar a API de forma completa, siga esta ordem:

1. **Criar clientes:**
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva"}'

curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name": "Maria Santos"}'
```

2. **Criar produtos:**
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"products": "Notebook Dell"}'

curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"products": "Mouse Logitech"}'
```

3. **Listar clientes e produtos para pegar os IDs:**
```bash
curl http://localhost:3000/user
curl http://localhost:3000/products
```

4. **Criar compras (usar os IDs obtidos):**
```bash
curl -X POST http://localhost:3000/carrinho \
  -H "Content-Type: application/json" \
  -d '{"client_id": 1, "loja_id": 1}'
```

5. **Listar compras:**
```bash
curl http://localhost:3000/carrinho
```

6. **Buscar comprovante:**
```bash
curl http://localhost:3000/carrinho/1
```

---

## ⚠️ Tratamento de erros

A API possui tratamento centralizado de erros. Todos os erros são retornados em formato JSON:

### Erro de validação (400)
```json
{
  "message": "Erro de validação",
  "issues": {
    "name": {
      "_errors": ["String must contain at least 4 character(s)"]
    }
  }
}
```

### Recurso não encontrado (404)
```json
{
  "message": "Usuário não encontrado"
}
```

### Erro interno do servidor (500)
```json
{
  "message": "Erro no servidor",
  "error": "Detalhes do erro (apenas em desenvolvimento)"
}
```

---

## 📌 Observações importantes

* **Banco de dados**: O projeto usa SQLite, que cria um arquivo `dados.db` na pasta `src/data/`
* **Validações**: Todos os dados são validados usando Zod antes de serem processados
* **Integridade referencial**: Ao criar/atualizar compras, a API verifica se o cliente e produto existem
* **Código limpo**: O projeto segue boas práticas de organização e separação de responsabilidades
* **Fácil de estender**: A arquitetura permite adicionar facilmente autenticação, pagamentos, etc.

---

## 🧪 Objetivo do projeto

Este projeto foi criado **exclusivamente para estudo**, com o objetivo de:

* Praticar TypeScript no backend
* Entender melhor o fluxo de uma API REST
* Trabalhar com banco de dados usando Knex
* Reforçar organização e padrão de código
* Aprender validação de dados com Zod
* Implementar tratamento de erros adequado

Não é produção. É aprendizado — e aprendizado bem feito.

---

## 👨‍💻 Autor

**João Marcos de Jesus Braga**
Desenvolvedor Full Stack

---

## 📝 Licença

Este projeto é de código aberto e está disponível para fins educacionais.

---

> **Se quebrou, conserta. Se funciona, melhora. Se tá confuso, refatora.**
