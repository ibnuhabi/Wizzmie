import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
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

    if (!formCheckout.firstName || !formCheckout.email || !formCheckout.phone) {
      alert("Mohon isi data yang diperlukan!");
      return;
    }

    try {
      const totalAmount = product.harga * quantity;

      const res = await axios.post("http://localhost:5000/api/checkout", {
        orderId: `INV-${Date.now()}`,
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

      const token = res.data.token;

      // Panggil Snap popup
      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log("success:", result);
          alert("Pembayaran berhasil!");
          navigate("/");
        },
        onPending: function (result) {
          console.log("pending:", result);
          alert("Pembayaran pending!");
        },
        onError: function (result) {
          console.log("error:", result);
          alert("Terjadi kesalahan pembayaran!");
        },
        onClose: function () {
          console.log("popup closed");
          alert("Anda menutup popup tanpa membayar");
        },
      });
    } catch (err) {
      console.error(err);
      alert("Gagal membuat transaksi!");
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