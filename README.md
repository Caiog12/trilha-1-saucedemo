# Trilha 1 — Testes E2E Funcionais no SauceDemo

**Autor:** Caio Gabriel Gomes Medeiros

**Apresentação:** Caio Gabriel Gomes Medeiros e Monique Rego.

O projeto automatiza a jornada de compra no [SauceDemo](https://www.saucedemo.com/) com JavaScript e Playwright. Usa as contas públicas de demonstração do próprio site.

## Como executar no Windows

1. Instale o [Node.js](https://nodejs.org/) versão 22 ou superior.
2. Extraia o ZIP. No VS Code, abra a pasta `trilha-1-saucedemo`, que contém o `package.json`.
3. Abra **Terminal → Novo Terminal**. Execute um comando por vez.

```bash
npm ci
npx playwright install chromium
npm test
npm run report
```

O último comando abre o relatório HTML. Se o PowerShell bloquear scripts do npm, selecione **Prompt de Comando** no menu do terminal e rode os mesmos comandos. No Linux, se faltarem bibliotecas do navegador, use `npx playwright install --with-deps chromium` em um ambiente compatível.

Para apresentar a compra com o navegador aberto, feche o relatório com **Ctrl+C** no terminal e execute:

```bash
npm test -- --headed --reporter=list -g "checkout com dados válidos"
```

Para executar só os três casos de borda com captura de tela:

```bash
npm test -- tests/validacoes.spec.js
npm run report
```

## Como o código funciona

| Arquivo | Responsabilidade |
| --- | --- |
| `playwright.config.js` | Define Chromium, endereço do site, seletores `data-test`, relatório HTML e registros de falha. |
| `tests/saucedemo.js` | Reúne os passos repetidos de login, busca de produto, carrinho e início do checkout. |
| `tests/compra.spec.js` | Cobre login válido e bloqueado, as quatro ordenações, carrinho com dois produtos e checkout completo. |
| `tests/validacoes.spec.js` | Cobre senha incorreta e dois campos obrigatórios do checkout. Anexa prints ao relatório quando as verificações passam. |
| `REPORT.md` | Registra os casos de borda com reprodução, resultado e evidência. |
| `.github/workflows/testes.yml` | Executa a suíte no GitHub Actions e guarda o relatório HTML. |

O Playwright fornece uma página nova para cada teste. `getByRole` localiza botões pelo nome visível, `getByPlaceholder` localiza campos e `getByTestId` usa o atributo `data-test` do SauceDemo. As verificações com `expect` aguardam a condição esperada até o limite configurado. No carrinho, por exemplo, o teste localiza a linha da mochila pelo nome, confere o preço, remove a mochila e verifica se a lanterna permaneceu.

## Entrega

A professora autorizou a defesa em dupla com Caio Gabriel Gomes Medeiros e Monique Rego.

Publique os arquivos de projeto em um único repositório público no GitHub. Envie pelo portal o link, a trilha e a identificação acordada com a professora. A pasta de evidências faz parte da entrega. As pastas geradas pelo npm e pelo Playwright são ignoradas pelo Git. O roteiro da defesa está em [APRESENTACAO.md](APRESENTACAO.md).
