    import { useEffect, useState } from "react";
    import { useParams, useNavigate } from "react-router-dom";
    import axios from "axios";

    export default function ProductDetail() {
      const { id } = useParams();
      const navigate = useNavigate();

      const [product, setProduct] = useState(null);
      const [loading, setLoading] = useState(true);
      const [quantity, setQuantity] = useState(1);
      const [processingPayment, setProcessingPayment] = useState(false);

      const [formCheckout, setFormCheckout] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        notes: "",
      });

      // Fetch product detail
      useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setProduct(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      }, [id]);

      const handleCheckout = async (e) => {
        e.preventDefault();

        // Validasi form
        if (!formCheckout.firstName || !formCheckout.email || !formCheckout.phone) {
          alert("Mohon isi semua data yang diperlukan!");
          return;
        }

        // Validasi email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formCheckout.email)) {
          alert("Format email tidak valid!");
          return;
        }

        // Validasi nomor HP (Indonesia)
        const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
        if (!phoneRegex.test(formCheckout.phone)) {
          alert("Format nomor HP tidak valid!");
          return;
        }

        setProcessingPayment(true);

        try {
          const totalAmount = product.harga * quantity;

          console.log("🔄 Starting checkout process...");
          console.log("📤 Request data:", {
            orderId: `WIZZMIE-${Date.now()}`,
            grossAmount: totalAmount,
            productId: product.id,
            customer: formCheckout
          });

          // ✅ KIRIM DATA LENGKAP KE BACKEND
          const res = await axios.post("http://localhost:5000/api/checkout", {
            orderId: `WIZZMIE-${Date.now()}`,
            grossAmount: totalAmount,
            customer: {
              firstName: formCheckout.firstName,
              lastName: formCheckout.lastName,
              email: formCheckout.email,
              phone: formCheckout.phone,
            },
            itemDetails: [
              {
                id: product.id,
                name: product.nama_produk,
                price: product.harga,
                quantity: quantity,
              },
            ],
          });

          console.log("✅ Backend response:", res.data);

          if (!res.data.success) {
            console.error("❌ Backend returned error:", res.data.message);
            throw new Error(res.data.message || "Checkout failed");
          }

          // ✅ FIX: Token ada di res.data.data.token (bukan res.data.token)
          const snapToken = res.data.data?.token;

          console.log("📦 Full response data:", res.data.data);
          console.log("🔑 Snap token:", snapToken);

          if (!snapToken) {
            console.error("❌ No token in response:", res.data);
            throw new Error("No payment token received from server");
          }

          // Cek jika token adalah test token
          if (snapToken.startsWith('test-token') || snapToken.startsWith('no-token')) {
            console.warn("⚠️ Received test token - Midtrans might not be configured");
            alert("⚠️ Mode testing aktif. Midtrans belum dikonfigurasi. Order berhasil dibuat!");
            navigate("/", { state: { paymentSuccess: true } });
            return;
          }

          console.log("🔗 Snap token received:", snapToken.substring(0, 20) + "...");

          // Pastikan Snap.js sudah loaded
          if (typeof window.snap === 'undefined') {
            throw new Error("Midtrans Snap.js not loaded");
          }

          // Panggil Midtrans Snap
          window.snap.pay(snapToken, {
            onSuccess: function (result) {
              console.log("✅ Payment Success:", result);
              alert("✅ Pembayaran berhasil! Terima kasih telah berbelanja.");
              navigate("/", { state: { paymentSuccess: true } });
            },
            onPending: function (result) {
              console.log("⏳ Payment Pending:", result);
              alert("⏳ Pembayaran sedang diproses. Silakan selesaikan pembayaran Anda.");
              navigate("/", { state: { paymentPending: true } });
            },
            onError: function (result) {
              console.log("❌ Payment Error:", result);
              alert("❌ Terjadi kesalahan dalam pembayaran. Silakan coba lagi.");
              setProcessingPayment(false);
            },
            onClose: function () {
              console.log("⚠️ Payment popup closed");
              alert("⚠️ Anda menutup popup pembayaran. Transaksi dibatalkan.");
              setProcessingPayment(false);
            },
          });
        } catch (err) {
          console.error("❌ Checkout Error Details:");
          console.error("Error message:", err.message);
          console.error("Error response:", err.response?.data);
          console.error("Error status:", err.response?.status);

          // Tampilkan error spesifik
          let errorMessage = "❌ Gagal membuat transaksi. Silakan coba lagi.";

          if (err.response?.data?.message) {
            errorMessage = `❌ ${err.response.data.message}`;
          } else if (err.message.includes("Network Error")) {
            errorMessage = "❌ Koneksi ke server terputus. Periksa koneksi internet Anda.";
          } else if (err.message.includes("timeout")) {
            errorMessage = "❌ Waktu permintaan habis. Server mungkin sibuk.";
          } else if (err.message.includes("No payment token")) {
            errorMessage = "❌ Token pembayaran tidak diterima. Silakan hubungi admin.";
          }

          alert(errorMessage);
          setProcessingPayment(false);
        }
      };

      if (loading) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-xl">Loading...</p>
          </div>
        );
      }

      if (!product) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-xl">Produk tidak ditemukan</p>
          </div>
        );
      }

      const totalPrice = product.harga * quantity;

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
          <div className="container mx-auto px-6 lg:px-16">
            {/* Back Button */}
            <button
              onClick={() => navigate("/")}
              className="mb-8 flex items-center gap-2 text-rose-600 font-bold hover:gap-4 transition-all"
            >
              ← Kembali ke Menu
            </button>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Product Image & Info */}
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-8 shadow-xl">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                    <img
                      src={`http://localhost:5000/images/produk/${product.image}`}
                      alt={product.nama_produk}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h1 className="text-4xl font-black text-gray-900 mb-4">
                    {product.nama_produk}
                  </h1>

                  <div className="text-3xl font-black text-rose-600 mb-4">
                    {Number(product.harga).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {product.deskripsi || "Deskripsi produk belum tersedia."}
                  </p>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full font-bold uppercase">
                      {product.tipe}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h2 className="text-2xl font-black mb-6">Form Pemesanan</h2>

                <form onSubmit={handleCheckout} className="space-y-4">
                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-bold mb-2">Jumlah</label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="bg-gray-200 w-10 h-10 rounded-lg font-bold hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="text-2xl font-bold w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="bg-gray-200 w-10 h-10 rounded-lg font-bold hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Nama Depan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formCheckout.firstName}
                      onChange={(e) =>
                        setFormCheckout({ ...formCheckout, firstName: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-rose-600 focus:outline-none"
                      placeholder="John"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-bold mb-2">Nama Belakang</label>
                    <input
                      type="text"
                      value={formCheckout.lastName}
                      onChange={(e) =>
                        setFormCheckout({ ...formCheckout, lastName: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-rose-600 focus:outline-none"
                      placeholder="Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formCheckout.email}
                      onChange={(e) =>
                        setFormCheckout({ ...formCheckout, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-rose-600 focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Nomor HP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formCheckout.phone}
                      onChange={(e) =>
                        setFormCheckout({ ...formCheckout, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-rose-600 focus:outline-none"
                      placeholder="08123456789"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-bold mb-2">Alamat</label>
                    <textarea
                      value={formCheckout.address}
                      onChange={(e) =>
                        setFormCheckout({ ...formCheckout, address: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-rose-600 focus:outline-none resize-none"
                      rows="3"
                      placeholder="Jl. Contoh No. 123"
                    ></textarea>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-bold mb-2">Catatan</label>
                    <textarea
                      value={formCheckout.notes}
                      onChange={(e) =>
                        setFormCheckout({ ...formCheckout, notes: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-rose-600 focus:outline-none resize-none"
                      rows="2"
                      placeholder="Catatan tambahan untuk pesanan"
                    ></textarea>
                  </div>

                  {/* Total */}
                  <div className="bg-gray-50 rounded-xl p-4 mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-bold">
                        {Number(product.harga * quantity).toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        })}
                      </span>
                    </div>
                    <div className="border-t pt-2 flex justify-between items-center">
                      <span className="text-xl font-black">Total</span>
                      <span className="text-2xl font-black text-rose-600">
                        {Number(totalPrice).toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose-600 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-rose-700 hover:to-orange-700 transition-all hover:scale-105 shadow-xl"
                  >
                    Lanjut Pembayaran
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }