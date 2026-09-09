export const checkoutValidationData = [
    {
        testId: 'CHK-004',
        testName: 'Verify First Name is Required',
        firstname: '',
        lastname: 'Axcel',
        postalCode: '1440',
        expectedError: 'Error: First Name is required'
    },
    {
        testId: 'CHK-005',
        testName: 'Verify Last Name is Required',
        firstname: 'Xavier',
        lastname: '',
        postalCode: '1440',
        expectedError: 'Error: Last Name is required'
    },
    {
        testId: 'CHK-006',
        testName: 'Verify Postal Code is Required',
        firstname: 'Xavier',
        lastname: 'Axcel',
        postalCode: '',
        expectedError: 'Error: Postal Code is required'
    }
];