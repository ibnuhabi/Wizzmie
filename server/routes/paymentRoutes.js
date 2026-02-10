import express from "express";
import db from "../db/connection.js";

const router = express.Router();

// Get all payments
router.get('/', async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        let query = `
            SELECT 
                pm.*,
                o.order_code,
                o.status as order_status,
                p.nama_produk as product_name
            FROM payments pm
            LEFT JOIN orders o ON pm.order_id = o.id
            LEFT JOIN products p ON o.product_id = p.id
            WHERE 1=1
        `;

        const params = [];

        if (status && status.trim() !== '') {
            query += ` AND pm.status = ?`;
            params.push(status);
        }

        query += ` ORDER BY pm.created_at DESC LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;

        const [payments] = await db.execute(query, params);

        // Get total count
        let countQuery = `SELECT COUNT(*) as total FROM payments pm WHERE 1=1`;
        const countParams = [];

        if (status && status.trim() !== '') {
            countQuery += ` AND pm.status = ?`;
            countParams.push(status);
        }

        const [totalResult] = await db.execute(countQuery, countParams);
        const total = parseInt(totalResult[0].total);

        res.json({
            success: true,
            data: payments,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('❌ Error fetching payments:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get payment detail
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT 
                pm.*,
                o.order_code,
                o.price as order_price,
                o.status as order_status,
                p.nama_produk as product_name
            FROM payments pm
            LEFT JOIN orders o ON pm.order_id = o.id
            LEFT JOIN products p ON o.product_id = p.id
            WHERE pm.id = ?
        `;

        const [result] = await db.execute(query, [id]);

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        res.json({ success: true, data: result[0] });
    } catch (error) {
        console.error('❌ Error fetching payment:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update payment status
router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'settlement', 'expire', 'cancel', 'deny'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const [result] = await db.execute(
            `UPDATE payments SET status = ? WHERE id = ?`,
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        res.json({ success: true, message: 'Payment status updated' });
    } catch (error) {
        console.error('❌ Error updating payment:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;