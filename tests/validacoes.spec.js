const { test, expect } = require('@playwright/test');
const { entrar, iniciarCheckout } = require('./saucedemo');

test('ID-01 — senha inválida impede o login', async ({ page }, testInfo) => {
  await entrar(page, 'standard_user', 'senha-incorreta');
  await expect(page.getByTestId('error')).toContainText(
    'Username and password do not match',
  );
  await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();
  await testInfo.attach('ID-01', { body: await page.screenshot(), contentType: 'image/png' });
});

for (const { id, campo, mensagem } of [
  { id: 'ID-02', campo: 'First Name', mensagem: 'First Name is required' },
  { id: 'ID-03', campo: 'Zip/Postal Code', mensagem: 'Postal Code is required' },
]) {
  test(`${id} — checkout exige ${campo}`, async ({ page }, testInfo) => {
    await entrar(page);
    await iniciarCheckout(page);

    await page.getByPlaceholder('First Name').fill('Nome');
    await page.getByPlaceholder('Last Name').fill('Teste');
    await page.getByPlaceholder('Zip/Postal Code').fill('50000');
    await page.getByPlaceholder(campo).clear();
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    await expect(page.getByTestId('error')).toContainText(mensagem);
    await expect(page.getByTestId('title')).toHaveText('Checkout: Your Information');
    await testInfo.attach(id, { body: await page.screenshot(), contentType: 'image/png' });
  });
}
