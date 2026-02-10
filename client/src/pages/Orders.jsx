import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import {
    FaSearch,
    FaEye,
    FaFilter,
    FaShoppingCart,
    FaCheckCircle,
    FaClock,
    FaSpinner,
    FaTimes,
    FaBox,
    FaTrash
} from "react-icons/fa";
import axios from "axios";

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const API_URL = "http://localhost:5000/api";

    // Check authentication
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) navigate("/login");
    }, [navigate]);

    useEffect(() => {
        fetchOrders();
        fetchStats();
    }, [currentPage, statusFilter, searchTerm]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            console.log("🔵 Fetching orders...");

            // ✅ HAPUS AUTHORIZATION HEADER DULU
            const response = await axios.get(`${API_URL}/orders`, {
                params: {
                    page: currentPage,
                    limit: 10,
                    status: statusFilter,
                    search: searchTerm
                }
            });

            console.log("📦 Response data:", response.data);
            console.log("📊 Orders:", response.data.data);

            setOrders(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error("❌ Error fetching orders:", error);
            console.error("❌ Error response:", error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            // ✅ HAPUS AUTHORIZATION HEADER DULU
            const response = await axios.get(`${API_URL}/orders/stats/overview`);
            setStats(response.data.data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const viewOrderDetail = async (id) => {
        try {
            const token = localStorage.getItem("adminToken");
            const response = await axios.get(`${API_URL}/orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSelectedOrder(response.data.data);
            setShowDetailModal(true);
        } catch (error) {
            console.error("Error fetching order detail:", error);
            alert("Failed to fetch order detail");
        }
    };

    const updateOrderStatus = async (id, newStatus) => {
        if (!confirm(`Change order status to ${newStatus}?`)) return;

        try {
            const token = localStorage.getItem("adminToken");
            await axios.patch(
                `${API_URL}/orders/${id}/status`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Order status updated successfully");
            fetchOrders();
            if (showDetailModal) {
                viewOrderDetail(id);
            }
        } catch (error) {
            console.error("Error updating order:", error);
            alert("Failed to update order status");
        }
    };

    const deleteOrder = async (id) => {
        if (!confirm("Are you sure you want to delete this order?")) return;

        try {
            const token = localStorage.getItem("adminToken");
            await axios.delete(`${API_URL}/orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Order deleted successfully");
            fetchOrders();
            setShowDetailModal(false);
        } catch (error) {
            console.error("Error deleting order:", error);
            alert("Failed to delete order");
        }
    };

    const getOrderStatusBadge = (status) => {
        const statusConfig = {
            pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: <FaClock /> },
            processing: { bg: "bg-blue-100", text: "text-blue-800", icon: <FaSpinner /> },
            completed: { bg: "bg-green-100", text: "text-green-800", icon: <FaCheckCircle /> },
            cancelled: { bg: "bg-red-100", text: "text-red-800", icon: <FaTimes /> },
        };

        const config = statusConfig[status] || statusConfig.pending;

        return (
            <span className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit`}>
                {config.icon}
                {status.toUpperCase()}
            </span>
        );
    };

    const getPaymentStatusBadge = (status) => {
        const statusConfig = {
            pending: { bg: "bg-gray-100", text: "text-gray-800" },
            settlement: { bg: "bg-green-100", text: "text-green-800" },
            expire: { bg: "bg-red-100", text: "text-red-800" },
            cancel: { bg: "bg-red-100", text: "text-red-800" },
            deny: { bg: "bg-red-100", text: "text-red-800" },
        };

        const config = statusConfig[status] || statusConfig.pending;

        return (
            <span className={`${config.bg} ${config.text} px-2 py-1 rounded text-xs font-medium`}>
                {status?.toUpperCase() || 'N/A'}
            </span>
        );
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100">
            <AdminSidebar />

            <main className="flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Orders Management</h1>
                    <p className="text-gray-600">Manage and track product orders</p>
                </div>

                {/* Statistics Cards */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">
                                        {stats.total_orders}
                                    </p>
                                </div>
                                <div className="bg-blue-100 p-4 rounded-xl">
                                    <FaShoppingCart className="text-3xl text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Completed</p>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">
                                        {stats.completed_orders}
                                    </p>
                                </div>
                                <div className="bg-green-100 p-4 rounded-xl">
                                    <FaCheckCircle className="text-3xl text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Pending</p>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">
                                        {stats.pending_orders}
                                    </p>
                                </div>
                                <div className="bg-yellow-100 p-4 rounded-xl">
                                    <FaClock className="text-3xl text-yellow-600" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-purple-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-2">
                                        {formatCurrency(stats.total_revenue)}
                                    </p>
                                </div>
                                <div className="bg-purple-100 p-4 rounded-xl">
                                    <FaBox className="text-3xl text-purple-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters and Search */}
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by Order Code, Customer Name, or Email..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="relative">
                            <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="pl-12 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-16">
                            <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No orders found</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Order Code</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Product</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Order Status</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Payment</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {orders.map((order, index) => (
                                            <tr
                                                key={order.id}
                                                className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                                    }`}
                                            >
                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-sm font-medium text-blue-600">
                                                        {order.order_code}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-medium text-gray-800">{order.customer_name || '-'}</p>
                                                        <p className="text-sm text-gray-500">{order.customer_email || '-'}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        {/* {order.product_image && (
                                                            <img
                                                                src={order.product_image}
                                                                alt={order.product_name}
                                                                className="w-10 h-10 object-cover rounded"
                                                            />
                                                        )} */}
                                                        <span className="font-medium">{order.product_name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-bold text-gray-800">
                                                        {formatCurrency(order.price)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {getOrderStatusBadge(order.status)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        {getPaymentStatusBadge(order.payment_status)}
                                                        {order.gateway && (
                                                            <span className="text-xs text-gray-500">{order.gateway} - {order.method}</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {formatDate(order.created_at)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() => viewOrderDetail(order.id)}
                                                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                                                            title="View Details"
                                                        >
                                                            <FaEye />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteOrder(order.id)}
                                                            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                                                            title="Delete Order"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {pagination && pagination.totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 p-6 border-t">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        Previous
                                    </button>

                                    <div className="flex gap-2">
                                        {[...Array(pagination.totalPages)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`px-4 py-2 rounded-lg ${currentPage === i + 1
                                                    ? 'bg-blue-600 text-white'
                                                    : 'border hover:bg-gray-50'
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                                        disabled={currentPage === pagination.totalPages}
                                        className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            {/* Detail Modal */}
            {showDetailModal && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Order Info */}
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                                <div>
                                    <p className="text-sm text-gray-500">Order Code</p>
                                    <p className="font-mono font-bold text-blue-600">{selectedOrder.order_code}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Order Date</p>
                                    <p className="font-medium">{formatDate(selectedOrder.created_at)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Order Status</p>
                                    <div className="mt-1">{getOrderStatusBadge(selectedOrder.status)}</div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Price</p>
                                    <p className="font-bold text-lg">{formatCurrency(selectedOrder.price)}</p>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div>
                                <h3 className="font-bold text-lg mb-3">Product</h3>
                                <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
                                    <div className="flex-1">
                                        <p className="font-bold text-lg">{selectedOrder.product_name}</p>
                                        <p className="text-sm text-gray-600 mt-1">{selectedOrder.product_description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div>
                                <h3 className="font-bold text-lg mb-3">Customer Information</h3>
                                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Name:</span>
                                        <span className="font-medium">{selectedOrder.customer_name || '-'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Email:</span>
                                        <span className="font-medium">{selectedOrder.customer_email || '-'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Info */}
                            {selectedOrder.payment_id && (
                                <div>
                                    <h3 className="font-bold text-lg mb-3">Payment Information</h3>
                                    <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Payment Status:</span>
                                            {getPaymentStatusBadge(selectedOrder.payment_status)}
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Gateway:</span>
                                            <span className="font-medium">{selectedOrder.gateway}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Method:</span>
                                            <span className="font-medium">{selectedOrder.method}</span>
                                        </div>
                                        {selectedOrder.transaction_id && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Transaction ID:</span>
                                                <span className="font-mono text-sm">{selectedOrder.transaction_id}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Amount:</span>
                                            <span className="font-bold">{formatCurrency(selectedOrder.payment_amount)}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Update Status */}
                            <div>
                                <h3 className="font-bold text-lg mb-3">Update Order Status</h3>
                                <div className="flex gap-2 flex-wrap">
                                    {['pending', 'processing', 'completed', 'cancelled'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => updateOrderStatus(selectedOrder.id, status)}
                                            disabled={selectedOrder.status === status}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedOrder.status === status
                                                ? 'bg-gray-300 cursor-not-allowed'
                                                : 'bg-blue-500 text-white hover:bg-blue-600'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Delete Button */}
                            <div className="pt-4 border-t">
                                <button
                                    onClick={() => deleteOrder(selectedOrder.id)}
                                    className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    <FaTrash />
                                    Delete Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;