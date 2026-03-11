import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-cafe-key-2026';

// Middleware to verify staff/admin token
const requireAuth = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// GET all menu items (Public)
router.get('/', async (req, res) => {
    try {
        const items = await prisma.menuItem.findMany({
            orderBy: { category: 'asc' }
        });
        res.json(items);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST new menu item (Protected)
router.post('/', requireAuth, async (req: any, res: any) => {
    try {
        const { name, description, price, category, imageUrl, isAvailable } = req.body;
        
        const newItem = await prisma.menuItem.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                category,
                imageUrl,
                isAvailable: isAvailable !== undefined ? isAvailable : true
            }
        });
        
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error creating menu item:', error);
        res.status(500).json({ error: 'Failed to create menu item' });
    }
});

// PUT update a menu item (Protected)
router.put('/:id', requireAuth, async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, imageUrl, isAvailable } = req.body;
        
        const dataToUpdate: any = {};
        if (name !== undefined) dataToUpdate.name = name;
        if (description !== undefined) dataToUpdate.description = description;
        if (price !== undefined) dataToUpdate.price = parseFloat(price);
        if (category !== undefined) dataToUpdate.category = category;
        if (imageUrl !== undefined) dataToUpdate.imageUrl = imageUrl;
        if (isAvailable !== undefined) dataToUpdate.isAvailable = isAvailable;

        const updatedItem = await prisma.menuItem.update({
            where: { id },
            data: dataToUpdate
        });
        
        res.json(updatedItem);
    } catch (error) {
        console.error('Error updating menu item:', error);
        res.status(500).json({ error: 'Failed to update menu item' });
    }
});

// DELETE a menu item (Protected)
router.delete('/:id', requireAuth, async (req: any, res: any) => {
    try {
        const { id } = req.params;
        await prisma.menuItem.delete({
            where: { id }
        });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting menu item:', error);
        res.status(500).json({ error: 'Failed to delete menu item' });
    }
});

export default router;
