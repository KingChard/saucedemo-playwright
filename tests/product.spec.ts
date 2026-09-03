import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { users } from "../test-data/users";
import { products } from "../test-data/products";
import { CartPage } from "../pages/CartPage";

test.describe("Product Page Tests", () => {
    test("TC01: Add a specific product to the cart", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const userData = users.validUser;
        const productName = products.backpack.name;
        const productPrice = products.backpack.price;
        const productDescription = products.backpack.description;

        //Login valid credentials
        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);
        console.log("URL:", page.url());
        console.log("Title:", await page.title());
        await productPage.gotoProductPage();
        console.log("Product page loaded");

        //Add specific product to cart
        await productPage.addProductToCart(productName);
        await productPage.verifyProductCartBadge(1); // Verify that the cart badge shows 1 item

        await cartPage.verifyProductInCart(productName, productPrice, productDescription); // Verify that the product is in the cart with the correct name and price

    });

    test("TC02: Add Two product in the cart and after remove the first product", async ({ page }) => {

        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const userData = users.validUser;
        const productNameBackpack = products.backpack.name;
        const productPriceBackpack = products.backpack.price;
        const productNameBikelight = products.bikelight.name;
        const productPriceBikelight = products.bikelight.price;
        const productDescriptionBackpack = products.backpack.description;
        const productDescriptionBikelight = products.bikelight.description;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productNameBackpack);
        await productPage.addProductToCart(productNameBikelight);

        await productPage.verifyProductCartBadge(2);
        await productPage.openCartPage();
        await cartPage.removeProductFromCart(productNameBackpack);
        await cartPage.verifyProductIsRemoved(productNameBackpack);

        await cartPage.verifyProductInCart(productNameBikelight, productPriceBikelight, productDescriptionBikelight);

        await productPage.gotoProductPage();
        await productPage.verifyProductCartBadge(1);


    })

    test("TC03: Sort products by price from low to high", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const userData = users.validUser;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.gotoProductPage();
        await productPage.sortProductsLowToHigh();
        await productPage.verifyProductSortedLowToHigh();
    });

    test("TC04: Sort products by price from high to low", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const userData = users.validUser;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.gotoProductPage();
        await productPage.sortProductsHighToLow();
        await productPage.verifyProductSortedHighToLow();
    });

    test("TC05: Sort products by name from A to Z", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const userData = users.validUser;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.gotoProductPage();
        await productPage.sortProductsNameAToZ();
        await productPage.verifyProductNamesSortedAToZ();
    });

    test("TC06: Sort products by name from Z to A", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const userData = users.validUser;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.gotoProductPage();
        await productPage.sortProductsNameZToA();
        await productPage.verifyProductNamesSortedZToA();
    });
});