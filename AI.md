# AI.md - Registro de Uso de Inteligência Artificial

Projeto: **Bimo Web** — Global Solution 2026.2 (FIAP - CitizenTech)  
Disciplinas: Frontend Design e Web Development

---

## 1. Ferramentas de IA Utilizadas e Finalidades

| Ferramenta | Modelo / Versão | Finalidade no Projeto |
| :--- | :--- | :--- |
| **Google Gemini** | Gemini (Web) | Esclarecimento de dúvidas sobre Tailwind CSS v4, revisão de erros de integração com a API REST do Supabase via `fetch`, validação de lógica de cálculo de streak e estruturação de documentação. |

---

## 2. Interações Realizadas (Prompts e Respostas)

### Prompt 1 — Configuração do Tailwind CSS v4 no Vite
* **Contexto:** O grupo enfrentou erros de diretivas `@apply` e configuração de cores customizadas ao atualizar para a versão mais recente do Tailwind no Vite.
* **Prompt enviado:** *"Estou configurando um projeto React com Vite e quero usar o Tailwind CSS direto no plugin do Vite sem precisar criar arquivo `tailwind.config.js`. Como faço a configuração atualizada no `vite.config.js` e no `src/index.css` para registrar cores customizadas?"*
* **Resumo da resposta:** A IA explicou a mudança da v4 do Tailwind (`@tailwindcss/vite`), orientou substituir `@tailwind base/components/utilities` por `@import "tailwindcss";` e usar o bloco `@theme { --color-bimo-500: ... }` diretamente no CSS.

### Prompt 2 — Consumo da API REST do Supabase com `fetch` puro
* **Contexto:** Como o requisito da disciplina proibia o uso do SDK `@supabase/supabase-js`, surgiram dúvidas sobre os cabeçalhos HTTP obrigatórios para que operações `POST` e `PATCH` retornassem o objeto criado/atualizado.
* **Prompt enviado:** *"Como monto uma função base usando `fetch` puro em JavaScript para consumir a API REST do Supabase (PostgREST) enviando a `apikey`, o `Authorization` e garantindo que o `POST` e o `PATCH` devolvam o registro criado no JSON de resposta?"*
* **Resumo da resposta:** A IA detalhou o envio dos headers `apikey`, `Authorization: Bearer` e `Prefer: return=representation`, além do tratamento de status HTTP 204 para requisições `DELETE`.

### Prompt 3 — Cálculo de Streak Consecutivo com Fuso Horário Local
* **Contexto:** Ao calcular dias seguidos de check-in, datas em UTC causavam diferença de um dia no horário de Brasília à noite.
* **Prompt enviado:** *"Tenho um array de check-ins com datas no formato `YYYY-MM-DD`. Preciso de uma função pura em JavaScript que calcule o streak de dias consecutivos até hoje usando o fuso horário local do navegador, sem bibliotecas externas. Como posso estruturar essa lógica?"*
* **Resumo da resposta:** A IA sugeriu normalizar a data atual zerando horas/minutos localmente, remover datas duplicadas e iterar comparando a diferença em milissegundos convertida para dias inteiros.

### Prompt 4 — Normalização de Texto para Detecção de Termos de Risco
* **Contexto:** Garantir que o alerta de apoio (CVV 188) fosse acionado mesmo se o usuário digitasse palavras sem acento ou com letras maiúsculas misturadas.
* **Prompt enviado:** *"Como faço em JavaScript para normalizar uma string removendo acentos e convertendo para minúsculas antes de verificar se ela contém alguma palavra de uma lista de expressões de risco emocional?"*
* **Resumo da resposta:** A IA recomendou o uso de `.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')` tanto no texto digitado quanto nos termos de referência.

