import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { users, usersWithCheckoutInfo } from "../test-data/users";
import { products } from "../test-data/products";

test.describe("Checkout Page Test", () => {
    test('CHK-001: Open Checkout Information Page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productBackpackName = products.backpack.name;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productBackpackName);
        await productPage.openCartPage();

        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutInformationPageUrl();
        await checkoutPage.verifyCheckoutInformationPageTitle();
        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.verifyInformationCancelButtonIsDisplayed();
        await checkoutPage.verifyContinueButtonIsDisplayed();
    });

    test('CHK-002: Verify Checkout Information Form Controls', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productBackpackName = products.backpack.name;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productBackpackName);
        await productPage.openCartPage();

        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.verifyInformationCancelButtonIsDisplayed();
        await checkoutPage.verifyContinueButtonIsDisplayed();
    });

    test('CHK-003: Continue with Valid Checkout Information', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
        const userInfo = usersWithCheckoutInfo.user1;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productDataBackpack.name);
        await productPage.openCartPage();

        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);
        await checkoutPage.verifyCheckoutOverviewPageUrl();
        await checkoutPage.verifyCheckoutOverviewPageTitle();
    });

    test('CHK-004: Verify First Name is Required', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
        const userInfo = usersWithCheckoutInfo.user1;
		
		await loginPage.gotoLoginPage();
		await loginPage.login(userData.username, userData.password);
		
		await productPage.addProductToCart(productDataBackpack.name);
		await productPage.openCartPage();
		
		await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
		await cartPage.proceedToCheckout();
		
		await checkoutPage.fillOutCheckoutForm("", userInfo.lastname, userInfo.postalCode);
        await checkoutPage.clickContiueButton();
        await checkoutPage.verifyErrorValidationMessage('Error: First Name is required');
		await checkoutPage.verifyCheckoutInformationPageUrl();
    });

    test('CHK-005: Verify Last Name is Required', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
        const userInfo = usersWithCheckoutInfo.user1;
		
		await loginPage.gotoLoginPage();
		await loginPage.login(userData.username, userData.password);
		
		await productPage.addProductToCart(productDataBackpack.name);
		await productPage.openCartPage();
		
		await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
		await cartPage.proceedToCheckout();
		
		await checkoutPage.fillOutCheckoutForm(userInfo.firstname, "", userInfo.postalCode);
        await checkoutPage.clickContiueButton();
        await checkoutPage.verifyErrorValidationMessage('Error: Last Name is required');
		await checkoutPage.verifyCheckoutInformationPageUrl();
    });

    test('CHK-006: Verify Postal Code is Required', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
        const userInfo = usersWithCheckoutInfo.user1;
		
		await loginPage.gotoLoginPage();
		await loginPage.login(userData.username, userData.password);
		
		await productPage.addProductToCart(productDataBackpack.name);
		await productPage.openCartPage();
		
		await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
		await cartPage.proceedToCheckout();
		
		await checkoutPage.fillOutCheckoutForm(userInfo.firstname, userInfo.lastname, "");
        await checkoutPage.clickContiueButton();
        await checkoutPage.verifyErrorValidationMessage('Error: Postal Code is required');
		await checkoutPage.verifyCheckoutInformationPageUrl();
    });

    test('CHK-007: Cancel Checkout from Information Page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
		
		await loginPage.gotoLoginPage();
		await loginPage.login(userData.username, userData.password);
		
		await productPage.addProductToCart(productDataBackpack.name);
		await productPage.openCartPage();
		
		await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
		await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutInformationPageUrl();
        await checkoutPage.verifyCheckoutInformationPageTitle();
        await checkoutPage.cancelCheckoutInformation();

        await cartPage.verifyCartPageUrl();
        await cartPage.verifyCartPageTitle();
        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
    });

    test('CHK-008: Verify Cart Data Persists After Cancelling Checkout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
		
		await loginPage.gotoLoginPage();
		await loginPage.login(userData.username, userData.password);
		
		await productPage.addProductToCart(productDataBackpack.name);
		await productPage.openCartPage();
		
		await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
		await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutInformationPageUrl();
        await checkoutPage.verifyCheckoutInformationPageTitle();
        await checkoutPage.cancelCheckoutInformation();

        await cartPage.verifyCartPageUrl();
        await cartPage.verifyCartPageTitle();
        await cartPage.verifyCartBadgeCount(1);
        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
        await cartPage.verifyProductQuantity(productDataBackpack.name, 1);
    });

    test('CHK-009: Verify Checkout Overview Page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
        const userInfo = usersWithCheckoutInfo.user1;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productDataBackpack.name);
        await productPage.openCartPage();

        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);

        await checkoutPage.verifyCheckoutOverviewPageUrl();
        await checkoutPage.verifyCheckoutOverviewPageTitle();
        await checkoutPage.verifyProductSectionIsDisplayed();
        await checkoutPage.verifyPaymentSectionIsDisplayed();
        await checkoutPage.verifyShippingSectionIsDisplayed();
        await checkoutPage.verifyPriceTotalSectionIsDisplayed();
        await checkoutPage.verifyOverviewCancelButtonIsDisplayed();
        await checkoutPage.verifyFinishButtonIsDisplayed();
    });

    test('CHK-010: Verify Product Data on Checkout Overview', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
        const userInfo = usersWithCheckoutInfo.user1;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productDataBackpack.name);
        await productPage.openCartPage();

        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);

        await checkoutPage.verifyCheckoutOverviewPageUrl();
        await checkoutPage.verifyCheckoutOverviewPageTitle();
        await checkoutPage.verifyOverviewProductInformation(productDataBackpack.name, productDataBackpack.description, productDataBackpack.price);
        await checkoutPage.verifyOverviewProductQuantity(1);
        await checkoutPage.verifyOverviewProductCount(1);

    });

    test('CHK-011: Verify Product Quantity on Checkout Overview', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
        const userInfo = usersWithCheckoutInfo.user1;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productDataBackpack.name);
        await productPage.openCartPage();

        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);

        await checkoutPage.verifyCheckoutOverviewPageUrl();
        await checkoutPage.verifyCheckoutOverviewPageTitle();
        await checkoutPage.verifyOverviewProductQuantity(1);
        await checkoutPage.verifyOverviewProductCount(1);
    });

    test('CHK-012: Verify Item Total for Single Product', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
        const userInfo = usersWithCheckoutInfo.user1;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productDataBackpack.name);
        const productPrice = await productPage.getProductPrice(productDataBackpack.name);
        await productPage.openCartPage();

        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);


        await checkoutPage.verifyOverviewProductPrice(productPrice!);
        await checkoutPage.verifyIfProductPriceIsMatchToItemTotal(productPrice!);
    });

    test('CHK-013: Verify Multiple Products on Checkout Overview', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
        const productDataBikelight = products.bikelight;
        const userInfo = usersWithCheckoutInfo.user1;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productDataBackpack.name);
        await productPage.addProductToCart(productDataBikelight.name);
        await productPage.openCartPage();
        

        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
        await cartPage.verifyProductInCart(productDataBikelight.name, productDataBikelight.price, productDataBikelight.description);
        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);

        await checkoutPage.verifyOverviewSpecificProductInformation(productDataBackpack.name, productDataBackpack.description, productDataBackpack.price);
        await checkoutPage.verifyOverviewSpecificProductInformation(productDataBikelight.name, productDataBikelight.description, productDataBikelight.price);
        await checkoutPage.verifyOverviewProductCount(2);
        await checkoutPage.verifyOverviewSpecificProductQuantity(productDataBackpack.name, 1);
        await checkoutPage.verifyOverviewSpecificProductQuantity(productDataBikelight.name, 1);


    });

    test('CHK-014: Verify Item Total for Multiple Products', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
        const productDataBikelight = products.bikelight;
        const userInfo = usersWithCheckoutInfo.user1;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productDataBackpack.name);
        const productBackpackPrice = await productPage.getProductPrice(productDataBackpack.name);
        await productPage.addProductToCart(productDataBikelight.name);
        const productBikelightPrice = await productPage.getProductPrice(productDataBikelight.name);
        console.log(productBackpackPrice+" "+ productBikelightPrice);
        await productPage.openCartPage();

        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
        await cartPage.verifyProductInCart(productDataBikelight.name, productDataBikelight.price, productDataBikelight.description);
        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);
        const expectedItemTotal = await checkoutPage.computeItemTotal(productBackpackPrice!, productBikelightPrice!);
        console.log(expectedItemTotal);

        await checkoutPage.verifyIfProductPriceIsMatchToItemTotal(expectedItemTotal);
    });

    test('CHK-015: Verify Tax and Final Total', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
        const productDataBikelight = products.bikelight;
        const userInfo = usersWithCheckoutInfo.user1;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productDataBackpack.name);
        await productPage.addProductToCart(productDataBikelight.name);
        await productPage.openCartPage();
        

        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
        await cartPage.verifyProductInCart(productDataBikelight.name, productDataBikelight.price, productDataBikelight.description);
        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);

        await checkoutPage.verifyCheckoutOverviewPageUrl();
        await checkoutPage.verifyPriceTotalSectionIsDisplayed();
        const itemTotalValue = await checkoutPage.getExtractedItemValue();
        const taxValue = await checkoutPage.getExtractedTaxValue();
        console.log(itemTotalValue + " " + taxValue);
        
        const computedValue = await checkoutPage.computeItemTotal(itemTotalValue!,taxValue!);
        await checkoutPage.verifyIfCalculatedPriceTotalIsMatchToDisplayedPriceTotal(computedValue);
    });

    test('CHK-016: Cancel from Checkout Overview', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
        const productDataBikelight = products.bikelight;
        const userInfo = usersWithCheckoutInfo.user1;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productDataBackpack.name);
        await productPage.addProductToCart(productDataBikelight.name);
        await productPage.openCartPage();
        

        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
        await cartPage.verifyProductInCart(productDataBikelight.name, productDataBikelight.price, productDataBikelight.description);
        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);

        await checkoutPage.verifyCheckoutOverviewPageUrl();
        await checkoutPage.cancelCheckoutOverview();

        await productPage.verifyProductPageUrl();
        await productPage.verifyPageTitle();
        await productPage.verifyProductCartBadge(2);
        await productPage.openCartPage();

        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
        await cartPage.verifyProductInCart(productDataBikelight.name, productDataBikelight.price, productDataBikelight.description);
    });

    test('CHK-017: Complete Checkout Successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
        const userInfo = usersWithCheckoutInfo.user1;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productDataBackpack.name);
        await productPage.openCartPage();
        

        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);

        await checkoutPage.verifyCheckoutOverviewPageUrl();
        await checkoutPage.finishCheckout();

        await checkoutPage.verifyCompletePageUrl();
        await checkoutPage.verifyCompletePageTitle();
    });

    test('CHK-018: Verify Order Confirmation Message', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
        const userInfo = usersWithCheckoutInfo.user1;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productDataBackpack.name);
        await productPage.openCartPage();
        

        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);

        await checkoutPage.verifyCheckoutOverviewPageUrl();
        await checkoutPage.finishCheckout();

        await checkoutPage.verifyCompletePageUrl();
        await checkoutPage.verifyCompletePageTitle();
        await checkoutPage.verifyCompleteConfirmationMessage();
        await checkoutPage.verifyCompleteBackButtonIsDisplayed();
    });

    test('CHK-019: Return Home After Completed Checkout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
        const userInfo = usersWithCheckoutInfo.user1;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

        await productPage.addProductToCart(productDataBackpack.name);
        await productPage.openCartPage();
        

        await cartPage.verifyProductInCart(productDataBackpack.name, productDataBackpack.price, productDataBackpack.description);
        await cartPage.proceedToCheckout();

        await checkoutPage.verifyCheckoutFormFieldsAreDisplayed();
        await checkoutPage.fillOutCheckoutFormAndContinue(userInfo.firstname, userInfo.lastname, userInfo.postalCode);

        await checkoutPage.verifyCheckoutOverviewPageUrl();
        await checkoutPage.finishCheckout();

        await checkoutPage.verifyCompletePageUrl();
        await checkoutPage.verifyCompletePageTitle();
        await checkoutPage.clickBackHome();

        await productPage.verifyProductPageUrl();
        await productPage.verifyPageTitle();
        await productPage.verifyProductList();
        await productPage.verifyProductCartBadgeIsNotVisible();
    });

    test('CHK-020: Complete Checkout with Multiple Products End-to-End', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const userData = users.validUser;
        const productDataBackpack = products.backpack;
        const productDataBikelight = products.bikelight;
        const userInfo = usersWithCheckoutInfo.user1;

        await loginPage.gotoLoginPage();
        await loginPage.login(userData.username, userData.password);

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
        await checkoutPage.verifyOverviewSpecificProductInformation(productDataBackpack.name,productDataBackpack.description, productDataBackpack.price);
        await checkoutPage.verifyOverviewSpecificProductInformation(productDataBikelight.name, productDataBikelight.description, productDataBikelight.price);
        const expectedItemTotal = await checkoutPage.computeItemTotal(productBackpackPrice!, productBikelightPrice!);
        await checkoutPage.verifyIfProductPriceIsMatchToItemTotal(expectedItemTotal);
        await checkoutPage.verifyOverviewProductCount(2);
        const itemTotalValue = await checkoutPage.getExtractedItemValue();
        const taxValue = await checkoutPage.getExtractedTaxValue();
        console.log(itemTotalValue + " " + taxValue);
        
        const computedValue = await checkoutPage.computeItemTotal(itemTotalValue!,taxValue!);
        await checkoutPage.verifyIfCalculatedPriceTotalIsMatchToDisplayedPriceTotal(computedValue);
        await checkoutPage.finishCheckout();

        await checkoutPage.verifyCompletePageUrl();
        await checkoutPage.verifyCompletePageTitle();
        await checkoutPage.verifyCompleteConfirmationMessage();
    });
});