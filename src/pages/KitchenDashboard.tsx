import { useState, useEffect } from "react";
import api from "@/lib/api";
import { socket } from "@/lib/socketClient";
import { Clock, CheckCircle2, ChefHat, Package, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function KitchenDashboard() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Status progression mapping
    const statusFlow: Record<string, { next: string, buttonText: string, icon: any, color: string }> = {
        'pending': { next: 'accepted', buttonText: 'Accept Order', icon: Clock, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
        'accepted': { next: 'preparing', buttonText: 'Start Preparing', icon: CheckCircle2, color: 'bg-blue-100 text-blue-800 border-blue-200' },
        'preparing': { next: 'ready', buttonText: 'Mark Ready', icon: ChefHat, color: 'bg-orange-100 text-orange-800 border-orange-200' },
        'ready': { next: 'completed', buttonText: 'Complete Order', icon: Package, color: 'bg-green-100 text-green-800 border-green-200' }
    };

    useEffect(() => {
        fetchActiveOrders();

        // Subscribe to incoming new orders globally
        const handleNewOrder = (newOrder: any) => {
            console.log('Realtime new order in Kitchen!', newOrder);
            fetchActiveOrders();
        };

        const handleOrderUpdate = (updatedOrder: any) => {
            console.log('Realtime update in Kitchen!', updatedOrder);
            fetchActiveOrders();
        };

        socket.on('new_order', handleNewOrder);
        socket.on('order_updated', handleOrderUpdate);

        return () => {
            socket.off('new_order', handleNewOrder);
            socket.off('order_updated', handleOrderUpdate);
        };
    }, []);

    const fetchActiveOrders = async () => {
        try {
            // Fetch orders not completed
            const response = await api.get('/orders');
            // Basic filtering for non-completed orders since the endpoint returns all
            const activeOrders = response.data.filter((o: any) => o.status !== 'completed' && o.status !== 'cancelled');

            // Format camelCase from API to snake_case for UI
            const formattedOrders = activeOrders.map((o: any) => ({
                ...o,
                created_at: o.createdAt,
                table_number: o.tableNumber,
                order_items: o.items.map((item: any) => ({ ...item, item_name: item.itemName }))
            }));

            // Sort by created_at ascending (FIFO)
            formattedOrders.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

            setOrders(formattedOrders);
        } catch (error) {
            console.error("Error fetching kitchen orders:", error);
            toast.error("Failed to load active orders.");
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
        try {
            await api.patch(`/orders/${orderId}/status`, { status: newStatus });

            toast.success(`Order status updated to ${newStatus}`);
            // The realtime subscription will automatically re-fetch, but optimistic UI is nice:
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update order status.");
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
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-foreground">Kitchen Display System</h1>
                        <p className="text-muted-foreground mt-1">Manage and track active cafe orders.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" onClick={() => window.location.href = '/admin/menu'} className="bg-white">
                            Manage Menu Items
                        </Button>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-border">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium text-slate-700">Realtime Sync Active</span>
                        </div>
                    </div>
                </div>


                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
                        <ChefHat className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                        <h3 className="text-xl font-medium text-slate-900 mb-2">No Active Orders</h3>
                        <p className="text-slate-500">The kitchen is clear. Waiting for new orders to arrive.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orders.map((order) => {
                            const currentPhase = statusFlow[order.status];
                            const StatusIcon = currentPhase?.icon || CheckCircle2;

                            const orderTime = new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                            return (
                                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                                    {/* Card Header */}
                                    <div className={`px-5 py-3 border-b flex justify-between items-center ${currentPhase?.color || 'bg-slate-100'}`}>
                                        <div className="flex items-center gap-2">
                                            <StatusIcon className="w-5 h-5" />
                                            <span className="font-semibold capitalize">{order.status}</span>
                                        </div>
                                        <span className="text-sm font-medium opacity-80 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> {orderTime}
                                        </span>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-5 flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Order ID</p>
                                                <p className="font-mono text-xs font-semibold text-slate-700">{order.id.split('-')[0]}</p>
                                            </div>
                                            {order.table_number && (
                                                <div className="bg-coffee-primary text-white text-lg font-bold px-3 py-1 rounded-md shadow-sm">
                                                    T{order.table_number}
                                                </div>
                                            )}
                                        </div>

                                        <div className="border-t border-slate-100 pt-4 mb-4">
                                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Items</h4>
                                            <ul className="space-y-2">
                                                {order.order_items?.map((item: any) => (
                                                    <li key={item.id} className="flex gap-3 text-sm">
                                                        <span className="font-bold text-slate-900 w-5">{item.quantity}x</span>
                                                        <span className="text-slate-700 font-medium">{item.item_name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Card Footer Actions */}
                                    {currentPhase && (
                                        <div className="p-4 bg-slate-50 border-t border-slate-100 mt-auto flex gap-2">
                                            {order.status === 'pending' && (
                                                <Button
                                                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                                    variant="outline"
                                                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                                                >
                                                    Reject
                                                </Button>
                                            )}
                                            <Button
                                                onClick={() => updateOrderStatus(order.id, currentPhase.next)}
                                                className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                                            >
                                                {currentPhase.buttonText}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
