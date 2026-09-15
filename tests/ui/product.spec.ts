import { test } from "../../fixtures/pages.fixture";
import { users } from "../../test-data/users";
import { productData, productSorting } from "../../test-data/products";

test.describe("Product Page Tests", () => {
    test.beforeEach(async ({ loginPage }) => {
        const userData = users.validUser;
        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

    });

    for (const data of productData) {
        test(`${data.testId}: ${data.testName}`, async ({ productPage, cartPage }) => {

            //Add specific product to cart
            await productPage.addProductToCart(data.name);
            await productPage.verifyProductCartBadge(1); // Verify that the cart badge shows 1 item
            await productPage.openCartPage();

            await cartPage.verifyCartPageUrl(); // Verify that the cart page URL is correct
            await cartPage.verifyCartPageTitle();
            await cartPage.verifyProductInCart(data.name, data.price, data.description); // Verify that the product is in the cart with the correct name and price
        });
    }

    for (const data of productSorting) {
        test(`${data.testId}: ${data.testName}`, async ({ productPage }) => {

            await productPage.sortProducts(data.sortOption);
            if (data.sortBy === 'name') {
                await productPage.verifyProductNamesSorted(data.expectedOrder);
            } else if (data.sortBy === 'price') {
                await productPage.verifyProductPricesSorted(data.expectedOrder);
            }
        });
    }
});