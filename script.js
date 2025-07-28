// Add your JavaScript code here
document.addEventListener('DOMContentLoaded', () => {
    console.log('DropCart Africa website loaded successfully!');

    const products = [
        {
            name: 'Product 1',
            image: 'images/product1.jpg',
            price: '$19.99',
        },
        {
            name: 'Product 2',
            image: 'images/product2.jpg',
            price: '$29.99',
        },
        {
            name: 'Product 3',
            image: 'images/product3.jpg',
            price: '$39.99',
        },
        {
            name: 'Product 4',
            image: 'images/product4.jpg',
            price: '$49.99',
        },
        {
            name: 'Product 5',
            image: 'images/product5.jpg',
            price: '$59.99',
        },
    ];

    const featuredSlider = document.querySelector('.featured-products .product-slider');
    const newArrivalsSlider = document.querySelector('.new-arrivals .product-slider');
    const trendingSlider = document.querySelector('.trending-products .product-slider');

    if (featuredSlider) {
        fetch('http://localhost:5000/products/')
            .then(response => response.json())
            .then(data => {
                data.forEach(product => {
                    const productCard = `
                        <div class="product-card">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="product-card-content">
                                <h3>${product.name}</h3>
                                <p>$${product.price}</p>
                                <a href="product-details.html?id=${product._id}" class="btn">View Details</a>
                            </div>
                        </div>
                    `;
                    featuredSlider.innerHTML += productCard;
                    newArrivalsSlider.innerHTML += productCard;
                    trendingSlider.innerHTML += productCard;
                });
            });
    }

    const checkoutForm = document.querySelector('.checkout-form');
    if (checkoutForm) {
        const formSteps = [...checkoutForm.querySelectorAll('.form-step')];
        let currentStep = 0;

        const showStep = (step) => {
            formSteps.forEach((formStep, index) => {
                formStep.style.display = index === step ? 'block' : 'none';
            });
        };

        const nextStep = () => {
            if (currentStep < formSteps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        };

        const prevStep = () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        };

        checkoutForm.addEventListener('click', (e) => {
            if (e.target.matches('.next-btn')) {
                nextStep();
            } else if (e.target.matches('.prev-btn')) {
                prevStep();
            }
        });

        showStep(currentStep);
    }
});
