# SauceDemo Playwright Automation

## Overview

This is a web automation testing project built using Playwright and TypeScript for the SauceDemo application.

The project demonstrates my hands-on experience in designing and maintaining a structured test automation framework using the Page Object Model (POM). It includes reusable page objects, custom fixtures, centralized test data, parameterized tests, hooks, UI validations, and end-to-end test scenarios across major SauceDemo modules.

The framework also includes automated test reporting, screenshots, videos, and traces for test failures, as well as CI integration through GitHub Actions to automatically execute the test suite when changes are pushed to the repository.

## Tech Stack

- **Playwright** — browser automation and test execution
- **TypeScript** — programming language used for the automation framework
- **Node.js** — JavaScript runtime environment
- **Git** — source control and local version management
- **GitHub** — repository hosting and project version control
- **GitHub Actions** — CI pipeline for automated test execution
- **HTML Reporter** — Playwright test execution reporting
- **Trace Viewer** — debugging failed and retried tests

## Project Structure

The project follows the Page Object Model (POM) design pattern to separate test logic from page-specific locators and actions. This improves maintainability, reduces duplicated code, and allows reusable methods to be shared across multiple test scenarios.

```text
saucedemo-playwright/
│
├── .github/
│   └── workflows/
│       └── playwright.yml       # GitHub Actions CI workflow
│
├── fixtures/
│   └── pages.fixture.ts         # Custom fixtures for initializing Page Objects
│
├── pages/
│   ├── LoginPage.ts             # Login page locators, actions, and validations
│   ├── ProductPage.ts           # Products page functionality
│   ├── ProductDetailsPage.ts    # Product details functionality
│   ├── CartPage.ts              # Shopping cart functionality
│   └── CheckoutPage.ts          # Checkout workflow functionality
│
├── test-data/
│   ├── users.ts                 # User credentials and checkout information
│   ├── products.ts              # Product information and sorting data
│   ├── productdetail.ts         # Product details test data
│   ├── checkouts.ts             # Checkout validation data
│   └── login.ts                 # Login validation data
│
├── tests/
│   └── ui/
│       ├── login.spec.ts        # Login test scenarios
│       ├── product.spec.ts      # Product page test scenarios
│       ├── productdetail.spec.ts# Product details test scenarios
│       ├── cart.spec.ts         # Cart test scenarios
│       └── checkout.spec.ts     # Checkout test scenarios
│
├── playwright.config.ts         # Playwright configuration
├── package.json                 # Dependencies, scripts, and Node configuration
├── package-lock.json            # Locked dependency versions
└── .gitignore                   # Files excluded from Git tracking
```

## Installation & Setup

### Prerequisites

Before running the project, make sure the following are installed:

- Node.js 24.x
- npm
- Git

### Clone the Repository

```bash
git clone https://github.com/KingChard/saucedemo-playwright.git
cd saucedemo-playwright
```
