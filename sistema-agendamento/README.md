# Sistema de Agendamento

Bem-vindo ao projeto "Sistema de Agendamento" — uma aplicação frontend leve (HTML/CSS/JS) que demonstra um fluxo completo de reserva: seleção de data e horário, validação do formulário, persistência em `localStorage` e uma página administrativa para gerenciar reservas.

**Destaques**
- Interface moderna com tema escuro e visual tecnológico.
- Validação do lado do cliente (nome, email, telefone, data/hora).
- Prevenção de conflitos: não permite reservar o mesmo horário duas vezes.
- Persistência local via `localStorage` (sem servidor).
- Página de administração com filtro, exclusão individual e exclusão em massa.
- Componente de UI para alertas/confirm (banner) — substitui os `alert()`/`confirm()` nativos.

**Conteúdo do repositório**
- `index.html` — formulário público de agendamento.
- `admin.html` — painel administrativo (listar, filtrar, excluir).
- `js/app.js` — lógica do cliente: slots, validação, localStorage.
- `js/admin.js` — lógica da administração.
- `js/ui.js` — componente de banner/confirm personalizável.
- `css/styles.css` — tema moderno/tecnológico.
- `assets/` — gráficos SVG ilustrativos usados no README.

Visualizações dinâmicas

Agora a aplicação gera gráficos dinâmicos a partir dos dados reais do `localStorage` e os exibe na página de administração (`admin.html`). Os gráficos mostram:

- Agendamentos por dia (últimos 7 dias)
- Horários mais populares (top times)

Abra [admin.html](admin.html) para ver os gráficos atualizados em tempo real conforme você cria/exclui agendamentos. Os gráficos são renderizados em SVG pelo navegador sem dependências externas.

Observações sobre os gráficos
- Os dados são agregados diretamente do `localStorage` usado pela aplicação. Se você abrir a admin em outra aba e criar agendamentos na primeira aba, os gráficos serão atualizados automaticamente via evento `storage`.
- Em uma versão com servidor, os mesmos componentes podem ser alimentados com dados reais do banco para relatórios mais completos.

Como usar localmente
1. Abra `index.html` no navegador (arraste o arquivo para o navegador ou use um servidor local).
2. Preencha `Nome`, `Email`, `Telefone`, escolha `Data` e `Horário` e clique em `Agendar`.
3. Para ver e gerenciar agendamentos, abra `admin.html`.

Dicas rápidas
- Se um horário já estiver reservado, a aplicação mostra um banner informando o conflito.
- Na admin, use o filtro por data para ver apenas os agendamentos de um dia específico.
- A exclusão em massa pede confirmação pelo banner.

Exportar dados (próximo passo)
Se quiser, posso adicionar uma função de exportação CSV na página de administração que baixa todos os agendamentos atuais em um arquivo `.csv`.

Contribuição e testes
- O projeto é frontend-only — não há dependências externas. Teste localmente abrindo os arquivos HTML.
- Para testes mais robustos, posso adicionar um pequeno script Node.js que lê/escreve um arquivo JSON (simulando um backend) e gerar gráficos com dados reais.

Contato
Se quiser ajustes visuais (cores, animações), novos relatórios ou exportação de dados, diga qual recurso deseja e eu adiciono.
Sistema de Agendamento
=====================

Projeto simples de um sistema de agendamento usando HTML/CSS/JS.

Funcionalidades:
- Escolha de horário (slots)
- Validação de formulário
- Persistência com localStorage
- Página de administração para listar/excluir agendamentos

Como usar:
1. Abra [sistema-agendamento/index.html](sistema-agendamento/index.html) no navegador.
2. Preencha o formulário e agende um horário.
3. Admin: abra [sistema-agendamento/admin.html](sistema-agendamento/admin.html) para ver/excluir agendamentos.
