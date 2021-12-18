/* MOBILE NAVIGATION */

//Function: Disable scroll
const disableScroll = () => {
    const pageBody = document.querySelector('body');
    pageBody.classList.toggle('preventScroll');
}

const toggle = document.querySelector('.toggle');
toggle.addEventListener('click', () => {
    const mainNavigation = document.querySelector('.main-navigation');
    const hamburgerOpen = document.querySelector('.hamburger-open');
    const hamburgerClose = document.querySelector('.hamburger-close');
    mainNavigation.classList.toggle('open');
    hamburgerOpen.classList.toggle('mobile-nav-open');
    hamburgerClose.classList.toggle('mobile-nav-open');

    disableScroll();
});

/* ACCORDION BEHAVIOR */

//Add event listener to the accordions
const interactiveAccordions = () => {
const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
        accordion.addEventListener('click', () => {

            //Spin the arrow when the accordion is clicked
            accordion.classList.toggle('accordionActive');
            accordion.parentElement.classList.toggle('accordionActive');

            //Expand/collaps the options-container when the accordion is clicked
            const optionsContainer = accordion.nextElementSibling;
            if(optionsContainer.style.maxHeight) {
                optionsContainer.style = null;
            } else {
                optionsContainer.style.maxHeight = optionsContainer.scrollHeight + 'px';
            }

        })    
    })
};

interactiveAccordions();

/* COFFE COLLECTION OPTIONS */

//Function: Change color of the card on click
 const changeCardColor = (option) => {
    const optionsContainer = option.parentElement;
    const siblingCards = Array.from(optionsContainer.children);
    
    siblingCards.forEach(sibling => {
        sibling.classList.remove('selected');
    })
    option.classList.add('selected');
}

//Function: Print the selected options to the order summary section
const saveSelectedOption = (option) => { 

    //Save the heading of the clicked card
    const cardHeading = option.firstElementChild.innerText;

    //Select elements related to the accordion of grinding options
    const grindAccordion = document.getElementById('grindHeading');
    const grindOption = document.getElementById('hideGrindOption')
    const grindWrapper = document.getElementById('grind-option');
    const grindWrapperFirstChild = grindWrapper.firstElementChild;
    const sibling = grindWrapperFirstChild.nextElementSibling;
    const grindAlts = Array.from(document.querySelectorAll('[data-option-selected="grindOption"]'));


    //Fetch the selected coffee option
    const coffeeType = document.getElementById('order-preference').textContent;

    //Get the id from the wrapper of the clicked card
    const wrapperId = option.closest('.accordion-wrapper').id;

    //Prepend 'order-' to the wrapperId to target the ID in the order description
    const modifiedId = 'order-' + wrapperId;

    if(cardHeading === 'Capsule') {
        
        //Disable the grind options accordion
        grindAccordion.parentElement.style.pointerEvents = 'none';
        grindAccordion.style.color = "hsla(215, 5%, 54%, 49%)";
        sibling.style.maxHeight = null;

        //Collaps the grind options accordion
        grindWrapper.classList.remove('accordionActive');
        grindWrapperFirstChild.classList.remove('accordionActive');

        //Remove the grind option span in the order description
        grindOption.style.display = 'none';

        //Change from "as" to "using" in the order description 
        document.getElementById('asOrUsing').textContent = `using `;

        //Print the selected coffe type (Capsule) to the order description
        document.getElementById(modifiedId).classList.add('hidePlaceHolder');
        document.getElementById(modifiedId).innerText = cardHeading;

    } else {
        //Use the wrapper id as input for removing the placeholder class and print the headline of the clicked card 
            document.getElementById(modifiedId).classList.add('hidePlaceHolder');
            document.getElementById(modifiedId).innerText = cardHeading; 
            if(coffeeType === 'Capsule' && cardHeading === 'Filter' || cardHeading === 'Espresso') {

                document.getElementById('asOrUsing').textContent = `as `;
                grindOption.style.display = 'inline'; 
                 //Enable the grind options accordion
                grindAccordion.parentElement.style.pointerEvents = 'auto';
                grindAccordion.style.color = "hsl(215, 5%, 54%)";
                grindAlts.forEach(grindAlt => {
                    if(cardHeading === 'Filter' || cardHeading === 'Espresso' && grindAlt.classList.contains('selected')) {
                        sibling.style.maxHeight = sibling.scrollHeight + 'px'; 
                        grindWrapper.classList.add('accordionActive');
                    grindWrapperFirstChild.classList.add('accordionActive');
                    grindAccordion.parentElement.style.pointerEvents = 'auto';
                    grindAccordion.style.color = "hsl(215, 5%, 54%)";   
                    }
                })               
            } 
        }       

        //Nested Function: Print prices per shipment to the frequency cards - prices are based on the weight of the selected coffee bag
        const showPricesPerShipment = () => {
        if(wrapperId === 'quantity') {

            const weeklyDelivery = document.getElementById('pricePerWeek');
            const biWeeklyDelivery = document.getElementById('pricePerTwoWeeks');
            const monthlyDelivery = document.getElementById('pricePerMonth');

            //Evaluate and print the price depending on the weight selected
            if(cardHeading == '250g') {
                weeklyDelivery.innerHTML = '7.20';
                biWeeklyDelivery.innerHTML = '9.60';
                monthlyDelivery.innerHTML = '12.00'
            } else if(cardHeading == '500g') {
                weeklyDelivery.innerHTML = '13.00';
                biWeeklyDelivery.innerHTML = '17.50';
                monthlyDelivery.innerHTML = '22.00'
            } else if(cardHeading == '1000g') {
                weeklyDelivery.innerHTML = '22.00';
                biWeeklyDelivery.innerHTML = '32.00';
                monthlyDelivery.innerHTML = '42.00';
            }
        }
    }
//Call the nested function
showPricesPerShipment()

}



