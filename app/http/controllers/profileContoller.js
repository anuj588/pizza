const User = require('../../models/user')

function profileController() {
    return {
        profile(req, res) {
            let id = req.user.id
            User.findById({ id })
            res.render('profile', { user: req.user })
        }

    }
}

module.exports = profileController 
