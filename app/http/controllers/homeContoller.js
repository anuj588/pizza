const Menu = require('../../models/menu')


function homeController() {
    return {
        async index(req, res) {

            const pizzas = await Menu.find()
            return res.render('home', { pizzas: pizzas })


        },

        // async index(req, res) {
        //     const orders = await Order.find({ customerId: req.user._id })
        //     console.log(req.user.name)
        //     res.render('profile', { orders})}
           
        
    }
}
    module.exports = homeController