"use strict";

const products = [
    {
        name: "Red Sneakers",
        price : "$49.99",
        img: "https://media.istockphoto.com/id/691616136/photo/red-sneakers.jpg?s=612x612&w=0&k=20&c=BBMNOxRnNNdaeEZmMooA1Xu9Exq-olwrP9n3B-iaJCU=",
        alt: "Red Sneakers"
    },
    {
        name: "White T-shirt",
        price: "$19.99",
        img: "https://m.media-amazon.com/images/I/51r2CY33EkL._UY1000_.jpg",
        alt: "White T-shirt"
    },
    {
        name: "Blue Jeans",
        price: "$59.99",
        img: "https://static.molo.com/molo-style/-boy-pants-jeans-aska-s24-blue-denim-/1s24i104_1100.jpg?width=1000&maxheight=1200&trim.threshold=80",
        alt: "Blue Jeans"
    }
];

const section = document.querySelector('.cards');

products.forEach(product => {
    const card = document.createElement('article');
    card.classList.add('card');
    card.tabIndex = 0;

    const img = document.createElement('img');
    img.src = product.img;
    img.alt = product.alt;
    card.appendChild(img);

    const name = document.createElement('h2');
    name.textContent = product.name;
    card.appendChild(name);

    const p = document.createElement('p');
    p.textContent = product.price;
    p.classList.add('price')
    card.appendChild(p)

    const button = document.createElement('button');
    button.textContent = "Add to Cart";
    button.classList.add("addToCart");
    card.appendChild(button);

    section.appendChild(card);
})