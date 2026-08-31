import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { users } from "../test-data/users";
import { products } from "../test-data/products";

test.describe("Cart Page test", () => {

    // test('' , async ({ page }) => {
        
    // }),
    test('CT-001: Verify Cart Page Opens Correctly ' , async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const userData = users.validUser;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.gotoProductPage();
        await productPage.openCartPage();

        await cartPage.gotoCartPage();
        await cartPage.verifyCartPageUrl();
        await cartPage.verifyCartPageTitle();
        await cartPage.verifyCheckoutButtonIsDisplayed();
        await cartPage.verifyContinueShoppingButtongIsDisplayed();

    }),

    test('CT-002: Verify Empty Cart ' , async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const userData = users.validUser;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.gotoProductPage();
        await productPage.openCartPage();
        
        await cartPage.verifyCartPageUrl();
        await cartPage.verifyCartPageTitle();
        
        await cartPage.verifyCartIsEmpty();
        await cartPage.verifyContinueShoppingButtonIsDisplayed();
        await cartPage.verifyCheckoutButtonIsDisplayed();
        


    }),

    test('CT-003: Verify Cart Page Controls ' , async ({ page }) => {
        
    }),


    test('CT-004: Verify Single Product in Cart ' , async ({ page }) => {
        
    }),

    test('CT-005: Verify Product Description in Cart ' , async ({ page }) => {
        
    }),

    test('CT-006: Verify Cart Badge Matches Cart Items ' , async ({ page }) => {
        
    }),

    test('CT-007: Add Two Products and Verify Both in Cart ' , async ({ page }) => {
        
    }),

    test('CT-008: Verify Quantity for Multiple Products ' , async ({ page }) => {
        
    }),

    test('CT-009: Remove Single Product from Cart ' , async ({ page }) => {
        
    }),

    test('CT-010: Remove One Product from Multiple Cart Items ' , async ({ page }) => {
        
    }),

    test('CT-011: Remove All Products from Cart ' , async ({ page }) => {
        
    }),

    test('CT-012: Verify Remove Button Belongs to Correct Product ' , async ({ page }) => {
        
    }),


    test('CT-013: Continue Shopping from Empty Cart ' , async ({ page }) => {
        
    }),

    test('CT-014: Continue Shopping with Product in Cart ' , async ({ page }) => {
        
    }),

    test('CT-015: Add Another Product After Continue Shopping ' , async ({ page }) => {
        
    }),

    test('CT-016: Verify Product Name Link from Cart ' , async ({ page }) => {
        
    }),

    test('CT-017: Verify Cart Data Matches Product Listing ' , async ({ page }) => {
        
    }),

    test('CT-018: Verify Cart State After Visiting Product Details ' , async ({ page }) => {
        
    }),

    test('CT-019: Verify Checkout Button Navigation ' , async ({ page }) => {
        
    }),
    
    test('CT-020: Verify Product Remains in Cart Before Checkout ' , async ({ page }) => {
        
    });

});