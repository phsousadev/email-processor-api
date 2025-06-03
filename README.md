# ✉ Email processor api
Sistema de envio de e-mails assíncrono e resiliente.

---

## ⚙️ Tecnologias

🟢 Node.js — Plataforma JavaScript para desenvolvimento backend.

⚡ Fastify — Framework web ultrarrápido e extensível para Node.js.

🧪 Vitest — Framework de testes unitários com foco em performance e DX.

🐘 PostgreSQL — Banco de dados relacional robusto e open source.

🚀 Redis — Banco de dados NoSQL em memória, ideal para cache e filas.

📊 Grafana — Plataforma de visualização e monitoramento de métricas.

📈 Prometheus — Sistema de monitoramento e coleta de métricas.

📦 BullMQ — Gerenciador de filas baseado em Redis para Node.js.

🧭 Prisma ORM — ORM moderno com tipagem estática e migrações seguras.

🐳 Docker — Plataforma para criação de ambientes isolados e reproduzíveis.

🧹 ESLint — Ferramenta de linting para manter padrões de código.

⚙️ CI com GitHub Actions — Pipeline de integração e entrega contínua.

🧠 S.O.L.I.D Principles — Conjunto de boas práticas para design de software orientado a objetos.

---

## 💻 Requisitos Básicos

Antes de rodar o projeto, certifique-se de ter instalado na sua máquina:

- **Docker** (para rodar o banco de dados e serviços)
- **Node.js** (versão 22 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

Você pode baixar e instalar:

- Docker: https://docs.docker.com/get-docker/
- Node.js (inclui npm): https://nodejs.org/

---

## ☕ Teste com Insomnia

Baixe a coleção Insomnia para facilitar testes:

➡️ [Baixar coleção Insomnia](./utils/insomnia/email-processor-api-insomnia.yaml)

Importe no Insomnia: **Import / Export > Import Data > From File**.

---

## 📦 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/phsousadev/school-canteen-api.git
```

### 2. Entre na pasta do projeto

```bash
cd school-canteen-api
```

### 3. Suba a infraestrutura dos serviços: Postgres, Prometheus, Redis e Grafana

```bash
docker compose up -d
```

### 4. Instale as dependências do projeto

```bash
npm install
```

### 5. Criando o arquivo `.env`

Copie o arquivo `.env.example` para um novo arquivo `.env` na raiz do projeto, mantendo as mesmas configurações iniciais:

```bash
cp .env.example .env
```

### 6. Execute o projeto

```bash
npm run dev
```