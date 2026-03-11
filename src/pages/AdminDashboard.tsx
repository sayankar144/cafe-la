import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import { BarChart3, TrendingUp, Users, Calendar, ChefHat, List } from "lucide-react";

export default function AdminDashboard() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Stats
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);

    useEffect(() => {
        fetchHistoricalOrders();
    }, []);

    const fetchHistoricalOrders = async () => {
        try {
            // Get all orders from custom API
            const response = await api.get('/orders');
            const data = response.data;

            // Map API response to UI expected format
            const fetchedOrders = data.map((o: any) => ({
                ...o,
                created_at: o.createdAt,
                table_number: o.tableNumber
            })) || [];

            setOrders(fetchedOrders);

            // Compute statistics
            let rev = 0;
            let completed = 0;

            fetchedOrders.forEach(order => {
                if (order.status === 'completed') {
                    completed++;
                    rev += Number(order.total);
                }
            });

            setTotalOrders(fetchedOrders.length);
            setCompletedOrders(completed);
            setTotalRevenue(rev);

        } catch (error) {
            console.error("Error fetching admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-primary"></div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-16 min-h-screen bg-slate-50">
            <div className="cafe-container px-4 max-w-7xl">
                <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Manager Dashboard</h1>
                        <p className="text-muted-foreground">Overview of cafe performance and order history.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link 
                            to="/admin/kitchen" 
                            className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors bg-coffee-primary text-white hover:bg-coffee-secondary/90 h-11 px-5 py-2 gap-2 shadow-sm"
                        >
                            <ChefHat className="w-4 h-4" />
                            Kitchen Manager
                        </Link>
                        <Link 
                            to="/admin/menu" 
                            className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 h-11 px-5 py-2 gap-2 shadow-sm"
                        >
                            <List className="w-4 h-4" />
                            Menu Manager
                        </Link>
                    </div>
                </div>

                {/* Top Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                        <div className="p-4 bg-green-100 text-green-700 rounded-xl">
                            <TrendingUp className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Total Revenue</p>
                            <h3 className="text-3xl font-bold text-slate-900">₹{totalRevenue.toFixed(2)}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                        <div className="p-4 bg-blue-100 text-blue-700 rounded-xl">
                            <BarChart3 className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Total Orders</p>
                            <h3 className="text-3xl font-bold text-slate-900">{totalOrders}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                        <div className="p-4 bg-purple-100 text-purple-700 rounded-xl">
                            <Users className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Completed</p>
                            <h3 className="text-3xl font-bold text-slate-900">{completedOrders}</h3>
                        </div>
                    </div>
                </div>

                {/* Historical Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h2 className="font-semibold text-lg text-slate-800">Recent Order History</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider border-b border-slate-200">
                                    <th className="px-6 py-4 font-medium">Order ID</th>
                                    <th className="px-6 py-4 font-medium">Date & Time</th>
                                    <th className="px-6 py-4 font-medium">Table</th>
                                    <th className="px-6 py-4 font-medium">Total Amount</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-sm text-slate-600">{order.id.split('-')[0]}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            {new Date(order.created_at).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.table_number ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-800">
                                                    T{order.table_number}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 text-sm">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-700">₹{Number(order.total).toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-blue-100 text-blue-800'}`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}

                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                            No orders found in the database.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
