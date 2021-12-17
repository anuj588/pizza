import axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza) {
    // when click on any pizza that will added on cart using ajax using fetch api or axios
    // now we have send post request because we have to send data
    axios.post('/update-cart', pizza).then((res) => {
        console.log(res)
        cartCounter.innerText = res.data.totalQty

        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item Added To Cart'
        }).show();
    }).catch(err => {

        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something Went Wrong'
        }).show();

    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        console.log(pizza)
    })

})