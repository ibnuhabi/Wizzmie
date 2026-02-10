import midtransClient from "midtrans-client";

export const createTransaction = async (req, res) => {
  try {
    const { orderId, grossAmount, customer, itemDetails } = req.body;

    // Validasi input
    if (!orderId || !grossAmount || !customer || !itemDetails) {
      return res.status(400).json({ 
        message: "Data tidak lengkap" 
      });
    }

    // Setup Midtrans Snap
    let snap = new midtransClient.Snap({
      isProduction: false, // Set true untuk production
      serverKey: process.env.MIDTRANS_SERVER_KEY || "YOUR_SERVER_KEY",
      clientKey: process.env.MIDTRANS_CLIENT_KEY || "YOUR_CLIENT_KEY",
    });

    // Parameter transaksi
    let parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: customer.firstName,
        last_name: customer.lastName || "",
        email: customer.email,
        phone: customer.phone,
      },
      item_details: itemDetails,
      enabled_payments: [
        "credit_card",
        "mandiri_clickpay",
        "cimb_clicks",
        "bca_klikbca",
        "bca_klikpay",
        "bri_epay",
        "echannel",
        "permata_va",
        "bca_va",
        "bni_va",
        "bri_va",
        "other_va",
        "gopay",
        "indomaret",
        "danamon_online",
        "akulaku",
        "shopeepay",
        "kredivo",
        "uob_ezpay",
      ],
    };

    // Create transaction
    const transaction = await snap.createTransaction(parameter);

    res.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    console.error("Midtrans Error:", error);
    res.status(500).json({ 
      message: "Gagal membuat transaksi",
      error: error.message 
    });
  }
};

// Webhook untuk notifikasi dari Midtrans
export const handleNotification = async (req, res) => {
  try {
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY || "YOUR_SERVER_KEY",
      clientKey: process.env.MIDTRANS_CLIENT_KEY || "YOUR_CLIENT_KEY",
    });

    const statusResponse = await snap.transaction.notification(req.body);
    
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

    // Logic untuk update status order di database
    if (transactionStatus == 'capture') {
      if (fraudStatus == 'challenge') {
        // TODO: Set order status in merchant's database to 'challenge'
        console.log('Transaction challenge');
      } else if (fraudStatus == 'accept') {
        // TODO: Set order status in merchant's database to 'success'
        console.log('Transaction success');
      }
    } else if (transactionStatus == 'settlement') {
      // TODO: Set order status in merchant's database to 'success'
      console.log('Transaction settlement');
    } else if (transactionStatus == 'cancel' || 
               transactionStatus == 'deny' || 
               transactionStatus == 'expire') {
      // TODO: Set order status in merchant's database to 'failure'
      console.log('Transaction failed');
    } else if (transactionStatus == 'pending') {
      // TODO: Set order status in merchant's database to 'pending'
      console.log('Transaction pending');
    }

    res.status(200).json({ message: 'OK' });
  } catch (error) {
    console.error('Notification Error:', error);
    res.status(500).json({ message: 'Error' });
  }
};