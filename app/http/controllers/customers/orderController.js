const Order = require('../../../models/order')
const moment = require('moment')

function orderController() {
    return {
        store(req, res) {

            //validate request
            // console.log(req.body)
            const { phone, address } = req.body

            if (!phone || !address) {

                req.flash('error', 'All Field Are Required')
                return res.redirect('/cart')

            }
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone: phone,
                address: address
            })
            order.save().then(result => {
                Order.populate(result, { path: 'customerId' }, (err, placedOrdered) => {
                    req.flash('success', 'Order Place Succesfully')
                    delete req.session.cart
                    //emit 
                    const eventEmitter = req.app.get('eventEmitter')
                    eventEmitter.emit('orderPlaced', placedOrdered)


                    return res.redirect('/customer/orders')
                })

            }).catch(err => {
                req.flash('error', 'Something Went Wrong')
                return res.redirect('/cart')
            })

        },
        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id }, null, { sort: { 'createdAt': -1 } })
            // console.log(req.user.name)
            res.header('Cache-Control',  'no-store')
            res.render('customers/orders', { orders: orders, moment: moment })
            // console.log(orders)
        },

        async show(req, res) {
            const order = await Order.findById(req.params.id)

            //authorize user

            if (req.user._id.toString() === order.customerId.toString()) {
                return res.render('customers/singleOrder', { order })
            }
            return res.redirect('/')



        }
    }
}


module.exports = orderController