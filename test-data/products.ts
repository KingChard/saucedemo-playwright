export const products = {
    backpack: { name: "Sauce Labs Backpack", price: "$29.99", description: "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection." },
    bikelight: { name: "Sauce Labs Bike Light", price: "$9.99", description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included." },
    boltTShirt: { name: "Sauce Labs Bolt T-Shirt", price: "$15.99", description: "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt." },
    fleeJacket: {name: "Sauce Labs Fleece Jacket", price: "$49.99", description:"It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office."}
};

export const productData = [
	{
    testId: 'TC01-A',
    testName: 'Add Sauce Labs Backpack to the cart',
    name: 'Sauce Labs Backpack',
    price: '$29.99',
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
	},
	{
    testId: 'TC01-B',
    testName: 'Add Sauce Labs Bike Light to the cartt',
    name: 'Sauce Labs Bike Light',
    price: '$9.99',
    description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
	},
]

export const productSorting = [
	{
    testId: 'TC03', 
    testName: 'Sort products by price from low to high',
	sortBy: 'price',
    sortOption: 'Price (low to high)',
    expectedOrder: 'ascending',
	},
	{
    testId: 'TC04', 
    testName: 'Sort products by price from high to low',
	sortBy: 'price',
    sortOption: 'Price (high to low)',
    expectedOrder: 'descending',
	},
	{
    testId: 'TC05', 
    testName: 'Sort products by name from A to Z',
	sortBy: 'name',
    sortOption: 'Name (A to Z)',
    expectedOrder: 'ascending',
	},
	{
    testId: 'TC06', 
    testName: 'Sort products by name from Z to A',
	sortBy: 'name',
    sortOption: 'Name (Z to A)',
    expectedOrder: 'descending',
	},
]