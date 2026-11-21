# Relatório técnico — Trilha 1

**Autor:** Caio Gabriel Gomes Medeiros

**Apresentação:** Caio Gabriel Gomes Medeiros e Monique Rego

**Aplicação:** SauceDemo. **Tipo:** Testes E2E funcionais. **Ferramenta:** Playwright com Chromium.

## [ID-01] Senha inválida é rejeitada

- **Trilha / Tipo:** E2E / autenticação negativa.
- **Severidade:** Média se a validação regredir.
- **Referência técnica:** Formulário de login.
- **Passos para reproduzir:** Abra o SauceDemo, digite `standard_user` e uma senha incorreta e clique em **Login**.
- **Resultado esperado:** Exibir o erro de credenciais inválidas e permanecer na tela de login.
- **Resultado atual e evidência:** Consulte o quadro de execução abaixo.

## [ID-02] Checkout exige o primeiro nome

- **Trilha / Tipo:** E2E / campo obrigatório.
- **Severidade:** Média se a validação regredir.
- **Referência técnica:** `checkout-step-one.html`.
- **Passos para reproduzir:** Entre com `standard_user` / `secret_sauce`, adicione dois itens e abra **Cart → Checkout**. Preencha **Last Name** e **Zip/Postal Code**, deixe **First Name** vazio e clique em **Continue**.
- **Resultado esperado:** Exibir `First Name is required` e permanecer no formulário.
- **Resultado atual e evidência:** Consulte o quadro de execução abaixo.

## [ID-03] Checkout exige o código postal

- **Trilha / Tipo:** E2E / campo obrigatório.
- **Severidade:** Média se a validação regredir.
- **Referência técnica:** `checkout-step-one.html`.
- **Passos para reproduzir:** Repita a compra com dois itens, preencha **First Name** e **Last Name**, deixe **Zip/Postal Code** vazio e clique em **Continue**.
- **Resultado esperado:** Exibir `Postal Code is required` e permanecer no formulário.
- **Resultado atual e evidência:** Consulte o quadro de execução abaixo.

## Resultado atual e evidências

| ID | Comportamento observado em 21/11/2026 | Evidência |
| --- | --- | --- |
| ID-01 | O login permaneceu na tela inicial e mostrou `Username and password do not match`. | [Captura do login](evidencias/ID-01.png) |
| ID-02 | O checkout permaneceu no formulário e mostrou `First Name is required`. | [Captura do primeiro nome](evidencias/ID-02.png) |
| ID-03 | O checkout permaneceu no formulário e mostrou `Postal Code is required`. | [Captura do código postal](evidencias/ID-03.png) |

Os três achados são casos negativos e de borda com comportamento esperado confirmado. O [log da execução](evidencias/execucao.txt) registra os oito cenários aprovados contra o site público. Na nuvem, o Chromium alternativo encerrou ao tentar abrir um segundo contexto na execução agrupada. As evidências finais foram coletadas em oito processos isolados, um por cenário. A configuração entregue usa o Chromium padrão instalado pelo Playwright.


## Validação no Windows

Caio Gabriel Gomes Medeiros relatou que a execução agrupada com `npm test` terminou com **8 testes aprovados** e que o relatório HTML abriu no navegador. O terminal também registrou **1 teste aprovado** ao executar separadamente a demonstração do checkout com navegador visível. As capturas e o log vinculados acima são da execução na nuvem.