### Prompt 5 — Revisão de Erro de Rota e Importação no Vite
* **Contexto:** Durante a integração das páginas no `App.jsx`, ocorreu um erro de resolução de módulo e recarregamento de formulário na tela de entrada.
* **Prompt enviado:** *"O Vite está acusando erro ao resolver o import de uma página e, na tela de login, ao clicar no botão de enviar, a página dá uma piscada rápida e não muda de rota. O que pode estar causando isso no React Router?"*
* **Resumo da resposta:** A IA apontou a necessidade de verificar o `e.preventDefault()`, conferir o `type="submit"` no componente de botão reutilizável e inspecionar a aba Network/Console para validar o retorno da API.

---

## 3. Aplicação no Projeto

| Funcionalidade / Arquivo | O que a IA auxiliou | O que o grupo implementou e validou |
| :--- | :--- | :--- |
| `vite.config.js` e `src/index.css` | Sintaxe oficial do plugin `@tailwindcss/vite` e variáveis `@theme`. | Escolha da paleta de cores acolhedora (`bimo-50` a `bimo-700`) e estilização responsiva de todas as telas. |
| `src/services/api.js` | Estruturação dos headers do PostgREST (`Prefer: return=representation`). | Criação dos 3 serviços específicos (`usuariosService`, `checkinsService`, `diarioService`) e tratamento de erros. |
| `src/utils/recompensas.js` | Lógica de comparação de datas locais para contagem de streak. | Definição das regras de pontuação (+10 check-in, +15 diário), níveis (Semente a Floresta) e critérios de conquistas. |
| `src/utils/risco.js` | Expressão regular para remoção de acentos (`normalize('NFD')`). | Curadoria das expressões de alerta, criação do componente `AlertaApoio.jsx` e inclusão dos contatos do CVV 188 e SAMU 192. |
| `src/hooks/*` | Padrão de separação entre estado/efeitos e componentes visuais. | Implementação completa dos 4 custom hooks (`useAuth`, `useCheckins`, `useDiario`, `useRecompensas`) e testes manuais de CRUD. |

---

## 4. Validação das Respostas (Testes Manuais)

| Cenário Testado | Resultado Esperado | Resultado Obtido |
| :--- | :--- | :--- |
| Cadastro com nome inválido (1 letra ou números) | Exibir mensagem de erro de validação e bloquear envio. | Validação exibida corretamente; requisição não enviada. |
| Cadastro/Login com nome válido (2 a 20 letras) | Criar registro no Supabase (ou buscar existente) e salvar ID no `localStorage`. | Usuário autenticado, sessão mantida ao atualizar (F5) e redirecionado para `/home`. |
| Check-in repetido no mesmo dia | Identificar registro existente na data local e permitir edição (PATCH) em vez de duplicar. | Formulário carregou os dados do dia e atualizou o registro existente. |
| CRUD completo no Diário | Criar, listar em ordem decrescente, editar texto e excluir com modal de confirmação. | Todas as operações refletidas imediatamente na interface e no banco Supabase. |
| Detecção de palavras de risco | Exibir `AlertaApoio` com CVV 188 e SAMU 192 sem atribuir pontos comemorativos. | Alerta exibido imediatamente ao detectar expressões com ou sem acento. |
| Recarregar página em rota interna (`/recompensas`) | Manter sessão ativa e renderizar a rota sem erro 404. | Funcionou localmente e configurado via `vercel.json` para produção. |

---

## 5. Análise Crítica

* **Benefícios:** O uso da IA acelerou a resolução de erros específicos de configuração (como a migração para o Tailwind v4 sem `tailwind.config.js`) e ajudou a manter a arquitetura limpa em camadas (Services, Hooks, Utils e Components), evitando lógica de `fetch` misturada nos componentes visuais.
* **Limitações e Dificuldades:** Algumas sugestões iniciais da IA traziam configurações voltadas para versões anteriores do Tailwind ou sugeriam o SDK oficial do Supabase (que não podia ser usado na atividade). O grupo precisou revisar todos os imports, adaptar o código para JavaScript puro (`.jsx`/`.js`) e configurar manualmente as tabelas e políticas RLS no painel do Supabase.