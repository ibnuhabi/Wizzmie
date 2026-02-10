    import db from "../db/connection.js";

    // GET ALL ORDERS
    // GET ALL ORDERS - PERBAIKI
    export const createOrder = async (req, res) => {
        try {
            const {
                product_id,
                customer_name,
                customer_email,
                customer_phone,
                quantity = 1
            } = req.body;

            console.log("📝 Creating order with data:", req.body);

            // 1️⃣ Validasi input
            if (!product_id || !customer_name || !customer_email) {
                return res.status(400).json({
                    success: false,
                    message: "product_id, customer_name, and customer_email are required"
                });
            }

            // 2️⃣ Get product info
            const [products] = await db.execute(
                `SELECT * FROM products WHERE id = ?`,
                [product_id]
            );

            if (products.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            const product = products[0];
            const totalPrice = product.harga * quantity;

            // 3️⃣ Generate order code
            const orderCode = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

            // 4️⃣ Insert ke tabel orders
            const [orderResult] = await db.execute(
                `INSERT INTO orders (order_code, product_id, price, quantity, status) 
                VALUES (?, ?, ?, ?, 'pending')`,
                [orderCode, product_id, totalPrice, quantity]
            );

            const orderId = orderResult.insertId;

            console.log("✅ Order created with ID:", orderId);

            // 5️⃣ Insert ke tabel payments
            const [paymentResult] = await db.execute(
                `INSERT INTO payments (
                    order_id, 
                    customer_name, 
                    customer_email, 
                    customer_phone, 
                    amount, 
                    status
                ) VALUES (?, ?, ?, ?, ?, 'pending')`,
                [orderId, customer_name, customer_email, customer_phone, totalPrice]
            );

            console.log("✅ Payment record created with ID:", paymentResult.insertId);

            // 6️⃣ Return response
            res.status(201).json({
                success: true,
                message: "Order created successfully",
                data: {
                    order_id: orderId,
                    order_code: orderCode,
                    product_name: product.nama_produk,
                    customer_name,
                    customer_email,
                    total_price: totalPrice,
                    status: 'pending'
                }
            });

        } catch (error) {
            console.error("❌ Error creating order:", error);
            res.status(500).json({
                success: false,
                message: "Failed to create order: " + error.message
            });
        }
    };

    // controllers/orderController.js - UPDATE
    export const getAllOrders = async (req, res) => {
        try {
            console.log("📦 GET /api/orders - Query:", req.query);

            const { status, search, page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;

            // **QUERY DENGAN JOIN payments UNTUK DAPATKAN CUSTOMER INFO**
            let query = `
        SELECT 
            o.*,
            p.nama_produk as product_name,
            p.image as product_image,
            pm.customer_name,
            pm.customer_email,
            pm.status as payment_status,
            pm.gateway,
            pm.method,
            pm.transaction_id,
            pm.amount as payment_amount
        FROM orders o
        LEFT JOIN products p ON o.product_id = p.id
        LEFT JOIN payments pm ON o.id = pm.order_id
        WHERE 1=1
        `;

            const params = [];

            // Filter status
            if (status && status.trim() !== '') {
                query += ` AND o.status = ?`;
                params.push(status);
            }

            // Filter search
            if (search && search.trim() !== '') {
                query += ` AND (
            o.order_code LIKE ? 
            OR pm.customer_name LIKE ? 
            OR pm.customer_email LIKE ?
        )`;
                const searchTerm = `%${search}%`;
                params.push(searchTerm, searchTerm, searchTerm);
            }

            // **FIX: Jangan gunakan prepared statement untuk LIMIT/OFFSET**
            query += ` ORDER BY o.created_at DESC LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;

            console.log("🔍 Query:", query.replace(/\s+/g, ' '));
            console.log("🔍 Params:", params);

            const [orders] = await db.execute(query, params);
            console.log(`✅ Found ${orders.length} orders`);

            // Count query
            let countQuery = `
        SELECT COUNT(*) as total 
        FROM orders o
        LEFT JOIN payments pm ON o.id = pm.order_id
        WHERE 1=1
        `;
            const countParams = [];

            if (status && status.trim() !== '') {
                countQuery += ` AND o.status = ?`;
                countParams.push(status);
            }

            if (search && search.trim() !== '') {
                countQuery += ` AND (
            o.order_code LIKE ? 
            OR pm.customer_name LIKE ? 
            OR pm.customer_email LIKE ?
        )`;
                const searchTerm = `%${search}%`;
                countParams.push(searchTerm, searchTerm, searchTerm);
            }

            const [countResult] = await db.execute(countQuery, countParams);
            const total = countResult[0].total;

            res.json({
                success: true,
                data: orders,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: parseInt(total),
                    totalPages: Math.ceil(parseInt(total) / parseInt(limit))
                }
            });

        } catch (error) {
            console.error("❌ Error in getAllOrders:", error.message);

            // Fallback query tanpa payments
            try {
                const fallbackQuery = `
            SELECT o.*, p.nama_produk as product_name, p.image as product_image
            FROM orders o
            LEFT JOIN products p ON o.product_id = p.id
            ORDER BY o.created_at DESC
            LIMIT 10
        `;

                const [fallbackOrders] = await db.execute(fallbackQuery);

                res.json({
                    success: true,
                    data: fallbackOrders,
                    pagination: {
                        page: 1,
                        limit: 10,
                        total: fallbackOrders.length,
                        totalPages: 1
                    }
                });
            } catch (fallbackError) {
                res.status(500).json({
                    success: false,
                    message: "Database error: " + error.message
                });
            }
        }
    };
    // GET ORDER STATS
    export const getOrderStats = async (req, res) => {
        try {
            console.log("📊 GET /api/orders/stats/overview");

            const [result] = await db.execute(`
        SELECT 
            COUNT(*) as total_orders,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_orders,
            SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_orders,
            SUM(CASE WHEN status = 'processing' THEN 1 ELSE 0 END) as processing_orders,
            COALESCE(SUM(price), 0) as total_revenue
        FROM orders
        `);

            console.log("✅ Stats:", result[0]);

            res.json({
                success: true,
                data: result[0]
            });
        } catch (error) {
            console.error("❌ Error getting stats:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    };

    // GET ORDER BY ID
    export const getOrderById = async (req, res) => {
        try {
            const { id } = req.params;

            console.log("📋 GET /api/orders/:id -", id);

            const [result] = await db.execute(`
        SELECT 
            o.*,
            p.nama_produk as product_name,
            p.deskripsi as product_description,
            p.image as product_image,
            pm.id as payment_id,
            pm.customer_name,
            pm.customer_email,
            pm.gateway,
            pm.method,
            pm.amount as payment_amount,
            pm.status as payment_status,
            pm.transaction_id
        FROM orders o
        LEFT JOIN products p ON o.product_id = p.id
        LEFT JOIN payments pm ON o.id = pm.order_id
        WHERE o.id = ?
        `, [id]);

            if (result.length === 0) {
                return res.status(404).json({ success: false, message: "Order not found" });
            }

            res.json({ success: true, data: result[0] });
        } catch (error) {
            console.error("❌ Error getting order:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    };

    // UPDATE ORDER STATUS
    export const updateOrderStatus = async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ success: false, message: "Invalid status" });
            }

            await db.execute(
                `UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?`,
                [status, id]
            );

            console.log(`✅ Order ${id} updated to ${status}`);

            res.json({ success: true, message: "Order updated" });
        } catch (error) {
            console.error("❌ Error updating order:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    };

    // DELETE ORDER
    export const deleteOrder = async (req, res) => {
        try {
            const { id } = req.params;

            await db.execute(`DELETE FROM orders WHERE id = ?`, [id]);

            console.log(`✅ Order ${id} deleted`);

            res.json({ success: true, message: "Order deleted" });
        } catch (error) {
            console.error("❌ Error deleting order:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    };