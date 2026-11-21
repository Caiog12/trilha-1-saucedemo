# Defesa prática em dupla — 7 minutos

**Apresentação:** Caio Gabriel Gomes Medeiros e Monique Rego

Antes da apresentação, abra no VS Code a pasta interna `trilha-1-saucedemo`, que contém o `package.json`. Rode `npm test` para gerar o relatório com os oito cenários e abra-o com `npm run report`. Use outro terminal na mesma pasta para a demonstração.

| Tempo | Quem apresenta | O que mostrar | Sugestão de fala |
| --- | --- | --- | --- |
| 0:00–1:00 | Caio | Objetivo da trilha | “O projeto usa Playwright para automatizar o que um cliente faria na loja de demonstração, do login até a confirmação da compra.” |
| 1:00–2:30 | Caio | `tests/compra.spec.js` | “Aqui estão os cenários de login, ordenação, carrinho e checkout. No carrinho, verifico os nomes e os preços, removo a mochila e confirmo que sobra um item.” |
| 2:30–4:30 | Monique | Checkout ao vivo | “O Playwright vai abrir a loja, adicionar dois itens, preencher os dados e finalizar a compra. O teste verifica a mensagem de confirmação.” |
| 4:30–6:30 | Monique | Relatório HTML e `REPORT.md` | “Na execução completa, os oito testes passaram. Os testes também confirmaram três comportamentos esperados em entradas inválidas: senha incorreta, primeiro nome vazio e código postal vazio.” Mostre uma das capturas. |
| 6:30–7:00 | Caio | Encerramento | “Cada teste tem seu próprio contexto de navegador. O código usa seletores pelo nome dos botões e pelo atributo de teste, com verificações que aguardam o resultado esperado.” |

## Comando para a demonstração

```powershell
npm test -- --headed --reporter=list -g "checkout com dados válidos"
```

O navegador fecha quando o teste termina. O terminal mostra `1 passed` para esse cenário. O relatório da execução completa já estará aberto para mostrar os oito resultados.
