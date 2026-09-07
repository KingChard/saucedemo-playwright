export const checkoutValidationData = {
    firstNameData: {
        testName: 'First Name is empty',
        firstname: '',
        lastname: 'Axcel',
        postalCode: '1440',
        expectedError: 'Error: First Name is required'
    },
    lastNameData: {
        testName: 'Last Name is empty',
        firstname: 'Xavier',
        lastname: '',
        postalCode: '1440',
        expectedError: 'Error: Last Name is required'
    },
    postalCodeData: {
        testName: 'Postal Code is empty',
        firstname: 'Xavier',
        lastname: 'Axcel',
        postalCode: '',
        expectedError: 'Error: Postal Code is required'
    }
};