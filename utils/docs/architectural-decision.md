## 🏛️ Decisão Arquitetural

A arquitetura deste projeto foi cuidadosamente concebida com foco em **resiliência**, **desacoplamento**, **observabilidade** e **escalabilidade horizontal**, características essenciais para sistemas modernos que demandam alta disponibilidade e robustez, mesmo sob cenários de falhas e cargas variáveis.

Este modelo arquitetural privilegia a **simplicidade no design** e a **sofisticação na execução**, tornando o sistema fácil de manter, evoluir e escalar conforme a necessidade do negócio.

---

### ✅ Escolha pela Arquitetura Assíncrona com Filas

Optei deliberadamente por um modelo **event-driven** com filas, separando o fluxo de recebimento de requisições HTTP do processamento intensivo de envio de e-mails.

**Decisão motivada pelos seguintes fatores:**

- **Desacoplamento**: a API não precisa conhecer os detalhes do processamento, apenas orquestra a publicação dos eventos.
- **Resiliência**: filas desacopladas permitem que, mesmo diante de falhas temporárias (ex.: indisponibilidade do banco ou do worker), a mensagem não se perca e possa ser processada posteriormente.
- **Elasticidade**: permite escalar os workers conforme a demanda sem afetar a API.
- **Observabilidade**: fácil rastreabilidade do ciclo de vida da mensagem — do recebimento ao envio — com status bem definidos.
- **Time to Market**: acelera o desenvolvimento e entrega contínua, facilitando a introdução de novos tipos de processamentos assíncronos futuramente.

---

### ✅ Uso do BullMQ + Redis

A escolha por **BullMQ** como mecanismo de filas sobre **Redis** visa um equilíbrio entre **desempenho**, **simplicidade operacional** e **potencial de escalabilidade**.

**Critérios considerados:**

- **Alta performance**: Redis oferece operações atômicas em memória, com latência extremamente baixa.
- **Mecanismo robusto de retries**: BullMQ fornece um sistema de tentativas nativo, com política configurável — essencial para sistemas tolerantes a falhas.
- **Facilidade de monitoramento**: ferramentas como Arena ou Bull Board adicionam visibilidade operacional importante para suporte e debugging.
- **Ecossistema maduro**: BullMQ é mantido ativamente e amplamente adotado na comunidade Node.js.
- **Pronto para produção**: oferece recursos como delays, prioridades, repeatable jobs e rate limiting.

Esta decisão considera ainda a possibilidade de migração futura para sistemas de mensageria mais complexos (ex.: Kafka, RabbitMQ) caso o volume ou os requisitos do sistema evoluam.

---

### ✅ Persistência com PostgreSQL

Para o armazenamento e rastreamento do ciclo de vida das mensagens, escolhi o **PostgreSQL** por ser uma solução relacional madura, confiável e extensível.

**Motivações:**

- **ACID compliance**: fundamental para garantir integridade transacional ao persistir e atualizar o status das mensagens.
- **Suporte a operações relacionais**: permite consultas eficientes e consistentes para rastrear status ou realizar atualizações.
- **Extensibilidade**: suporte a JSONB, triggers, stored procedures, facilitando a implementação de funcionalidades avançadas no futuro.
- **Ampla adoção**: reduz risco tecnológico e facilita onboarding de novos desenvolvedores.
- **Ecossistema robusto**: integração perfeita com ORM e query builders modernos no ambiente Node.js.

---

### ✅ Simulação de Envio de E-mail

O envio de e-mail é **simulado** nesta versão do sistema, com foco no desenvolvimento da arquitetura e das políticas de resiliência.

**Racional por trás da escolha:**

- **Foco em arquitetura**: prioridade para implementar e validar a infraestrutura de filas, retries e reprocessamento.
- **Facilidade de testes**: elimina dependência de serviços externos, reduzindo custo e tempo no ciclo de desenvolvimento.
- **Base para extensão**: a arquitetura está pronta para integrar futuramente com serviços de e-mail como SendGrid, Mailgun ou AWS SES, sem alteração estrutural significativa.

---

### ✅ API RESTful com Node.js e Fastify

A escolha de **Node.js** com **Fastify** é estratégica, baseada em desempenho e alinhamento com a proposta de um sistema leve, assíncrono e altamente escalável.

**Motivações:**

- **Alto desempenho**: benchmarks mostram que Fastify possui latência menor e maior throughput comparado a outros frameworks, como Express.
- **Modelo assíncrono**: Node.js é naturalmente orientado a I/O não bloqueante, ideal para aplicações que interagem com filas e bancos.
- **Validação robusta**: Fastify oferece validação de esquema nativa, promovendo segurança e padronização das entradas.
- **Ecossistema vibrante**: ampla gama de plugins e integração facilitada com bibliotecas do ecossistema JavaScript.
- **Fácil deploy**: arquitetura compatível com ambientes serverless, contêineres ou infraestrutura tradicional.

---

### ✅ Separação de Responsabilidades

A arquitetura adota a separação clara de componentes, conforme princípios do **Domain-Driven Design (DDD)** e da **arquitetura hexagonal**:

- **API Layer** → responsável por expor endpoints REST, validar entradas e publicar eventos para as filas.
- **Worker Layer** → dedicada ao processamento assíncrono de tarefas de envio e atualização.

**Vantagens dessa separação:**

- **Evolução independente**: mudanças no processo de envio não impactam a API, e vice-versa.
- **Escalabilidade granular**: permite escalar apenas os workers conforme o volume de mensagens.
- **Resiliência**: falhas no processamento não afetam a disponibilidade da API.

---

### ✅ Políticas de Resiliência e Observabilidade

O sistema foi projetado com foco em robustez operacional:

- **Tentativas automáticas**: cada job é processado até 3 vezes antes de ser considerado irrecuperável (`failure`).
- **Reprocessamento manual**: via endpoint dedicado, promovendo flexibilidade operacional e correção de falhas.
- **Atualização de dados**: rota específica para correção de informações, integrada com fila de atualização, preservando a consistência.
- **Status tracking**: ciclo de vida da mensagem claramente definido (`pending`, `sent`, `failure`), promovendo visibilidade e auditabilidade.

---

## 🎯 Resumo Executivo

A arquitetura e as tecnologias foram selecionadas e combinadas com o objetivo de entregar um sistema que se destaca por:

✅ **Simplicidade e clareza arquitetural**, facilitando manutenção e evolução  
✅ **Alta resiliência**, com mecanismos robustos de tentativas e recuperação  
✅ **Desempenho otimizado**, tanto na API quanto no processamento assíncrono  
✅ **Preparação para escalabilidade horizontal**, acompanhando o crescimento da demanda  
✅ **Observabilidade e rastreabilidade**, fundamentais para operações seguras em produção  

Esta solução não apenas resolve o problema imediato de envio assíncrono de e-mails, mas também estabelece uma **fundação sólida para evolução futura**, incorporando boas práticas de arquitetura de software e engenharia de sistemas distribuídos.