//Function: Calc order total
const orderTotal = () => { 
    const deliveryIntervals = document.querySelectorAll("[data-option-selected=frequency]")
    deliveryIntervals.forEach(option => {
        
        if(option.classList.contains('selected')) {
            const pricePerShipment = parseFloat(document.querySelector('.selected.frequency .price').innerText);
            let priceToPrintToModal = document.getElementById('modal-price');
            let orderValue; 
            const interval = option.firstElementChild.innerText;
            if (interval === 'Every week') {
                orderValue = pricePerShipment * 4;
                priceToPrintToModal.textContent = orderValue.toFixed(2);
                console.log(priceToPrintToModal);
            } else if (interval === 'Every 2 weeks') {
                orderValue = pricePerShipment * 2;
                priceToPrintToModal.textContent = orderValue.toFixed(2);
                console.log(priceToPrintToModal);
            } else if (interval === 'Every month') {
                orderValue = pricePerShipment;
                priceToPrintToModal.textContent = orderValue.toFixed(2);
                console.log(priceToPrintToModal);
            }
            //Call the function when there's a price to display
            
            displayOrderInModal();
        }
    })
}

const constructOrderButton = () => {
    const placeOrderWrapper = document.getElementById('button-wrapper');
    const innerViewportWidth = window.innerWidth
    let placeOrderButton;
    if(innerViewportWidth >= 768) {
        placeOrderButton = '<p class="order-price">$<span id="modal-price">14.00</span> / mo</p>';
        placeOrderButton += '<button class="btn" id="checkout">Checkout</button>';
        placeOrderWrapper.innerHTML = placeOrderButton;
    } else if(innerViewportWidth < 768) {
        placeOrderButton = '<button class="btn" id="checkout">Checkout - $<span id="modal-price">14.00</span> / mo</button>'
        placeOrderWrapper.innerHTML = placeOrderButton;
    }

    
}
//MODAL 
const displayOrderInModal = () => {
    const message = document.getElementById('order-description').innerHTML;
    const messagePlaceholder= document.getElementById('orderMessage');
    
    messagePlaceholder.innerHTML = message;    
}

const showModal = () => {
const modal = document.querySelector('.modal');
modal.style.display = 'flex';

disableScroll()
}



//Add a click eventlistener to each of the cards
const cards = document.querySelectorAll('.option');
cards.forEach(card => {
    card.addEventListener('click', () => {

        //Change color of the card on click
        changeCardColor(card);
        //Update the order summary text with the user's order details
        saveSelectedOption(card); 
    })
})


document.getElementById('btn-order').addEventListener('click', () => {
    showModal();
    constructOrderButton();
    orderTotal();

});

document.querySelector('.modal').addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.style.display = "none";
    disableScroll();
})    

document.querySelector('#checkout').addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.style.display = "none";
    disableScroll();
})



//Improvements:
//Only update the price in the modal on button click
//Assign the value from orderTotal() to a variable and use in another function
//OR at least only write this: priceToPrintToModal.textContent = orderValue.toFixed(2); once within orderTotal()
//Write with less code 
//Better naming convention & comments
