import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('standard_user', 'secret_sauce');
});

test('add and remove items updates the cart badge', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.addToCart('sauce-labs-backpack');
  await inventory.addToCart('sauce-labs-bike-light');
  await expect(inventory.cartBadge).toHaveText('2');
  await inventory.removeFromCart('sauce-labs-backpack');
  await expect(inventory.cartBadge).toHaveText('1');
});

test('sort by price low to high', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.sortBy('lohi');
  const prices = await inventory.prices();
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

test('complete checkout flow @smoke', async ({ page }) => {
  const inventory = new InventoryPage(page);
  const checkout = new CheckoutPage(page);
  await inventory.addToCart('sauce-labs-onesie');
  await inventory.openCart();
  await checkout.start();
  await checkout.fillInfo('Test', 'User', '71000');
  await checkout.finish();
  await checkout.expectComplete();
});
