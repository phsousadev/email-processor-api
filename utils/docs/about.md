## ⚙️ Funcionamento da API

### ✅ Envio de E-mail

O cliente faz uma requisição `POST /emails` com os dados da mensagem.

A API:

- Armazena a mensagem no banco de dados com status `pending`.
- Publica o `id` da mensagem na fila `send_email` (BullMQ).

**Vantagens**:

- Processamento assíncrono.
- Não bloqueia a requisição do cliente.

---

### ✅ Processamento Assíncrono com BullMQ

- **Worker** escuta a fila `send_email`.

Ao receber um job:

- Busca a mensagem no PostgreSQL pelo `id`.
- Simula o envio de e-mail.

**Política de Tentativas**:

- Até **3 tentativas** em caso de falha.
- Se falhar 3 vezes → atualiza status para `"failure"`.
- Se for bem-sucedido → atualiza status para `"sent"`.

---

### ✅ Consulta de Status

A rota `GET /emails/:id/status` permite consultar o status atual da mensagem:

- `pending`
- `sent`
- `failure`

---

### ✅ Reprocessamento de Mensagens

A rota `POST /emails/:id/reprocess` permite enviar novamente o `id` para a fila `send_email`.

Utilizado para tentar o envio novamente em casos onde houve falha mas o problema foi corrigido.

---

### ✅ Atualização de Dados

A rota `PUT /emails/:id` permite atualizar os dados de uma mensagem (ex: corrigir endereço de e-mail incorreto).

Ao atualizar:

- O `id` é enviado para a fila `update_email`.
- Worker da `update_email` realiza a atualização no banco.

Após atualização, pode-se reprocessar o envio normalmente.
