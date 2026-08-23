export const users = {
    validUser: { username: "standard_user", password: "secret_sauce", expectedUrl: "https://www.saucedemo.com/inventory.html" },
    invalidUsername: { username: "invalid_username", password: "secret_sauce", expectedErrorMessage: "Epic sadface: Username and password do not match any user in this service" },
    invalidPassword: { username: "standard_user", password: "invalid_password", expectedErrorMessage: "Epic sadface: Username and password do not match any user in this service" },
    emptyUsername: { username: "", password: "secret_sauce", expectedErrorMessage: "Epic sadface: Username is required" },
    emptyPassword: { username: "standard_user", password: "", expectedErrorMessage: "Epic sadface: Password is required" },
}