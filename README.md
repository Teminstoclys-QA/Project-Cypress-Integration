# Automação E2E e API com Cypress — ServeRest

[![CI](https://github.com/Teminstoclys-QA/Project-Cypress-Integration/actions/workflows/ci.yml/badge.svg)](https://github.com/Teminstoclys-QA/Project-Cypress-Integration/actions/workflows/ci.yml)
![Cypress](https://img.shields.io/badge/Cypress-16-17202C?logo=cypress&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber-Gherkin%20pt--BR-23D96C?logo=cucumber&logoColor=white)
![Allure](https://img.shields.io/badge/Allure%20Report-3-FF6F00)

Suíte de testes ponta a ponta do [ServeRest](https://serverest.dev) que integra as duas camadas da aplicação: o **front-end** ([front.serverest.dev](https://front.serverest.dev)) e a **API REST** ([serverest.dev](https://serverest.dev)). Os cenários de tela usam a API para preparar e limpar os dados e validam, no mesmo teste, a resposta do back-end e o que o usuário vê.

## Destaques

| Aspecto                    | Como foi feito                                                                     |
| -------------------------- | ---------------------------------------------------------------------------------- |
| Cobertura                  | 6 funcionalidades (3 de front-end e 3 de API) e 14 cenários, positivos e negativos |
| Integração front-end e API | Cenários de tela preparam e limpam os dados via API e validam as duas camadas      |
| Arquitetura                | Page Objects, Service Objects, factories de dados e contexto de cenário            |
| Assertivas                 | Status HTTP, mensagem, contrato (JSON Schema) e estado da tela                     |
| BDD                        | Cenários em Gherkin, escritos em português                                         |
| Evidências                 | Allure Report com prints de tela e respostas da API                                |
| Qualidade de código        | TypeScript strict, ESLint, Prettier e Conventional Commits                         |
| CI                         | GitHub Actions com execução paralela das suítes de API e E2E                       |

## Stack

| Ferramenta                                | Papel                                                    |
| ----------------------------------------- | -------------------------------------------------------- |
| Cypress 16                                | Execução dos testes E2E e de API                         |
| TypeScript                                | Tipagem dos contratos, payloads e Page Objects           |
| `@badeball/cypress-cucumber-preprocessor` | Cenários em Gherkin (BDD) + relatório HTML               |
| `@faker-js/faker`                         | Massa de dados dinâmica e única a cada execução          |
| Ajv                                       | Validação de contrato (JSON Schema) das respostas da API |
| Allure Report 3                           | Relatório com evidências (prints de tela e respostas)    |
| ESLint + Prettier                         | Padronização e qualidade do código                       |
| GitHub Actions                            | Pipeline de CI                                           |

## Cenários

Cada funcionalidade tem cenário positivo e negativo. Total: **6 features, 14 cenários**.

| Camada | Feature                    | Positivo                                  | Negativo                                      |
| ------ | -------------------------- | ----------------------------------------- | --------------------------------------------- |
| API    | `login.feature`            | Login válido retorna token Bearer         | Senha incorreta / e-mail não cadastrado (401) |
| API    | `usuarios.feature`         | Cadastro de usuário + consulta por ID     | E-mail já utilizado (400)                     |
| API    | `produtos.feature`         | Administrador cadastra produto            | Sem token (401) / usuário comum (403)         |
| E2E    | `login.feature`            | Administrador acessa o painel             | Senha incorreta exibe alerta                  |
| E2E    | `cadastro-usuario.feature` | Visitante cria conta e vai para a loja    | E-mail já utilizado exibe alerta              |
| E2E    | `cadastro-produto.feature` | Admin cadastra produto e o vê na listagem | Nome de produto duplicado exibe alerta        |

## Integração entre front-end e back-end

Um cenário E2E percorre as duas camadas:

1. **Preparação via API:** o administrador (e, quando necessário, um produto) é criado direto no back-end.
2. **Ação pela tela:** o usuário interage com o front-end, que chama a API.
3. **Validação nas duas camadas:** o `cy.intercept` captura a chamada do front e valida status e mensagem da API; em seguida, valida-se o que é exibido na tela.
4. **Limpeza via API:** tudo o que foi criado, inclusive pela tela, é removido ao final do cenário.

## Estrutura

```
cypress/
├── e2e/                          # Cenários em Gherkin (o "o quê")
│   ├── api/
│   └── frontend/
└── support/                      # Implementação (o "como")
    ├── actions/                  # Pré-condições e limpeza via API
    ├── allure/                   # Ajustes de integração com o Allure
    ├── constants/                # Mensagens esperadas da aplicação
    ├── context/                  # Estado compartilhado entre steps de um cenário
    ├── data/                     # Factories de massa de dados (Faker)
    ├── pages/                    # Page Objects do front-end
    ├── schemas/                  # Contratos JSON Schema + validador
    ├── services/                 # Service Objects da API
    ├── step_definitions/         # Ligação Gherkin → código
    │   ├── api/
    │   ├── common/               # Hooks, evidências e steps compartilhados
    │   └── frontend/
    ├── types/                    # Tipos TypeScript dos contratos
    ├── commands.ts               # Comandos customizados (cy.loginViaUi)
    └── e2e.ts
```

## Decisões técnicas

**Massa de dados criada pelo próprio teste.** O ambiente público do ServeRest é resetado periodicamente, então nenhum cenário depende de usuário ou produto cadastrado manualmente. Cada cenário cria seus dados via API com o Faker (e-mails e nomes únicos) e o hook `After` apaga tudo no final, passando ou falhando. Isso também elimina a necessidade de guardar credenciais.

**Pré-condição pela API, teste pela tela.** No E2E, o que não é o foco do teste (criar o administrador, cadastrar um produto pré-existente) é feito via API, que é mais rápida e estável. A interface só é exercitada no comportamento sob teste.

**`cy.intercept` em vez de esperas fixas.** Os Page Objects interceptam a chamada que o front faz à API (`POST /login`, `/usuarios`, `/produtos`) e aguardam a resposta real. Isso deixa o teste estável e permite validar duas camadas no mesmo cenário. O `_id` interceptado também alimenta a limpeza. Uma regra do ESLint (`cypress/no-unnecessary-waiting`) proíbe `cy.wait(ms)`.

**Page Objects e Service Objects.** Seletores e chamadas HTTP ficam encapsulados em classes com uma base comum (`BasePage`, `BaseService`). Os steps não conhecem seletor nem URL: se a tela ou o endpoint mudar, a correção é feita em um só lugar.

**Seletores `data-testid`.** São estáveis e não quebram com mudança de layout ou CSS.

**Validação de contrato.** As respostas da API são validadas contra JSON Schema com `additionalProperties: false`, detectando campos removidos, com tipo errado ou inesperados.

**Contexto de cenário.** Um objeto tipado (`support/context/cenario.ts`) guarda o estado entre os steps. Ele é zerado no `Before`, então nenhum cenário herda dados de outro.

**Gherkin em português no Allure.** O Allure só remove a marcação de negrito dos passos quando as palavras-chave estão em inglês. Um ajuste em `support/allure/passosGherkin.ts` normaliza o texto antes de o Allure lê-lo.

**Evidência em relatório.** O Allure recebe um print de tela por cenário de front e a resposta HTTP por cenário de API. O `cypress-on-fix` permite que Cucumber e Allure registrem os mesmos eventos do Cypress sem um sobrescrever o outro.

**Configuração por ambiente.** As URLs vêm de variáveis de ambiente (`.env` local, _Repository variables_ no CI), com fallback para o ambiente público. Nenhum dado sensível é versionado.

## Como executar

Pré-requisitos: Node.js 22+ (há um `.nvmrc` no projeto) e Google Chrome instalado.

```bash
git clone https://github.com/Teminstoclys-QA/Project-Cypress-Integration.git
cd Project-Cypress-Integration
npm install
cp .env.example .env

npm test                  # todos os cenários (headless)
npm run test:api          # apenas API
npm run test:e2e          # apenas front-end
npm run test:smoke        # apenas cenários críticos (@smoke)
npm run test:headed       # front-end com o navegador visível
npm run cy:open           # modo interativo
```

Filtros por tag são livres, ex.: `npx cypress run --expose tags="@api and not @produtos"`.

Para rodar contra uma instância local do ServeRest: `npx serverest@latest` e ajuste `API_URL` no `.env`.

### Qualidade do código

```bash
npm run check
```

## Relatórios e evidências

```bash
npm test
npm run report
```

- **Front-end:** print da tela ao final de cada cenário, além do print automático em caso de falha.
- **API:** status e corpo da última resposta anexados a cada cenário.
- **Organização:** camada (API / Front-end) → funcionalidade → cenário, com as tags do Gherkin como filtro, severidade (`@smoke` = crítico) e hooks nomeados.
- **Triagem:** falhas classificadas pela causa provável (ambiente indisponível, pré-condição, quebra de contrato, elemento não encontrado, resultado divergente).
- **Histórico:** execuções locais alimentam o gráfico de tendência e a detecção de testes instáveis.

Também é gerado o relatório HTML do Cucumber em `reports/cucumber-report.html`.

## CI/CD

O workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) roda a cada push e pull request na `main`:

1. **Qualidade:** typecheck, lint e formatação. Se falhar, os testes nem rodam.
2. **Testes:** suítes `api` e `e2e` em paralelo (matriz), no Chrome.
3. **Artefatos:** relatório Allure, relatório Cucumber e screenshots, publicados sempre, inclusive quando há falha.

Também pode ser disparado manualmente em **Actions → CI → Run workflow**, com uma expressão de tags extra (ex.: `@smoke`).

Segurança no pipeline: permissão mínima (`contents: read`), entradas manuais repassadas por variável de ambiente (evita injeção de comandos no shell) e nenhuma credencial necessária.

## Padrão de commits

[Conventional Commits](https://www.conventionalcommits.org/pt-br/): `feat:`, `test:`, `fix:`, `refactor:`, `docs:`, `ci:`, `chore:`.

## Autor

**Temínstoclys C. Pinheiro** — QA Automation Engineer

[![GitHub](https://img.shields.io/badge/GitHub-Teminstoclys--QA-181717?logo=github)](https://github.com/Teminstoclys-QA)
