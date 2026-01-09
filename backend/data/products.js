const products = [
    {
        "name": "Æbleskiver",
        "image": "https://www.themealdb.com/images/media/meals/wkhg581762773124.jpg",
        "description": "Traditional Danish pancake puffs, light and fluffy with a hint of cardamom.",
        "category": "Cakes",
        "price": 246,
        "countInStock": 43
    },
    {
        "name": "Alfajores",
        "image": "https://www.themealdb.com/images/media/meals/a4kgf21763075288.jpg",
        "description": "Soft South American cookies sandwiched together with rich dulce de leche.",
        "category": "Cakes",
        "price": 454,
        "countInStock": 35
    },
    {
        "name": "Anzac biscuits",
        "image": "https://www.themealdb.com/images/media/meals/q47rkb1762324620.jpg",
        "description": "Crunchy Australian oats and coconut biscuits with a golden syrup sweetness.",
        "category": "Cakes",
        "price": 115,
        "countInStock": 47
    },
    {
        "name": "Apam balik",
        "image": "https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg",
        "description": "Malaysian peanut pancake with a sweet and buttery filling, folded to perfection.",
        "category": "Cakes",
        "price": 282,
        "countInStock": 32
    },
    {
        "name": "Apple & Blackberry Crumble",
        "image": "https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg",
        "description": "Warm and cozy orchard fruits topped with a buttery, golden-brown oat crumble.",
        "category": "Cakes",
        "price": 361,
        "countInStock": 22
    },
    {
        "name": "Apple cake",
        "image": "https://www.themealdb.com/images/media/meals/c0gmo31766594751.jpg",
        "description": "Delicious Cakes item.",
        "category": "Cakes",
        "price": 101,
        "countInStock": 47
    },
    {
        "name": "Apple Frangipan Tart",
        "image": "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
        "description": "Delicious Cakes item.",
        "category": "Cakes",
        "price": 160,
        "countInStock": 40
    },
    {
        "name": "Apricot & Turkish delight mess",
        "image": "https://www.themealdb.com/images/media/meals/p277uc1764109195.jpg",
        "description": "Delicious Cakes item.",
        "category": "Cakes",
        "price": 229,
        "countInStock": 43
    },
    {
        "name": "Authentic Norwegian Kransekake",
        "image": "https://www.themealdb.com/images/media/meals/yk78uc1763075719.jpg",
        "description": "Delicious Cakes item.",
        "category": "Cakes",
        "price": 170,
        "countInStock": 38
    },
    {
        "name": "Bakewell tart",
        "image": "https://www.themealdb.com/images/media/meals/wyrqqq1468233628.jpg",
        "description": "Delicious Cakes item.",
        "category": "Cakes",
        "price": 362,
        "countInStock": 20
    },
    {
        "name": "Baklava with spiced nuts, ricotta & chocolate",
        "image": "https://www.themealdb.com/images/media/meals/ytme8t1764111401.jpg",
        "description": "Delicious Cakes item.",
        "category": "Cakes",
        "price": 371,
        "countInStock": 50
    },
    {
        "name": "Banana Pancakes",
        "image": "https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg",
        "description": "Delicious Cakes item.",
        "category": "Cakes",
        "price": 185,
        "countInStock": 36
    },
    {
        "name": "Cassava pizza",
        "image": "https://www.themealdb.com/images/media/meals/lrfdwz1764438393.jpg",
        "description": "Preheat the oven to 200ºC.\r\nCut the bacon or chorizo into medium pieces and the paprika into strips....",
        "category": "Pizza",
        "price": 403,
        "countInStock": 19
    },
    {
        "name": "Matambre a la Pizza",
        "image": "https://www.themealdb.com/images/media/meals/wf49qs1763075222.jpg",
        "description": "Prepare the Steak: Season the steak with salt and pepper. Grill one side until half-cooked.\r\nAdd Top...",
        "category": "Pizza",
        "price": 184,
        "countInStock": 33
    },
    {
        "name": "Pizza Express Margherita",
        "image": "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
        "description": "1 Preheat the oven to 230°C.\r\n\r\n2 Add the sugar and crumble the fresh yeast into warm water.\r\n\r\n3 Al...",
        "category": "Pizza",
        "price": 102,
        "countInStock": 50
    },
    {
        "name": "kofta burgers",
        "image": "https://www.themealdb.com/images/media/meals/lgmnff1763789847.jpg",
        "description": "step 1\r\nTip the mince into a large bowl (use a clean washing-up bowl if you don’t have anything big ...",
        "category": "Burgers",
        "price": 165,
        "countInStock": 14
    },
    {
        "name": "Aussie Burgers",
        "image": "https://www.themealdb.com/images/media/meals/44bzep1761848278.jpg",
        "description": "step 1\r\nMake the burgers: Tip the meat into a bowl and sprinkle over 1 tsp salt and a good grinding ...",
        "category": "Burgers",
        "price": 370,
        "countInStock": 17
    },
    {
        "name": "Lamb Tzatziki Burgers",
        "image": "https://www.themealdb.com/images/media/meals/k420tj1585565244.jpg",
        "description": "Tip the bulghar into a pan, cover with water and boil for 10 mins. Drain really well in a sieve, pre...",
        "category": "Burgers",
        "price": 488,
        "countInStock": 27
    },
    {
        "name": "15-minute chicken & halloumi burgers",
        "image": "https://www.themealdb.com/images/media/meals/vdwloy1713225718.jpg",
        "description": "STEP 1\r\n\r\nPut the chicken breasts between two pieces of baking parchment and use a rolling pin to ge...",
        "category": "Burgers",
        "price": 468,
        "countInStock": 49
    },
    {
        "name": "Chilli prawn linguine",
        "image": "https://www.themealdb.com/images/media/meals/usywpp1511189717.jpg",
        "description": "Garlic-infused linguine tossed with succulent prawns, fresh chili, and parsley.",
        "category": "Pasta",
        "price": 348,
        "countInStock": 45
    },
    {
        "name": "Fettuccine Alfredo",
        "image": "https://www.themealdb.com/images/media/meals/0jv5gx1661040802.jpg",
        "description": "Rich and velvety pasta in a classic cream and parmesan butter sauce.",
        "category": "Pasta",
        "price": 285,
        "countInStock": 39
    },
    {
        "name": "Fettucine alfredo",
        "image": "https://www.themealdb.com/images/media/meals/uquqtu1511178042.jpg",
        "description": "Delicious Pasta item.",
        "category": "Pasta",
        "price": 302,
        "countInStock": 19
    },
    {
        "name": "Grilled Mac and Cheese Sandwich",
        "image": "https://www.themealdb.com/images/media/meals/xutquv1505330523.jpg",
        "description": "Delicious Pasta item.",
        "category": "Pasta",
        "price": 465,
        "countInStock": 44
    },
    {
        "name": "Lasagna Sandwiches",
        "image": "https://www.themealdb.com/images/media/meals/xr0n4r1576788363.jpg",
        "description": "Delicious Pasta item.",
        "category": "Pasta",
        "price": 563,
        "countInStock": 27
    },
    {
        "name": "Lasagne",
        "image": "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg",
        "description": "Delicious Pasta item.",
        "category": "Pasta",
        "price": 443,
        "countInStock": 21
    },
    {
        "name": "Pilchard puttanesca",
        "image": "https://www.themealdb.com/images/media/meals/vvtvtr1511180578.jpg",
        "description": "Delicious Pasta item.",
        "category": "Pasta",
        "price": 155,
        "countInStock": 50
    },
    {
        "name": "Spaghetti alla Carbonara",
        "image": "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
        "description": "Delicious Pasta item.",
        "category": "Pasta",
        "price": 235,
        "countInStock": 33
    },
    {
        "name": "Syrian Spaghetti",
        "image": "https://www.themealdb.com/images/media/meals/5fu4ew1760524857.jpg",
        "description": "Delicious Pasta item.",
        "category": "Pasta",
        "price": 524,
        "countInStock": 10
    },
    {
        "name": "Venetian Duck Ragu",
        "image": "https://www.themealdb.com/images/media/meals/qvrwpt1511181864.jpg",
        "description": "Delicious Pasta item.",
        "category": "Pasta",
        "price": 237,
        "countInStock": 26
    },
    {
        "name": "Ajo blanco",
        "image": "https://www.themealdb.com/images/media/meals/5jdtie1763289302.jpg",
        "description": "Refreshing Spanish white gazpacho made with almond, garlic, and grapes.",
        "category": "Starters",
        "price": 256,
        "countInStock": 19
    },
    {
        "name": "Broccoli & Stilton soup",
        "image": "https://www.themealdb.com/images/media/meals/tvvxpv1511191952.jpg",
        "description": "Comforting creamy soup with a perfect balance of earthy broccoli and tangy cheese.",
        "category": "Starters",
        "price": 561,
        "countInStock": 9
    },
    {
        "name": "Clam chowder",
        "image": "https://www.themealdb.com/images/media/meals/rvtvuw1511190488.jpg",
        "description": "Delicious Starters item.",
        "category": "Starters",
        "price": 339,
        "countInStock": 14
    },
    {
        "name": "Cream Cheese Tart",
        "image": "https://www.themealdb.com/images/media/meals/wurrux1468416624.jpg",
        "description": "Delicious Starters item.",
        "category": "Starters",
        "price": 393,
        "countInStock": 49
    },
    {
        "name": "Creamy Tomato Soup",
        "image": "https://www.themealdb.com/images/media/meals/stpuws1511191310.jpg",
        "description": "Delicious Starters item.",
        "category": "Starters",
        "price": 364,
        "countInStock": 24
    },
    {
        "name": "Quick gazpacho",
        "image": "https://www.themealdb.com/images/media/meals/h5qmn31763304965.jpg",
        "description": "Delicious Starters item.",
        "category": "Starters",
        "price": 174,
        "countInStock": 18
    },
    {
        "name": "Air Fryer Egg Rolls",
        "image": "https://www.themealdb.com/images/media/meals/grhn401765687086.jpg",
        "description": "Delicious Salads item.",
        "category": "Salads",
        "price": 280,
        "countInStock": 21
    },
    {
        "name": "Algerian Bouzgene Berber Bread with Roasted Pepper Sauce",
        "image": "https://www.themealdb.com/images/media/meals/se5vhk1764114880.jpg",
        "description": "Delicious Salads item.",
        "category": "Salads",
        "price": 284,
        "countInStock": 19
    },
    {
        "name": "Algerian Carrots",
        "image": "https://www.themealdb.com/images/media/meals/o2cd4r1764113576.jpg",
        "description": "Delicious Salads item.",
        "category": "Salads",
        "price": 259,
        "countInStock": 49
    },
    {
        "name": "Baba Ghanoush",
        "image": "https://www.themealdb.com/images/media/meals/dlmh401760524897.jpg",
        "description": "Delicious Salads item.",
        "category": "Salads",
        "price": 468,
        "countInStock": 45
    },
    {
        "name": "Blini Pancakes",
        "image": "https://www.themealdb.com/images/media/meals/0206h11699013358.jpg",
        "description": "Delicious Salads item.",
        "category": "Salads",
        "price": 455,
        "countInStock": 23
    },
    {
        "name": "Boulangère Potatoes",
        "image": "https://www.themealdb.com/images/media/meals/qywups1511796761.jpg",
        "description": "Delicious Salads item.",
        "category": "Salads",
        "price": 251,
        "countInStock": 6
    },
    {
        "name": "Brie wrapped in prosciutto & brioche",
        "image": "https://www.themealdb.com/images/media/meals/qqpwsy1511796276.jpg",
        "description": "Delicious Salads item.",
        "category": "Salads",
        "price": 472,
        "countInStock": 44
    },
    {
        "name": "Burek",
        "image": "https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg",
        "description": "Delicious Salads item.",
        "category": "Salads",
        "price": 315,
        "countInStock": 41
    },
    {
        "name": "Cacik",
        "image": "https://www.themealdb.com/images/media/meals/16zbeu1763789342.jpg",
        "description": "Delicious Salads item.",
        "category": "Salads",
        "price": 559,
        "countInStock": 25
    },
    {
        "name": "Callaloo and SaltFish",
        "image": "https://www.themealdb.com/images/media/meals/73o3vq1765317873.jpg",
        "description": "Delicious Salads item.",
        "category": "Salads",
        "price": 346,
        "countInStock": 18
    },
    {
        "name": "Challah",
        "image": "https://www.themealdb.com/images/media/meals/fm01ky1764366365.jpg",
        "description": "Delicious Salads item.",
        "category": "Salads",
        "price": 483,
        "countInStock": 18
    },
    {
        "name": "Cheese Borek",
        "image": "https://www.themealdb.com/images/media/meals/oal8x31764119345.jpg",
        "description": "Delicious Salads item.",
        "category": "Salads",
        "price": 116,
        "countInStock": 12
    },
    {
        "name": "Battenberg Cake",
        "image": "https://www.themealdb.com/images/media/meals/ywwrsp1511720277.jpg",
        "description": "Delicious Sweets item.",
        "category": "Sweets",
        "price": 427,
        "countInStock": 50
    },
    {
        "name": "BeaverTails",
        "image": "https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg",
        "description": "Delicious Sweets item.",
        "category": "Sweets",
        "price": 150,
        "countInStock": 7
    },
    {
        "name": "Beetroot pancakes",
        "image": "https://www.themealdb.com/images/media/meals/xlqqhw1764369924.jpg",
        "description": "Delicious Sweets item.",
        "category": "Sweets",
        "price": 171,
        "countInStock": 12
    },
    {
        "name": "Blackberry Fool",
        "image": "https://www.themealdb.com/images/media/meals/rpvptu1511641092.jpg",
        "description": "Delicious Sweets item.",
        "category": "Sweets",
        "price": 235,
        "countInStock": 8
    },
    {
        "name": "Blueberry & lemon friands",
        "image": "https://www.themealdb.com/images/media/meals/e756bf1761848342.jpg",
        "description": "Delicious Sweets item.",
        "category": "Sweets",
        "price": 103,
        "countInStock": 26
    },
    {
        "name": "Bread and Butter Pudding",
        "image": "https://www.themealdb.com/images/media/meals/xqwwpy1483908697.jpg",
        "description": "Delicious Sweets item.",
        "category": "Sweets",
        "price": 443,
        "countInStock": 39
    },
    {
        "name": "Budino Di Ricotta",
        "image": "https://www.themealdb.com/images/media/meals/1549542877.jpg",
        "description": "Delicious Sweets item.",
        "category": "Sweets",
        "price": 596,
        "countInStock": 5
    },
    {
        "name": "Canadian Butter Tarts",
        "image": "https://www.themealdb.com/images/media/meals/wpputp1511812960.jpg",
        "description": "Delicious Sweets item.",
        "category": "Sweets",
        "price": 321,
        "countInStock": 13
    },
    {
        "name": "Caribbean Tamarind balls",
        "image": "https://www.themealdb.com/images/media/meals/z1hz7z1765316430.jpg",
        "description": "Delicious Sweets item.",
        "category": "Sweets",
        "price": 254,
        "countInStock": 36
    },
    {
        "name": "Carrot Cake",
        "image": "https://www.themealdb.com/images/media/meals/vrspxv1511722107.jpg",
        "description": "Delicious Sweets item.",
        "category": "Sweets",
        "price": 429,
        "countInStock": 24
    },
    {
        "name": "Cashew Ghoriba Biscuits",
        "image": "https://www.themealdb.com/images/media/meals/t3r3ka1560461972.jpg",
        "description": "Delicious Sweets item.",
        "category": "Sweets",
        "price": 122,
        "countInStock": 28
    },
    {
        "name": "Chelsea Buns",
        "image": "https://www.themealdb.com/images/media/meals/vqpwrv1511723001.jpg",
        "description": "Delicious Sweets item.",
        "category": "Sweets",
        "price": 515,
        "countInStock": 35
    },
    {
        "name": "155 Belmont",
        "image": "https://www.thecocktaildb.com/images/media/drink/yqvvqs1475667388.jpg",
        "description": "155 Belmont - Refreshing drink.",
        "category": "Cool Drinks",
        "price": 138,
        "countInStock": 33
    },
    {
        "name": "57 Chevy with a White License Plate",
        "image": "https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg",
        "description": "57 Chevy with a White License Plate - Refreshing drink.",
        "category": "Cool Drinks",
        "price": 124,
        "countInStock": 41
    },
    {
        "name": "747 Drink",
        "image": "https://www.thecocktaildb.com/images/media/drink/i9suxb1582474926.jpg",
        "description": "747 Drink - Refreshing drink.",
        "category": "Cool Drinks",
        "price": 539,
        "countInStock": 45
    },
    {
        "name": "9 1/2 Weeks",
        "image": "https://www.thecocktaildb.com/images/media/drink/xvwusr1472669302.jpg",
        "description": "9 1/2 Weeks - Refreshing drink.",
        "category": "Cool Drinks",
        "price": 317,
        "countInStock": 8
    },
    {
        "name": "A Gilligan's Island",
        "image": "https://www.thecocktaildb.com/images/media/drink/wysqut1461867176.jpg",
        "description": "A Gilligan's Island - Refreshing drink.",
        "category": "Cool Drinks",
        "price": 421,
        "countInStock": 47
    },
    {
        "name": "A True Amaretto Sour",
        "image": "https://www.thecocktaildb.com/images/media/drink/rptuxy1472669372.jpg",
        "description": "A True Amaretto Sour - Refreshing drink.",
        "category": "Cool Drinks",
        "price": 340,
        "countInStock": 8
    },
    {
        "name": "A.D.M. (After Dinner Mint)",
        "image": "https://www.thecocktaildb.com/images/media/drink/ruxuvp1472669600.jpg",
        "description": "A.D.M. (After Dinner Mint) - Refreshing drink.",
        "category": "Cool Drinks",
        "price": 346,
        "countInStock": 17
    },
    {
        "name": "A1",
        "image": "https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg",
        "description": "A1 - Refreshing drink.",
        "category": "Cool Drinks",
        "price": 317,
        "countInStock": 13
    },
    {
        "name": "Abbey Martini",
        "image": "https://www.thecocktaildb.com/images/media/drink/2mcozt1504817403.jpg",
        "description": "Abbey Martini - Refreshing drink.",
        "category": "Cool Drinks",
        "price": 412,
        "countInStock": 32
    },
    {
        "name": "Absolut Summertime",
        "image": "https://www.thecocktaildb.com/images/media/drink/trpxxs1472669662.jpg",
        "description": "Absolut Summertime - Refreshing drink.",
        "category": "Cool Drinks",
        "price": 597,
        "countInStock": 42
    },
    {
        "name": "Absolutely Fabulous",
        "image": "https://www.thecocktaildb.com/images/media/drink/abcpwr1504817734.jpg",
        "description": "Absolutely Fabulous - Refreshing drink.",
        "category": "Cool Drinks",
        "price": 291,
        "countInStock": 7
    },
    {
        "name": "Absolutly Screwed Up",
        "image": "https://www.thecocktaildb.com/images/media/drink/yvxrwv1472669728.jpg",
        "description": "Absolutly Screwed Up - Refreshing drink.",
        "category": "Cool Drinks",
        "price": 279,
        "countInStock": 34
    },
    {
        "name": "Bread omelette",
        "image": "https://www.themealdb.com/images/media/meals/hqaejl1695738653.jpg",
        "description": "Quick and savory breakfast sandwich with a perfectly seasoned egg omelette.",
        "category": "Breads",
        "price": 330,
        "countInStock": 49
    },
    {
        "name": "Breakfast Potatoes",
        "image": "https://www.themealdb.com/images/media/meals/1550441882.jpg",
        "description": "Delicious Breads item.",
        "category": "Breads",
        "price": 262,
        "countInStock": 14
    },
    {
        "name": "Dutch poffertjes (mini pancakes)",
        "image": "https://www.themealdb.com/images/media/meals/oaqz9f1766593912.jpg",
        "description": "Delicious Breads item.",
        "category": "Breads",
        "price": 369,
        "countInStock": 33
    },
    {
        "name": "English Breakfast",
        "image": "https://www.themealdb.com/images/media/meals/utxryw1511721587.jpg",
        "description": "Delicious Breads item.",
        "category": "Breads",
        "price": 112,
        "countInStock": 10
    },
    {
        "name": "Fruit and Cream Cheese Breakfast Pastries",
        "image": "https://www.themealdb.com/images/media/meals/1543774956.jpg",
        "description": "Delicious Breads item.",
        "category": "Breads",
        "price": 147,
        "countInStock": 43
    },
    {
        "name": "Full English Breakfast",
        "image": "https://www.themealdb.com/images/media/meals/sqrtwu1511721265.jpg",
        "description": "Delicious Breads item.",
        "category": "Breads",
        "price": 317,
        "countInStock": 10
    },
    {
        "name": "Home-made Mandazi",
        "image": "https://www.themealdb.com/images/media/meals/thazgm1555350962.jpg",
        "description": "Delicious Breads item.",
        "category": "Breads",
        "price": 493,
        "countInStock": 44
    },
    {
        "name": "Jamaican Cornmeal Porridge",
        "image": "https://www.themealdb.com/images/media/meals/sng9bm1765320170.jpg",
        "description": "Delicious Breads item.",
        "category": "Breads",
        "price": 451,
        "countInStock": 12
    },
    {
        "name": "Oatmeal pancakes",
        "image": "https://www.themealdb.com/images/media/meals/c400ok1764439058.jpg",
        "description": "Delicious Breads item.",
        "category": "Breads",
        "price": 334,
        "countInStock": 30
    },
    {
        "name": "Rømmegrøt – Norwegian Sour Cream Porridge",
        "image": "https://www.themealdb.com/images/media/meals/hyk47c1762772689.jpg",
        "description": "Delicious Breads item.",
        "category": "Breads",
        "price": 389,
        "countInStock": 7
    },
    {
        "name": "Salmon Eggs Eggs Benedict",
        "image": "https://www.themealdb.com/images/media/meals/1550440197.jpg",
        "description": "Delicious Breads item.",
        "category": "Breads",
        "price": 466,
        "countInStock": 38
    },
    {
        "name": "Smoked Haddock Kedgeree",
        "image": "https://www.themealdb.com/images/media/meals/1550441275.jpg",
        "description": "Delicious Breads item.",
        "category": "Breads",
        "price": 353,
        "countInStock": 18
    },
    {
        "name": "Chivito sandwich",
        "image": "https://www.themealdb.com/images/media/meals/j80gmw1764372176.jpg",
        "description": "For the brioche buns heat the milk with the butter and molasses until the butter has melted. Add the...",
        "category": "Sandwich",
        "price": 266,
        "countInStock": 16
    },
    {
        "name": "Lasagna Sandwiches",
        "image": "https://www.themealdb.com/images/media/meals/xr0n4r1576788363.jpg",
        "description": "1. In a small bowl, combine the first four ingredients; spread on four slices of bread. Layer with b...",
        "category": "Sandwich",
        "price": 427,
        "countInStock": 36
    },
    {
        "name": "Chick-Fil-A Sandwich",
        "image": "https://www.themealdb.com/images/media/meals/sbx7n71587673021.jpg",
        "description": "Wrap the chicken loosely between plastic wrap and pound gently with the flat side of a meat tenderiz...",
        "category": "Sandwich",
        "price": 541,
        "countInStock": 11
    },
    {
        "name": "Grilled Mac and Cheese Sandwich",
        "image": "https://www.themealdb.com/images/media/meals/xutquv1505330523.jpg",
        "description": "Make the mac and cheese\r\n\r\n1. Bring a medium saucepan of generously salted water (you want it to tas...",
        "category": "Sandwich",
        "price": 485,
        "countInStock": 41
    },
    {
        "name": "Falafel Pita Sandwich with Tahini Sauce",
        "image": "https://www.themealdb.com/images/media/meals/ae6clc1760524712.jpg",
        "description": "Preheat the oven to 450 degrees F (230 degrees C). Place falafel on a baking sheet.\\r\\n\\r\\nBake in the p...",
        "category": "Sandwich",
        "price": 181,
        "countInStock": 47
    },
    {
        "name": "Classic Espresso",
        "image": "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&h=500&fit=crop&q=80",
        "description": "Rich and bold espresso shot, perfect for coffee lovers.",
        "category": "Hot Drinks",
        "price": 120,
        "countInStock": 50
    },
    {
        "name": "Cappuccino",
        "image": "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&h=500&fit=crop&q=80",
        "description": "Creamy cappuccino with perfect foam art.",
        "category": "Hot Drinks",
        "price": 150,
        "countInStock": 45
    },
    {
        "name": "Caffe Latte",
        "image": "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=500&h=500&fit=crop&q=80",
        "description": "Smooth and creamy latte with steamed milk.",
        "category": "Hot Drinks",
        "price": 160,
        "countInStock": 42
    },
    {
        "name": "Caramel Macchiato",
        "image": "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80&v=2",
        "description": "Sweet caramel macchiato with vanilla and espresso.",
        "category": "Hot Drinks",
        "price": 180,
        "countInStock": 38
    },
    {
        "name": "Hot Chocolate",
        "image": "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=500&h=500&fit=crop&q=80",
        "description": "Rich and creamy hot chocolate topped with whipped cream.",
        "category": "Hot Drinks",
        "price": 140,
        "countInStock": 40
    },
    {
        "name": "Masala Chai",
        "image": "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80",
        "description": "Traditional Indian spiced tea with aromatic spices.",
        "category": "Hot Drinks",
        "price": 100,
        "countInStock": 50
    },
    {
        "name": "Green Tea",
        "image": "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=500&h=500&fit=crop&q=80",
        "description": "Healthy and refreshing green tea with antioxidants.",
        "category": "Hot Drinks",
        "price": 110,
        "countInStock": 48
    },
    {
        "name": "English Breakfast Tea",
        "image": "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=500&h=500&fit=crop&q=80",
        "description": "Classic English breakfast tea, strong and robust.",
        "category": "Hot Drinks",
        "price": 115,
        "countInStock": 46
    },
    {
        "name": "Mocha",
        "image": "https://images.unsplash.com/photo-1534706936160-d5ee67737249?w=500&h=500&fit=crop&q=80",
        "description": "Perfect blend of espresso, chocolate, and steamed milk.",
        "category": "Hot Drinks",
        "price": 170,
        "countInStock": 35
    },
    {
        "name": "Flat White",
        "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop&q=80",
        "description": "Velvety smooth flat white with microfoam.",
        "category": "Hot Drinks",
        "price": 165,
        "countInStock": 37
    },
    {
        "name": "Turkish Coffee",
        "image": "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&h=500&fit=crop&q=80",
        "description": "Traditional Turkish coffee, thick and aromatic.",
        "category": "Hot Drinks",
        "price": 130,
        "countInStock": 30
    },
    {
        "name": "Herbal Tea",
        "image": "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&h=500&fit=crop&q=80",
        "description": "Soothing herbal tea blend with natural ingredients.",
        "category": "Hot Drinks",
        "price": 120,
        "countInStock": 44
    },
    {
        "name": "Pad Thai Noodles",
        "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=500&fit=crop&q=80",
        "description": "Classic Thai stir-fried rice noodles with tamarind sauce.",
        "category": "Noodles",
        "price": 280,
        "countInStock": 35
    },
    {
        "name": "Hakka Noodles",
        "image": "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&h=500&fit=crop&q=80",
        "description": "Indo-Chinese style stir-fried noodles with vegetables.",
        "category": "Noodles",
        "price": 220,
        "countInStock": 42
    },
    {
        "name": "Ramen Bowl",
        "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&q=80&v=2",
        "description": "Japanese ramen with rich broth, egg, and vegetables.",
        "category": "Noodles",
        "price": 320,
        "countInStock": 28
    },
    {
        "name": "Singapore Noodles",
        "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80&v=2",
        "description": "Curry-flavored rice noodles with shrimp and vegetables.",
        "category": "Noodles",
        "price": 290,
        "countInStock": 30
    },
    {
        "name": "Chow Mein",
        "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=500&q=80",
        "description": "Crispy Chinese noodles with mixed vegetables and sauce.",
        "category": "Noodles",
        "price": 240,
        "countInStock": 38
    },
    {
        "name": "Udon Noodles",
        "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=80",
        "description": "Thick Japanese udon noodles in savory broth.",
        "category": "Noodles",
        "price": 260,
        "countInStock": 33
    },
    {
        "name": "Schezwan Noodles",
        "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&h=500&fit=crop&q=80",
        "description": "Spicy Schezwan sauce noodles with vegetables.",
        "category": "Noodles",
        "price": 250,
        "countInStock": 40
    },
    {
        "name": "Vietnamese Pho",
        "image": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=500&h=500&fit=crop&q=80",
        "description": "Traditional Vietnamese noodle soup with herbs.",
        "category": "Noodles",
        "price": 310,
        "countInStock": 25
    },
    {
        "name": "Soba Noodles",
        "image": "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500&h=500&fit=crop&q=80",
        "description": "Japanese buckwheat noodles served hot or cold.",
        "category": "Noodles",
        "price": 270,
        "countInStock": 32
    },
    {
        "name": "Korean Japchae",
        "image": "https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=500&h=500&fit=crop&q=80",
        "description": "Sweet potato glass noodles with vegetables and beef.",
        "category": "Noodles",
        "price": 300,
        "countInStock": 27
    },
    {
        "name": "Lo Mein",
        "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500&h=500&fit=crop&q=80",
        "description": "Soft Chinese egg noodles tossed in savory sauce.",
        "category": "Noodles",
        "price": 230,
        "countInStock": 36
    },
    {
        "name": "Dan Dan Noodles",
        "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&h=500&fit=crop&q=80",
        "description": "Spicy Sichuan noodles with minced pork and peanuts.",
        "category": "Noodles",
        "price": 285,
        "countInStock": 29
    }
];

module.exports = products;