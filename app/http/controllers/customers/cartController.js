function cartController() {
    return {
        index(req, res) {
            res.render('customers/cart')
        },

        update(req, res) {
            //for the first time creating cart and adding basic structure
            if (!req.session.cart){
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart

            // cheak if item doesn't exist in cart

            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    // items: req.body,
                    item: req.body,
                    qty: 1
                }
                // if cart has something before then add new new qty also
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrice = cart.totalPrice + req.body.price


            }

            // now if cart already has item then
            else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }

            return res.json({ totalQty: req.session.cart.totalQty })
        }
    }
}
module.exports = cartController