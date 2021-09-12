import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post('/', isAuth, expressAsyncHandler(
    async (req, res) => {
        console.log(req.body);
        if (req.body.cartItems.length === 0) {
            res.status(400).send({ message: 'No se agregaron artículos al carrito.' });
        } else {
            const order = new Order({
                orderItems: req.body.cartItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                shippingPrice: req.body.shippingPrice,
                itemsPrice: req.body.itemsPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
            });
            const createdOrder = await order.save();
            res.status(201).send({ message: 'Orden creada', order: createdOrder });
        }
    }
));

orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: 'Orden no encontrada' });
    }
}));

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        };
        const updatedOrder = await order.save();
        res.send({ message: 'Orden pagada', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Orden no encontrada' });
    }
}));

export default orderRouter;