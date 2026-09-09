export const loginValidationData = [
    {
        testId: 'TC02',
        testName: 'Login fails with invalid username',
        username: 'invalid_username',
        password: 'secret_sauce',
        expectedError: 'Epic sadface: Username and password do not match any user in this service'
    },
    {
        testId: 'TC03',
        testName: 'Login fails with invalid password',
        username: 'standard_user',
        password: 'invalid_password',
        expectedError: 'Epic sadface: Username and password do not match any user in this service'
    },
    {
        testId: 'TC04',
        testName: 'Login fails when username is empty',
        username: '',
        password: 'secret_sauce',
        expectedError: 'Epic sadface: Username is required'
    },
    {
        testId: 'TC05',
        testName: 'Login fails when password is empty',
        username: 'standard_user',
        password: '',
        expectedError: 'Epic sadface: Password is required'
    }
];