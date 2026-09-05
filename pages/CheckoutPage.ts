import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly informationPageTitle: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator
    readonly informationCancelButton: Locator;
    readonly errorMessage: Locator;
    
    readonly overviewPageTitle: Locator;
    readonly overviewProductList: Locator;
    readonly overviewProductName: Locator;
    readonly overviewProductDesc: Locator;
    readonly overviewProductPrice: Locator;
    readonly overviewProductQuantity: Locator;
    readonly overviewPaymentSectionLabel: Locator;
    readonly overviewPaymentSectionValue: Locator;
    readonly overviewShippingSectionLabel: Locator;
    readonly overviewShippingSectionValue: Locator;
    readonly overviewPriceTotalSectionLabel: Locator;
    readonly overviewPriceSubTotal: Locator;
    readonly overviewPriceTax: Locator
    readonly overviewPriceTotal: Locator;
    readonly overviewCancelButton: Locator;
    readonly finishButton: Locator;
    
    readonly completePageTitle: Locator;
    readonly completeHeading: Locator;
    readonly completeMessage: Locator;
    readonly completeBackButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.informationPageTitle = page.getByTestId('title');
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.informationCancelButton = page.getByRole('button', { name: 'Cancel' });
        this.errorMessage = page.getByTestId('error');

        this.overviewPageTitle = page.getByTestId('title');
        this.overviewProductList = page.getByTestId('inventory-item');
        this.overviewProductName = page.getByTestId('inventory-item-name');
        this.overviewProductDesc = page.getByTestId('inventory-item-desc');
        this.overviewProductPrice = page.getByTestId('inventory-item-price');
        this.overviewProductQuantity = page.getByTestId('item-quantity');
        this.overviewPaymentSectionLabel = page.getByTestId('payment-info-label');
        this.overviewPaymentSectionValue = page.getByTestId('payment-info-value');
        this.overviewShippingSectionLabel = page.getByTestId('shipping-info-label');
        this.overviewShippingSectionValue = page.getByTestId('shipping-info-value');
        this.overviewPriceTotalSectionLabel = page.getByTestId('total-info-label');
        this.overviewPriceSubTotal = page.getByTestId('subtotal-label');
        this.overviewPriceTax = page.getByTestId('tax-label');
        this.overviewPriceTotal = page.getByTestId('total-label');
        this.overviewCancelButton = page.getByRole('button', { name: 'Cancel'});
        this.finishButton = page.getByRole('button', { name: 'Finish'});

        this.completePageTitle = page.getByTestId("title");
        this.completeHeading = page.getByTestId('complete-header');
        this.completeMessage = page.getByTestId('complete-text');
        this.completeBackButton = page.getByRole('button', {name: 'Back Home'});
    }

    async verifyCheckoutInformationPageUrl() {
        await expect(this.page).toHaveURL('/checkout-step-one.html');
    }

    async verifyCheckoutInformationPageTitle() {
        await expect(this.informationPageTitle).toHaveText('Checkout: Your Information');
    }

    async verifyCheckoutFormFieldsAreDisplayed() {
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.firstNameInput).toBeEditable();

        await expect(this.lastNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeEditable();

        await expect(this.postalCodeInput).toBeVisible();
        await expect(this.postalCodeInput).toBeEditable();
    }

    async verifyInformationCancelButtonIsDisplayed() {
        await expect(this.informationCancelButton).toBeVisible();
        await expect(this.informationCancelButton).toBeEnabled();
    }

    async verifyContinueButtonIsDisplayed() {
        await expect(this.continueButton).toBeVisible();
        await expect(this.continueButton).toBeEnabled();
    }

    async fillOutCheckoutFormAndContinue(firstname: string, lastname: string, postalCode: string){
        await this.firstNameInput.fill(firstname);
        await this.lastNameInput.fill(lastname);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }
    async verifyCheckoutOverviewPageUrl() {
        await expect(this.page).toHaveURL('/checkout-step-two.html');
    }

    async verifyCheckoutOverviewPageTitle() {
        await expect(this.overviewPageTitle).toHaveText('Checkout: Overview');
    }

    async cancelCheckoutInformation() {
        await this.informationCancelButton.click();
    }

    async verifyProductSectionIsDisplayed(){
        await expect(this.overviewProductName).toBeVisible();
        await expect(this.overviewProductDesc).toBeVisible();
        await expect(this.overviewProductPrice).toBeVisible();
        await expect(this.overviewProductQuantity).toBeVisible();
    }

    async verifyPaymentSectionIsDisplayed(){
        await expect(this.overviewPaymentSectionLabel).toBeVisible();
        await expect(this.overviewPaymentSectionValue).toBeVisible();
    }

    async verifyShippingSectionIsDisplayed(){
        await expect(this.overviewShippingSectionLabel).toBeVisible();
        await expect(this.overviewShippingSectionValue).toBeVisible();
    }

    async verifyPriceTotalSectionIsDisplayed(){
        await expect(this.overviewPriceTotalSectionLabel).toBeVisible();
        await expect(this.overviewPriceSubTotal).toBeVisible();
        await expect(this.overviewPriceTax).toBeVisible();
        await expect(this.overviewPriceTotal).toBeVisible();
        
    }

    async verifyOverviewCancelButtonIsDisplayed(){
        await expect(this.overviewCancelButton).toBeVisible();
        await expect(this.overviewCancelButton).toBeEnabled();
    }

    async verifyFinishButtonIsDisplayed(){
        await expect(this.finishButton).toBeVisible();
        await expect(this.finishButton).toBeEnabled();
    }

    async verifyOverviewProductInformation(productName: string, productDesc: string, productPrice: string,){
        await expect(this.overviewProductName).toHaveText(productName);
        await expect(this.overviewProductDesc).toHaveText(productDesc);
        await expect(this.overviewProductPrice).toHaveText(productPrice);
      
    }
    
    async verifyOverviewProductQuantity(productQuantity: number){
        await expect(this.overviewProductQuantity).toHaveText(productQuantity.toString());
    }
    
    async verifyOverviewProductCount(productCount: number){
        await expect(this.overviewProductList).toHaveCount(productCount);
    }

    async verifyOverviewProductPrice(productPrice: string){
        await expect(this.overviewProductPrice).toHaveText(productPrice);
    }

    async verifyIfProductPriceIsMatchToItemTotal(productPrice: number){
        const extractedValue = await this.overviewPriceSubTotal.textContent();
        const trimValue = extractedValue?.replace("Item total: $","");
        const parseValue = parseFloat(trimValue!);
        await expect(parseValue).toBe(productPrice);
    }

    async verifyOverviewSpecificProductQuantity(productName: string, expectedQuantity: number){
        const specificOverviewItem = this.overviewProductList.filter({ hasText: productName });
        const itemQuantity = specificOverviewItem.getByTestId('item-quantity');

        await expect(itemQuantity).toHaveText(expectedQuantity.toString());
    }

    async verifyOverviewSpecificProductInformation(productName: string, productDesc: string, productPrice: string){
        const specificProduct = await this.overviewProductList.filter({hasText: productName});
        const specificProductName = specificProduct.getByTestId('inventory-item-name');
        const specificProductDesc = specificProduct.getByTestId('inventory-item-desc');
        const specificProductPrice = specificProduct.getByTestId('inventory-item-price');

        await expect(specificProductName).toHaveText(productName);
        await expect(specificProductDesc).toHaveText(productDesc);
        await expect(specificProductPrice).toHaveText(productPrice);
    }

    computeItemTotal(product1: number, product2: number){
        const itemTotal = product1 + product2;
        
        return itemTotal;
    }   

    async getExtractedItemValue(){
        const extractedValue = await this.overviewPriceSubTotal.textContent();
        const trimValue = extractedValue?.replace("Item total: $","");
        const parseValue = parseFloat(trimValue!);
        return parseValue;
    }

    async getExtractedTaxValue(){
        const extractedValue = await this.overviewPriceTax.textContent();
        const trimValue = extractedValue?.replace("Tax: $","");
        const parseValue = parseFloat(trimValue!);
        return parseValue;
    }

    async cancelCheckoutOverview(){
        await this.overviewCancelButton.click();
    }

    async finishCheckout(){
        await this.finishButton.click();
    }

    async verifyCompletePageUrl(){
        await expect(this.page).toHaveURL('/checkout-complete.html');
    }

    async verifyCompletePageTitle(){
        await expect(this.completePageTitle).toHaveText("Checkout: Complete!");
    }

    async verifyCompleteConfirmationMessage(){
        await expect(this.completeHeading).toHaveText("Thank you for your order!");
        await expect(this.completeMessage).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
    }

    async verifyCompleteBackButtonIsDisplayed(){
        await expect(this.completeBackButton).toBeVisible();
        await expect(this.completeBackButton).toBeEnabled();
    }
    
    async clickBackHome(){
        await this.completeBackButton.click();
    }

    async getExtractedTotalValue(){
        const extractedValue = await this.overviewPriceTotal.textContent();
        const trimValue = extractedValue?.replace("Total: $","");
        const parseValue = parseFloat(trimValue!);
        return parseValue;
    }
    async verifyCalculatedTotalMatchesDisplayedTotal(){
        const itemValue = await this.getExtractedItemValue();
        const taxValue = await this.getExtractedTaxValue();
        const calculatedValue = this.computeItemTotal(itemValue,taxValue);
        const totalValue = await this.getExtractedTotalValue();
        await expect(calculatedValue).toBeCloseTo(totalValue,2);
    }

    async fillOutCheckoutForm(firstname: string, lastname: string, postalCode: string){
        await this.firstNameInput.fill(firstname || "");
        await this.lastNameInput.fill(lastname || "");
        await this.postalCodeInput.fill(postalCode || "");
    }

    async clickContinueButton(){
        await this.continueButton.click();
    }

    async verifyErrorValidationMessage(errorMessage: string){
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(errorMessage);
    }

    async getExtractedProductPriceValue(productPrice: string){
        const trimValue = productPrice?.replace("$","");
        const parseValue = parseFloat(trimValue!);
        return parseValue;
    }
}