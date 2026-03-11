import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-cafe-key-2026';

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Setup a default admin user for testing
router.post('/setup-admin', async (req, res) => {
    try {
        const existing = await prisma.user.findUnique({ where: { email: 'admin@cafela.com' } });
        if (existing) {
            return res.json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);
        const user = await prisma.user.create({
            data: {
                email: 'admin@cafela.com',
                password: hashedPassword,
                role: 'admin'
            }
        });

        res.json({ message: 'Admin created', email: user.email });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
