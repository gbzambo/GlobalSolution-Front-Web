# Bimo Web - Global Solution FIAP 2026.2

Assistente web de saúde mental e bem-estar para o cidadão no contexto de **CitizenTech**, desenvolvido para as disciplinas de **Frontend Design** e **Web Development**.

## Integrantes do Grupo
- Eduardo Guzeli Nogueira - RM: 571143
- Diego Caio de Ulhôa - RM: 572190
- Lucas dos Santos Oliveira - RM: 571718
- Octávio Mello Covre de Souza - RM: 571811
- Gabriel Torres Zambo - RM: 569883

## Funcionalidades
1. **Entrar / Cadastro**: Identificação do cidadão e persistência de sessão.
2. **Check-in de Humor**: Registro diário de nota, emoção e anotação com histórico e CRUD completo.
3. **Diário de Bem-Estar**: Espaço para reflexões pessoais com CRUD completo.
4. **Conversa com o Bimo**: Chat interativo adaptado ao humor e à personalidade escolhida.
5. **Personalidade**: Alterne entre Acolhedor, Divertido e Calmo.
6. **Recompensas**: Sistema de pontos, níveis (Semente até Floresta), streaks consecutivos e conquistas.
7. **Segurança e Apoio**: Detecção de termos de risco com exibição imediata de contatos de apoio (CVV 188 e SAMU 192) e aviso fixo de rodapé.

## Tecnologias Utilizadas
- **React + Vite** (JavaScript `.jsx`)
- **Tailwind CSS** para estilização completa
- **React Router DOM** para navegação SPA
- **Supabase REST API** via `fetch` puro para persistência nas tabelas `usuarios`, `checkins` e `diario`.

## Pré-requisitos e Execução
1. Node.js versão 18 ou superior instalado.
2. Instalar dependências:
   ```bash
   npm install