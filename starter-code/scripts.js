/* Animate the mobile Nav */
const toggle = document.querySelector('.toggle');
toggle.addEventListener('click', () => {
    const mainNavigation = document.querySelector('.main-navigation');
    const hamburgerOpen = document.querySelector('.hamburger-open');
    const hamburgerClose = document.querySelector('.hamburger-close');
    mainNavigation.classList.toggle('open');
    hamburgerOpen.classList.toggle('mobile-nav-open');
    hamburgerClose.classList.toggle('mobile-nav-open');

    preventScroll();
});

function preventScroll() {
    const pageBody = document.querySelector('body');
    pageBody.classList.toggle('preventScroll');

}

/* Animate the accordion */

const accordions = document.querySelectorAll('.accordion')
accordions.forEach(accordion => {
    accordion.addEventListener('click', () => {
        const accordionWrapper = accordion.parentElement;
        accordionWrapper.classList.toggle('accordionActive')
        accordion.classList.toggle('accordionActive');
        const panel = accordion.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }     
    })
    
})

/* Build summary text */

const options = document.querySelectorAll('.option');
let userPreference;
let userBeanType;
let userQuantity;
let userGrindOption; 
let userFrequency;

options.forEach(option => {
    option.addEventListener('click', () => { 

        //Update the background color of the clicked option
        const parent = option.parentElement
        const children = Array.from(parent.children)
        children.forEach(child => {
            child.classList.remove('selected')
        })   
        option.classList.add('selected');

        //Get the data-attribute of the clicked option
        dataAttr = option.dataset.optionSelected

        //Get the heading of the clicked option
        const heading = option.firstElementChild.textContent

        
        //Use the dataAttr and heading to determine which option was clicked -> assign heading to different
        //variable depending on the clicked option
            if(dataAttr === 'preference') {
                if(heading === 'Capsule') {
                    const dataAttribute = dataAttr.toString()
                    const grindHeading = document.getElementById('grindHeading').style.color = "hsla(215, 5%, 54%, 49%)";
                    const grindHeadingTwo = document.getElementById('grindHeading').parentElement;
                    grindHeadingTwo.style.pointerEvents = "none";
                    document.getElementById(dataAttribute).classList.add('hidePlaceHolder');
                    document.getElementById('preference').textContent = `${heading}`; 
                    document.getElementById('asOrUsing').textContent = `using `; 
                    document.getElementById('hideGrindOption').style.display = "none";
                }
                if(heading != 'Capsule') {
                    const dataAttribute = dataAttr.toString()
                    const grindHeading = document.getElementById('grindHeading').style.color = "hsl(215, 5%, 54%)";
                    const grindHeadingTwo = document.getElementById('grindHeading').parentElement;
                    grindHeadingTwo.style.pointerEvents = "auto";
                    document.getElementById(dataAttribute).classList.add('hidePlaceHolder');
                    document.getElementById('preference').textContent = `${heading}`; 
                    document.getElementById('asOrUsing').textContent = `as `; 
                    document.getElementById('hideGrindOption').style.display = "inline";
                }
        } else if(dataAttr === 'beanType'){
            const dataAttribute = dataAttr.toString()
            document.getElementById(dataAttribute).classList.add('hidePlaceHolder'); 
            document.getElementById('beanType').textContent = `${heading}`;

        } else if(dataAttr === 'quantity'){
            const dataAttribute = dataAttr.toString()
            document.getElementById(dataAttribute).classList.add('hidePlaceHolder');
            document.getElementById('quantity').textContent = `${heading}`;

        } else if(dataAttr === 'grindOption'){
            const dataAttribute = dataAttr.toString()
            document.getElementById(dataAttribute).classList.add('hidePlaceHolder');
            document.getElementById('grindOption').textContent = `${heading}`;

        } else if(dataAttr === 'frequency'){
            const dataAttribute = dataAttr.toString()
            document.getElementById(dataAttribute).classList.add('hidePlaceHolder');
            document.getElementById('frequency').textContent = `${heading}`;
        }

    })
})

