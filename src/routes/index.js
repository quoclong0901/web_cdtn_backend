const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const OrderRouter = require('./OrderRouter')
const PaymentRouter = require('./PaymentRouter')


const routes = (app) => {
    app.use('/api/user', UserRouter) // dùng .use để có thể chứa 1 Router với nhiều endpoint khác nhau
    app.use('/api/product', ProductRouter) 
    app.use('/api/order', OrderRouter) 
    app.use('/api/payment', PaymentRouter) 
}

module.exports = routes