const axios = require('axios');
const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.js');

// Helpers
const getRandomPrice = () => Math.floor(Math.random() * (600 - 100 + 1)) + 100;
const getRandomStock = () => Math.floor(Math.random() * (50 - 5 + 1)) + 5;

// API Endpoints
const MEAL_DB_BASE = 'https://www.themealdb.com/api/json/v1/1';
const COCKTAIL_DB_BASE = 'https://www.thecocktaildb.com/api/json/v1/1';

const fetchMeals = async (endpoint) => {
    try {
        const { data } = await axios.get(`${MEAL_DB_BASE}/${endpoint}`);
        return data.meals || [];
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error.message);
        return [];
    }
};

const fetchDrinks = async (endpoint) => {
    try {
        const { data } = await axios.get(`${COCKTAIL_DB_BASE}/${endpoint}`);
        return data.drinks || [];
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error.message);
        return [];
    }
};

const mapToProduct = (item, category, isDrink = false) => {
    return {
        name: isDrink ? item.strDrink : item.strMeal,
        image: isDrink ? item.strDrinkThumb : item.strMealThumb,
        description: isDrink ? (item.strInstructions || `${item.strDrink} - Refreshing drink.`) : (item.strInstructions ? item.strInstructions.slice(0, 100) + '...' : `Delicious ${category} item.`),
        category,
        price: getRandomPrice(),
        countInStock: getRandomStock(),
    };
};

const run = async () => {
    console.log('Fetching fresh data from APIs...');

    const categories = {
        'Cakes': await fetchMeals('filter.php?c=Dessert'),
        'Pizza': await fetchMeals('search.php?s=pizza'),
        'Burgers': await fetchMeals('search.php?s=burger'),
        'Pasta': await fetchMeals('filter.php?c=Pasta'),
        'Starters': await fetchMeals('filter.php?c=Starter'),
        'Salads': await fetchMeals('filter.php?c=Side'), // Sides often include salads
        'Cool Drinks': await fetchDrinks('filter.php?c=Cocktail'),
        'Sweets': await fetchMeals('filter.php?c=Dessert'), // Will use different slice of desserts
        'Breads': await fetchMeals('filter.php?c=Breakfast'), // Close enough for demo
        'Sandwich': await fetchMeals('search.php?s=sandwich'),
    };

    let allProducts = [];

    // Process Categories
    // Cakes (Take first 12 desserts)
    if (categories['Cakes']) {
        const items = categories['Cakes'].slice(0, 12).map(i => mapToProduct(i, 'Cakes'));
        allProducts = [...allProducts, ...items];
    }

    // Pizza (Take all found)
    if (categories['Pizza']) {
        const items = categories['Pizza'].map(i => mapToProduct(i, 'Pizza'));
        allProducts = [...allProducts, ...items];
    }

    // Burgers (Take all found)
    if (categories['Burgers']) {
        const items = categories['Burgers'].map(i => mapToProduct(i, 'Burgers'));
        allProducts = [...allProducts, ...items];
    }

    // Pasta (Take 12)
    if (categories['Pasta']) {
        const items = categories['Pasta'].slice(0, 12).map(i => mapToProduct(i, 'Pasta'));
        allProducts = [...allProducts, ...items];
    }

    // Starters (Take 12)
    if (categories['Starters']) {
        const items = categories['Starters'].slice(0, 12).map(i => mapToProduct(i, 'Starters'));
        allProducts = [...allProducts, ...items];
    }

    // Salads (Take 12 sides)
    if (categories['Salads']) {
        const items = categories['Salads'].slice(0, 12).map(i => mapToProduct(i, 'Salads'));
        allProducts = [...allProducts, ...items];
    }

    // Sweets (Take next 12 desserts)
    if (categories['Sweets'] && categories['Cakes']) {
        // Skip the ones used for cakes
        const items = categories['Sweets'].slice(12, 24).map(i => mapToProduct(i, 'Sweets'));
        allProducts = [...allProducts, ...items];
    }

    // Cool Drinks (Take 12 cocktails)
    if (categories['Cool Drinks']) {
        const items = categories['Cool Drinks'].slice(0, 12).map(i => mapToProduct(i, 'Cool Drinks', true));
        allProducts = [...allProducts, ...items];
    }

    // Breads (Breakfast items)
    if (categories['Breads']) {
        const items = categories['Breads'].slice(0, 12).map(i => mapToProduct(i, 'Breads'));
        allProducts = [...allProducts, ...items];
    }

    // Sandwich and Subs - Search results might be low, fallback to manual for these if needed or duplicate
    if (categories['Sandwich']) {
        const items = categories['Sandwich'].map(i => mapToProduct(i, 'Sandwich'));
        allProducts = [...allProducts, ...items];
    }

    // Manual fallback for very specific categories if API returned 0
    // But let's act based on what we have.

    const fileContent = `const products = ${JSON.stringify(allProducts, null, 4)};\n\nmodule.exports = products;`;

    fs.writeFileSync(PRODUCTS_FILE, fileContent);
    console.log(`Successfully updated products.js with ${allProducts.length} items from APIs!`);
};

run();