document.getElementById('btn-order').addEventListener('click', () => {
    modalMessage()
    priceForModal()
})

function modalMessage () {
    const message = document.getElementById('order-description').innerHTML;
    const messageDestination = document.getElementById('orderMessage');
    
    messageDestination.innerHTML = message; 

    document.querySelector('.modal').style.display = 'flex';
}


function showPrice() {
    const quantitySelected = document.getElementById('quantity').textContent
    console.log(quantitySelected)
    const everyWeekDelivery = document.getElementById('pricePerWeek');
    const everyTwoWeekDelivery = document.getElementById('pricePerTwoWeeks');
    const everyMonthDelivery = document.getElementById('pricePerMonth');

    if(quantitySelected == '250g') {
        everyWeekDelivery.innerHTML = '7.20';
        everyTwoWeekDelivery.innerHTML = '9.60';
        everyMonthDelivery.innerHTML = '12.00'
    } else if(quantitySelected == '500g') {
        everyWeekDelivery.innerHTML = '13.00';
        everyTwoWeekDelivery.innerHTML = '17.50';
        everyMonthDelivery.innerHTML = '22.00'
    } else if(quantitySelected == '1000g') {
        everyWeekDelivery.innerHTML = '22.00';
        everyTwoWeekDelivery.innerHTML = '32.00';
        everyMonthDelivery.innerHTML = '42.00';
    }
}

function priceForModal() {
    const price = parseFloat(document.querySelector('.selected[data-option-selected="frequency"] .price').textContent)
    const heading = document.querySelector('.selected[data-option-selected="frequency"] .heading-sm').textContent
    console.log(price, heading)
    let modalPrice = document.getElementById('modal-price');
    let newPrice;
    if(heading == 'Every week') {
        newPrice = price * 4
        modalPrice.textContent = newPrice.toFixed(2)
    } else if(heading == 'Every 2 weeks') {
        newPrice = price * 2
        modalPrice.textContent = newPrice.toFixed(2)
    } else if(heading == 'Every month') {
        newPrice = price 
        modalPrice.textContent = newPrice.toFixed(2)
    }
}

const sizeOfOrder = document.querySelectorAll('.quantity')
sizeOfOrder.forEach(card => {
    card.addEventListener('click', () => {
        showPrice()
        priceForModal()
    })
})

const frequencyOfDelivery = document.querySelectorAll('.frequency')
frequencyOfDelivery.forEach(card => {
    card.addEventListener('click', () => {
        console.log('test')
        priceForModal()
    })
})



function buildOrderButton() {
    const buttonDiv = document.getElementById('button-wrapper');
    const innerViewportWidth = window.innerWidth
    let button;
    if(innerViewportWidth >= 768) {
        button = '<p class="order-price">$<span id="modal-price">14.00</span> / mo</p>';
        button += '<button class="btn" id="checkout">Checkout</button>';
        buttonDiv.innerHTML = button;
        console.log(innerViewportWidth, button)
    } else if(innerViewportWidth < 768) {
        button = '<button class="btn" id="checkout">Checkout - $<span id="modal-price">14.00</span> / mo</button>'
        buttonDiv.innerHTML = button;
        console.log(innerViewportWidth, button)
    }
    
}


document.getElementById('btn-order').addEventListener('click', () => {
    buildOrderButton()
    priceForModal()
    preventScroll()

})


/*Clean up scripts 

- try writing function expressions instead of declarations - arrange for hoisting
- test if the price can be calculated with something that more resembles a shopping cart - > push to array
- which variables could benefit from a global scope?
- make functions return something and store that in a new variable?
- add comments
- improve naming convention - > e.g. function names, variables and should classes and ids use camel case 
in the html if they are intended for JS

*/
    page = document.querySelector('body');
    

    function logEvent(event) {
        console.log(event.target)
    }

    page.addEventListener('click', () => {
        console.log('hi')
    });