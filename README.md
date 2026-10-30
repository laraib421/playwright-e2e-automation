# 🎭 Playwright E2E Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![CI](https://github.com/laraib421/playwright-e2e-automation/actions/workflows/playwright.yml/badge.svg)

End-to-end UI test automation for the [Sauce Demo](https://www.saucedemo.com) e-commerce app, built with **Playwright + TypeScript** using the **Page Object Model**.

## ✨ Features
- 🧱 Page Object Model (`pages/`) for clean, reusable tests
- 🌐 Cross-browser: Chromium, Firefox + mobile (Pixel 7) emulation
- 🔁 Data-driven negative login tests
- 📸 Screenshots, videos & traces on failure
- 🤖 GitHub Actions CI with HTML report artifact

## 🧪 Test Coverage
| Area | Scenarios |
|---|---|
| Login | valid login, locked-out user, empty fields, wrong credentials |
| Cart | add/remove items, badge count |
| Sorting | price low → high |
| Checkout | full purchase flow |

## 🚀 Run Locally
```bash
npm install
npx playwright install
npm test              # all browsers
npm run test:chrome   # chromium only
npm run report        # open HTML report
```

## 📁 Structure
```
pages/       Page objects (LoginPage, InventoryPage, CheckoutPage)
tests/       Spec files
.github/     CI workflow
```
