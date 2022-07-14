import { initAdmin } from './admin'
import axios from 'axios'
import Noty from 'noty'
import moment from 'moment'


let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza) {
    // when click on any pizza that will added on cart using ajax using fetch api or axios
    // now we have send post request because we have to send data
    axios.post('/update-cart', pizza).then((res) => {
        // console.log(res)
        cartCounter.innerText = res.data.totalQty

        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item Added To Cart',
            
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
        // console.log(pizza)
    })

})

const altMsg = document.querySelector('#success-alert')

if (altMsg) {
    setTimeout(() => {
        altMsg.remove()
    }, 2000);
}



//change order status

let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')



function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')

    })
    let stepCompleted = true;
    statuses.forEach((status) => {
        let dataProp = status.dataset.status
        if (stepCompleted) {
            status.classList.add('step-completed')
        }
        if (dataProp === order.status) {
            stepCompleted = false;
            time.innerText = moment(order.updatedAt).format('hh: mm A')
            status.appendChild(time)
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')
            }

        }
    })
}
updateStatus(order)




// socket client side

let socket = io()


// join 

if (order) {
    socket.emit('join', `order_${order._id}`)
}
// order_nhihiljnioh8jiji

let adminAreaPath = window.location.pathname

if (adminAreaPath.includes('admin')) {
    initAdmin(socket)
    socket.emit('join', 'adminRoom')

}

socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: data.status
    }).show();
    // console.log(data)
}
)