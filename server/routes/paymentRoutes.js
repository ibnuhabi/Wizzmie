import express from "express";
// import { authenticateAdmin } from "../middleware/auth.js";
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
        p.name as product_name
      FROM payments pm
      LEFT JOIN orders o ON pm.order_id = o.id
      LEFT JOIN products p ON o.product_id = p.id
      WHERE 1=1
    `;

        const params = [];
        let paramIndex = 1;

        if (status) {
            query += ` AND pm.status = $${paramIndex}`;
            params.push(status);
            paramIndex++;
        }

        query += ` ORDER BY pm.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
        params.push(limit, offset);

        const payments = await db.query(query, params);

        // Get total count
        let countQuery = `SELECT COUNT(*) as total FROM payments pm WHERE 1=1`;
        const countParams = [];

        if (status) {
            countQuery += ` AND pm.status = $1`;
            countParams.push(status);
        }

        const totalResult = await db.query(countQuery, countParams);
        const total = parseInt(totalResult.rows[0].total);

        res.json({
            success: true,
            data: payments.rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ success: false, message: 'Server error' });
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
        p.name as product_name
      FROM payments pm
      LEFT JOIN orders o ON pm.order_id = o.id
      LEFT JOIN products p ON o.product_id = p.id
      WHERE pm.id = $1
    `;

        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error fetching payment:', error);
        res.status(500).json({ success: false, message: 'Server error' });
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

        const query = `
      UPDATE payments 
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;

        const result = await db.query(query, [status, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error updating payment:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router