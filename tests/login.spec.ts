import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// Public demo credentials published on saucedemo.com
const PASSWORD = 'secret_sauce';

test.describe('Login', () => {
  test('standard user can log in @smoke', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', PASSWORD);
    await new InventoryPage(page).expectLoaded();
  });

  test('locked out user sees an error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', PASSWORD);
    await login.expectError('Sorry, this user has been locked out.');
  });

  const invalid = [
    { user: '', pass: '', msg: 'Username is required' },
    { user: 'standard_user', pass: '', msg: 'Password is required' },
    { user: 'wrong_user', pass: 'wrong_pass', msg: 'Username and password do not match' },
  ];

  for (const { user, pass, msg } of invalid) {
    test(`validation: "${msg}"`, async ({ page }) => {
      const login = new LoginPage(page);
      await login.goto();
      await login.login(user, pass);
      await login.expectError(msg);
    });
  }
});
