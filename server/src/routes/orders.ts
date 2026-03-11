import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all orders (for Kitchen Dashboard and Admin)
router.get('/', async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: { items: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single order
router.get('/:id', async (req, res) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: req.params.id },
            include: { items: true }
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new order
router.post('/', async (req, res) => {
    try {
        const { tableNumber, subtotal, tax, total, items } = req.body;

        const order = await prisma.order.create({
            data: {
                tableNumber,
                subtotal,
                tax,
                total,
                status: 'pending',
                items: {
                    create: items.map((item: any) => ({
                        itemName: item.itemName,
                        price: item.price,
                        quantity: item.quantity
                    }))
                }
            },
            include: { items: true }
        });

        // Notify Kitchen Dashboard of new order
        const io = (req as any).io;
        if (io) {
            io.emit('new_order', order);
        }

        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Update order status (Kitchen -> Complete)
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;

        let order;

        if (status === 'cancelled') {
            // If the order is being cancelled, delete it entirely from the database
            order = await prisma.order.delete({
                where: { id: req.params.id },
                include: { items: true }
            });
            // Override the status on the returned object so socket/frontend knows it was cancelled
            order.status = 'cancelled';
        } else {
            // Otherwise, just update the status
            order = await prisma.order.update({
                where: { id: req.params.id },
                data: { status },
                include: { items: true }
            });
        }

        // Notify Kitchen and Customer Order Status Page
        const io = (req as any).io;
        if (io) {
            io.emit('order_updated', order);
        }

        res.json(order);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

export default router;
