const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
function authController() {

    const _getRedirectUrl = (req) => {
        return req.user.role === 'admin' ? '/admin/orders' : '/customer/orders'
    }


    return {
        login(req, res) {
            res.render('auth/login')
        },

        postLogin(req, res, next) {
            passport.authenticate('local', (err, user, info) => {

                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }

                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect(_getRedirectUrl(req))
                })

            })(req, res, next)
        },







        register(req, res) {
            res.render('auth/register')
        },


        async postRegister(req, res) {
            const { name, email, password } = req.body;
            // validationj error
            if (!name || !email || !password) {
                req.flash('error', 'All Fields Are Required')
                req.flash("name", name)
                req.flash("email", email)

                return res.redirect('/register')
            }
            //cheack if email exist

            User.exists({ email: email }, (err, result) => {
                if (result) {
                    req.flash('error', 'Email Already Taken')
                    req.flash("name", name)
                    req.flash("email", email)
                    return res.redirect('/register')
                }

            })

            // hash paasword

            const hashPassword = await bcrypt.hash(password, 10)


            // create a user


            const user = new User({
                name: name,
                email: email,
                password: hashPassword
            })
            user.save().then((user) => {
                // Login
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Something Went Wrong')
                return res.redirect('/register')
            })




        },

        logout(req, res) {
            req.logout()
            return res.redirect('/')
        }
    }
}
module.exports = authController