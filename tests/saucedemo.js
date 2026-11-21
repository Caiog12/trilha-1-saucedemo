const { expect } = require('@playwright/test');

const produto = {
  mochila: 'Sauce Labs Backpack',
  lanterna: 'Sauce Labs Bike Light',
};

async function entrar(page, usuario = 'standard_user', senha = 'secret_sauce') {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(usuario);
  await page.getByPlaceholder('Password').fill(senha);
  await page.getByRole('button', { name: 'Login', exact: true }).click();
}

function item(page, nome) {
  return page.getByTestId('inventory-item').filter({
    has: page.getByText(nome, { exact: true }),
  });
}

async function adicionarDoisProdutos(page) {
  for (const nome of Object.values(produto)) {
    await item(page, nome).getByRole('button', { name: 'Add to cart' }).click();
  }

  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');
  await page.getByTestId('shopping-cart-link').click();
  await expect(page.getByTestId('title')).toHaveText('Your Cart');
}

async function iniciarCheckout(page) {
  await adicionarDoisProdutos(page);
  await page.getByRole('button', { name: 'Checkout', exact: true }).click();
}

module.exports = { produto, entrar, item, adicionarDoisProdutos, iniciarCheckout };
