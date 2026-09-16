import { test, expect } from '@playwright/test';

test('API-001 Get a single post', async ({ request }) => {

    // Send GET request
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    // Parse response body
    const body = await response.json();

    // Add assertions
    expect(response.status()).toBe(200);
    expect(body.id).toBe(1);
    expect(body).toHaveProperty('userId');
    expect(typeof body.title).toBe('string');
});

test('API-002 Create a new post', async ({ request }) => {

    // Prepare request data
    const titleData = 'Playwright API Test';
    const bodyData = 'Learning API testing with Playwright';
    const userIdData = 1;
    // Send POST request
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: titleData,
            body: bodyData,
            userId: userIdData
        }
    });

    // Parse response body
    const body = await response.json();

    // Add assertions
    expect(response.status()).toBe(201);
    expect(body.title).toBe(titleData);
    expect(body.body).toBe(bodyData);
    expect(body.userId).toBe(userIdData);
    expect(body).toHaveProperty('id');

});

test('API-003 Update a post using PUT', async ({ request }) => {

    // Prepare updated data
    const titleData = 'Updated Playwright API Test';
    const bodyData = 'Updated post using PUT request';
    const userIdData = 1;

    // Send PUT request
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
        data: {
            title: titleData,
            body: bodyData,
            userId: userIdData
        }
    });

    // Parse response body
    const body = await response.json();

    // Add assertions
    expect(response.status()).toBe(200);
    expect(body.id).toBe(1);
    expect(body.title).toBe(titleData);
    expect(body.body).toBe(bodyData);
    expect(body.userId).toBe(userIdData);

});

test('API-004 Partially update a post using PATCH', async ({ request }) => {

    // Prepare patch data
    const titleData = 'Patched Playwright API Test';

    // Send PATCH request
    const response = await request.patch('https://jsonplaceholder.typicode.com/posts/1', {
        data: {
            title: titleData,
        }
    });

    // Parse response body
    const body = await response.json();

    // Add assertions   
    expect(response.status()).toBe(200);
    expect(body.id).toBe(1);
    expect(body.title).toBe(titleData);
});

test('API-005 Delete a post', async ({ request }) => {

    // Send DELETE request
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');

    // Parse response body
    const body = await response.json();

    // Add assertions
    expect(response.status()).toBe(200);
    expect(body).toEqual({});
});