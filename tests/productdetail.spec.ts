import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { users } from "../test-data/users";
import { products } from "../test-data/products";
import { CartPage } from "../pages/CartPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";

test.describe("Product Details Page Tests", () => {
    test("PDT-001: Open a specific product's details", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const productDetailsPage = new ProductDetailsPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;
        const productPrice = products.backpack.price;
        const productDescription = products.backpack.description;

        await loginPage.login(userData.username, userData.password);
        await productPage.gotoProductPage();
        await productPage.openProductDetails(productName);
        await productDetailsPage.verifyProductDetails(productName, productPrice, productDescription);
    });
});