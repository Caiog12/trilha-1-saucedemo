const { test, expect } = require('@playwright/test');
const { produto, entrar, item, adicionarDoisProdutos, iniciarCheckout } = require('./saucedemo');

test('login válido abre o catálogo', async ({ page }) => {
  await entrar(page);
  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.getByTestId('title')).toHaveText('Products');
  await expect(item(page, produto.mochila)).toBeVisible();
});

test('usuário bloqueado recebe mensagem e fica na tela de login', async ({ page }) => {
  await entrar(page, 'locked_out_user');
  await expect(page.getByTestId('error')).toContainText('this user has been locked out');
  await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();
});

test('catálogo ordena todos os produtos por nome e por preço', async ({ page }) => {
  await entrar(page);
  const ordem = page.getByTestId('product-sort-container');
  const nomes = page.getByTestId('inventory-item-name');
  const precos = page.getByTestId('inventory-item-price');
  await expect(nomes.first()).toBeVisible();

  const nomesIniciais = await nomes.allTextContents();
  expect(nomesIniciais.length).toBeGreaterThan(1);
  const precosIniciais = await precos.allTextContents();
  const compararPrecos = (a, b) => Number(a.slice(1)) - Number(b.slice(1));

  await ordem.selectOption('az');
  await expect(nomes).toHaveText([...nomesIniciais].sort());
  await ordem.selectOption('za');
  await expect(nomes).toHaveText([...nomesIniciais].sort().reverse());
  await ordem.selectOption('lohi');
  await expect(precos).toHaveText([...precosIniciais].sort(compararPrecos));
  await ordem.selectOption('hilo');
  await expect(precos).toHaveText([...precosIniciais].sort(compararPrecos).reverse());
});

test('carrinho mantém nomes e preços e atualiza a contagem após remover', async ({ page }) => {
  await entrar(page);
  await adicionarDoisProdutos(page);

  await expect(page.getByTestId('inventory-item')).toHaveCount(2);
  const mochila = item(page, produto.mochila);
  const lanterna = item(page, produto.lanterna);
  await expect(mochila.getByTestId('inventory-item-price')).toHaveText('$29.99');
  await expect(lanterna.getByTestId('inventory-item-price')).toHaveText('$9.99');

  await mochila.getByRole('button', { name: 'Remove', exact: true }).click();
  await expect(mochila).toHaveCount(0);
  await expect(lanterna).toBeVisible();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
});

test('checkout com dados válidos confirma a compra', async ({ page }) => {
  await entrar(page);
  await iniciarCheckout(page);

  await page.getByPlaceholder('First Name').fill('Caio');
  await page.getByPlaceholder('Last Name').fill('Teste');
  await page.getByPlaceholder('Zip/Postal Code').fill('50000');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();

  await expect(page.getByTestId('title')).toHaveText('Checkout: Overview');
  await expect(item(page, produto.mochila)).toBeVisible();
  await expect(item(page, produto.lanterna)).toBeVisible();
  await expect(page.getByTestId('subtotal-label')).toHaveText('Item total: $39.98');
  await page.getByRole('button', { name: 'Finish', exact: true }).click();
  await expect(page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
  await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);
});
