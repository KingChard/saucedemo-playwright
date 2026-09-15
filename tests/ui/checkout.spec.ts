import { test } from "../../fixtures/pages.fixture";
import { checkoutValidationData } from '../../test-data/checkouts';
import { users, usersWithCheckoutInfo } from "../../test-data/users";
import { products } from "../../test-data/products";

test.describe("Checkout Page Tests", () => {
    test.beforeEach(async ({ loginPage }) => {
        const userData = users.validUser;
        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

    });
    test('CHK-001: Open Checkout Information Page', async ({ productPage, cartPage, checkoutPage }) => {
        const productBackpackName = products.backpack.name;

        await productPage.addProductToCart(productBackpackName);
        await productPage.openCartPage();

        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutInformationPageUrl();
        await checkoutPage.verifyCheckoutInformationPageTitle();
        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.verifyInformationCancelButtonIsDisplayed();
        await checkoutPage.verifyContinueButtonIsDisplayed();
    });

    test.describe('Checkout Information Tests', () => {
        test.beforeEach(async ({ productPage, cartPage }) => {
            const backpackData = products.backpack;

            await productPage.addProductToCart(backpackData.name);
            await productPage.openCartPage();

            await cartPage.proceedToCheckout();

        });

        test('CHK-002: Verify Checkout Information Form Controls', async ({ checkoutPage }) => {
            await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
            await checkoutPage.verifyInformationCancelButtonIsDisplayed();
            await checkoutPage.verifyContinueButtonIsDisplayed();
        });

        test('CHK-003: Continue with Valid Checkout Information', async ({ checkoutPage }) => {
            const userInfo = usersWithCheckoutInfo.user1;

            await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
            await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);
            await checkoutPage.verifyCheckoutOverviewPageUrl();
            await checkoutPage.verifyCheckoutOverviewPageTitle();
        });

        //Parameterized test for checkout
        for (const data of checkoutValidationData) {
            test(`${data.testId}: ${data.testName}`, async ({ checkoutPage }) => {

                await checkoutPage.fillOutCheckoutForm(data.firstname, data.lastname, data.postalCode);

                await checkoutPage.clickContinueButton();

                await checkoutPage.verifyErrorValidationMessage(data.expectedError);

                await checkoutPage.verifyCheckoutInformationPageUrl();
            });
        }

        test('CHK-007: Cancel Checkout from Information Page', async ({ cartPage, checkoutPage }) => {
            const backpackData = products.backpack;

            await checkoutPage.verifyCheckoutInformationPageUrl();
            await checkoutPage.verifyCheckoutInformationPageTitle();
            await checkoutPage.cancelCheckoutInformation();

            await cartPage.verifyCartPageUrl();
            await cartPage.verifyCartPageTitle();
            await cartPage.verifyProductInCart(backpackData.name, backpackData.price, backpackData.description);
        });

        test('CHK-008: Verify Cart Data Persists After Cancelling Checkout', async ({ cartPage, checkoutPage }) => {
            const backpackData = products.backpack;

            await checkoutPage.verifyCheckoutInformationPageUrl();
            await checkoutPage.verifyCheckoutInformationPageTitle();
            await checkoutPage.cancelCheckoutInformation();

            await cartPage.verifyCartPageUrl();
            await cartPage.verifyCartPageTitle();
            await cartPage.verifyCartBadgeCount(1);
            await cartPage.verifyProductInCart(backpackData.name, backpackData.price, backpackData.description);
            await cartPage.verifyProductQuantity(backpackData.name, 1);
        });

    });

    test.describe('Single Product Checkout Overview Tests', () => {
        test.beforeEach(async ({ productPage, cartPage, checkoutPage }) => {
            const productDataBackpack = products.backpack;
            const userInfo = usersWithCheckoutInfo.user1;

            await productPage.addProductToCart(productDataBackpack.name);
            await productPage.openCartPage();

            await cartPage.proceedToCheckout();

            await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);
        });

        test('CHK-009: Verify Checkout Overview Page', async ({ checkoutPage }) => {
            await checkoutPage.verifyCheckoutOverviewPageUrl();
            await checkoutPage.verifyCheckoutOverviewPageTitle();
            await checkoutPage.verifyProductSectionIsDisplayed();
            await checkoutPage.verifyPaymentSectionIsDisplayed();
            await checkoutPage.verifyShippingSectionIsDisplayed();
            await checkoutPage.verifyPriceTotalSectionIsDisplayed();
            await checkoutPage.verifyOverviewCancelButtonIsDisplayed();
            await checkoutPage.verifyFinishButtonIsDisplayed();
        });

        test('CHK-010: Verify Product Data on Checkout Overview', async ({ checkoutPage }) => {
            const productDataBackpack = products.backpack;

            await checkoutPage.verifyCheckoutOverviewPageUrl();
            await checkoutPage.verifyCheckoutOverviewPageTitle();
            await checkoutPage.verifyOverviewProductInformation(productDataBackpack.name, productDataBackpack.description, productDataBackpack.price);
            await checkoutPage.verifyOverviewProductQuantity(1);
            await checkoutPage.verifyOverviewProductCount(1);

        });

        test('CHK-011: Verify Product Quantity on Checkout Overview', async ({ checkoutPage }) => {
            await checkoutPage.verifyCheckoutOverviewPageUrl();
            await checkoutPage.verifyCheckoutOverviewPageTitle();
            await checkoutPage.verifyOverviewProductQuantity(1);
            await checkoutPage.verifyOverviewProductCount(1);
        });

        test('CHK-017: Complete Checkout Successfully', async ({ checkoutPage }) => {
            await checkoutPage.verifyCheckoutOverviewPageUrl();
            await checkoutPage.finishCheckout();

            await checkoutPage.verifyCompletePageUrl();
            await checkoutPage.verifyCompletePageTitle();
        });

        test('CHK-018: Verify Order Confirmation Message', async ({ checkoutPage }) => {
            await checkoutPage.verifyCheckoutOverviewPageUrl();
            await checkoutPage.finishCheckout();

            await checkoutPage.verifyCompletePageUrl();
            await checkoutPage.verifyCompletePageTitle();
            await checkoutPage.verifyCompleteConfirmationMessage();
            await checkoutPage.verifyCompleteBackButtonIsDisplayed();
        });

        test('CHK-019: Return Home After Completed Checkout', async ({ productPage, cartPage, checkoutPage }) => {
            await checkoutPage.verifyCheckoutOverviewPageUrl();
            await checkoutPage.finishCheckout();

            await checkoutPage.verifyCompletePageUrl();
            await checkoutPage.verifyCompletePageTitle();
            await checkoutPage.clickBackHome();

            await productPage.verifyProductPageUrl();
            await productPage.verifyPageTitle();
            await productPage.verifyProductList();
            await productPage.verifyProductCartBadgeIsNotVisible();
            await productPage.openCartPage();

            await cartPage.verifyCartIsEmpty();
        });

    });

    test.describe('Two Product Checkout Overview Tests', () => {
        test.beforeEach(async ({ productPage, cartPage, checkoutPage }) => {
            const productDataBackpack = products.backpack;
            const productDataBikelight = products.bikelight;
            const userInfo = usersWithCheckoutInfo.user1;

            await productPage.addProductToCart(productDataBackpack.name);
            await productPage.addProductToCart(productDataBikelight.name);
            await productPage.openCartPage();

            await cartPage.proceedToCheckout();

            await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);

        });
        test('CHK-013: Verify Multiple Products on Checkout Overview', async ({ checkoutPage }) => {
            const productDataBackpack = products.backpack;
            const productDataBikelight = products.bikelight;

            await checkoutPage.verifyOverviewSpecificProductInformation(productDataBackpack.name, productDataBackpack.description, productDataBackpack.price);
            await checkoutPage.verifyOverviewSpecificProductInformation(productDataBikelight.name, productDataBikelight.description, productDataBikelight.price);
            await checkoutPage.verifyOverviewProductCount(2);
            await checkoutPage.verifyOverviewSpecificProductQuantity(productDataBackpack.name, 1);
            await checkoutPage.verifyOverviewSpecificProductQuantity(productDataBikelight.name, 1);


        });

        test('CHK-015: Verify Tax and Final Total', async ({ checkoutPage }) => {
            await checkoutPage.verifyCheckoutOverviewPageUrl();
            await checkoutPage.verifyPriceTotalSectionIsDisplayed();
            await checkoutPage.verifyCalculatedTotalMatchesDisplayedTotal();
        });

        test('CHK-016: Cancel from Checkout Overview', async ({ productPage, cartPage, checkoutPage }) => {
            const productDataBackpack = products.backpack;
            const productDataBikelight = products.bikelight;

            await checkoutPage.verifyCheckoutOverviewPageUrl();
            await checkoutPage.cancelCheckoutOverview();

            await productPage.verifyProductPageUrl();
            await productPage.verifyPageTitle();
            await productPage.verifyProductCartBadge(2);
            await productPage.openCartPage();

            await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
            await cartPage.verifyProductInCart(productDataBikelight.name, productDataBikelight.price, productDataBikelight.description);
        });
    });

    test('CHK-012: Verify Item Total for Single Product', async ({ productPage, cartPage, checkoutPage }) => {
        const productDataBackpack = products.backpack;
        const userInfo = usersWithCheckoutInfo.user1;

        await productPage.addProductToCart(productDataBackpack.name);
        const productPrice = await productPage.getProductPrice(productDataBackpack.name);

        await productPage.openCartPage();

        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);
        const parseBackpackPrice = checkoutPage.parseProductPrice(productPrice!);



        await checkoutPage.verifyOverviewProductPrice(productPrice!);
        await checkoutPage.verifyIfProductPriceIsMatchToItemTotal(parseBackpackPrice!);
    });



    test('CHK-014: Verify Item Total for Multiple Products', async ({ productPage, cartPage, checkoutPage }) => {
        const productDataBackpack = products.backpack;
        const productDataBikelight = products.bikelight;
        const userInfo = usersWithCheckoutInfo.user1;

        await productPage.addProductToCart(productDataBackpack.name);
        const productBackpackPrice = await productPage.getProductPrice(productDataBackpack.name);
        await productPage.addProductToCart(productDataBikelight.name);
        const productBikelightPrice = await productPage.getProductPrice(productDataBikelight.name);
        await productPage.openCartPage();

        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
        await cartPage.verifyProductInCart(productDataBikelight.name, productDataBikelight.price, productDataBikelight.description);
        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);
        const parseBackpackPrice = checkoutPage.parseProductPrice(productBackpackPrice!);
        const parseBikelightPrice = checkoutPage.parseProductPrice(productBikelightPrice!);
        const expectedItemTotal = checkoutPage.computeItemTotal(parseBackpackPrice, parseBikelightPrice);

        await checkoutPage.verifyIfProductPriceIsMatchToItemTotal(expectedItemTotal);
    });

    test('CHK-020: Complete Checkout with Multiple Products End-to-End', async ({ productPage, cartPage, checkoutPage }) => {
        const productDataBackpack = products.backpack;
        const productDataBikelight = products.bikelight;
        const userInfo = usersWithCheckoutInfo.user1;

        await productPage.addProductToCart(productDataBackpack.name);
        const productBackpackPrice = await productPage.getProductPrice(productDataBackpack.name);
        await productPage.addProductToCart(productDataBikelight.name);
        const productBikelightPrice = await productPage.getProductPrice(productDataBikelight.name);
        await productPage.verifyProductCartBadge(2);
        await productPage.openCartPage();

        await cartPage.verifyCartPageUrl();
        await cartPage.verifyCartPageTitle();
        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
        await cartPage.verifyProductInCart(productDataBikelight.name, productDataBikelight.price, productDataBikelight.description);
        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutInformationPageUrl();
        await checkoutPage.verifyCheckoutInformationPageTitle();
        await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);

        await checkoutPage.verifyCheckoutOverviewPageUrl();
        await checkoutPage.verifyCheckoutOverviewPageTitle();
        await checkoutPage.verifyOverviewSpecificProductInformation(productDataBackpack.name, productDataBackpack.description, productDataBackpack.price);
        await checkoutPage.verifyOverviewSpecificProductInformation(productDataBikelight.name, productDataBikelight.description, productDataBikelight.price);
        const parseBackpackPrice = checkoutPage.parseProductPrice(productBackpackPrice!);
        const parseBikelightPrice = checkoutPage.parseProductPrice(productBikelightPrice!);
        const expectedItemTotal = checkoutPage.computeItemTotal(parseBackpackPrice!, parseBikelightPrice!);
        await checkoutPage.verifyIfProductPriceIsMatchToItemTotal(expectedItemTotal);
        await checkoutPage.verifyOverviewProductCount(2);

        await checkoutPage.verifyCalculatedTotalMatchesDisplayedTotal();
        await checkoutPage.finishCheckout();

        await checkoutPage.verifyCompletePageUrl();
        await checkoutPage.verifyCompletePageTitle();
        await checkoutPage.verifyCompleteConfirmationMessage();
    });
});