import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/lib/api";
import { socket } from "@/lib/socketClient";
import { Clock, CheckCircle2, ChefHat, Package, ArrowLeft, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderStatusPage() {
    const { orderId } = useParams();
    const [order, setOrder] = useState<any>(null);
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCancelling, setIsCancelling] = useState(false);

    useEffect(() => {
        if (!orderId) return;

        fetchOrderDetails();

        // Subscribe to realtime changes for THIS specific order
        const handleOrderUpdate = (updatedOrder: any) => {
            if (updatedOrder.id === orderId) {
                console.log('Realtime Order Update received!', updatedOrder);
                // Map camelCase to snake_case for frontend state compatibility, or update frontend to use camelCase.
                // Our backend sends camelCase (createdAt, tableNumber, etc)
                const formattedOrder = {
                    ...updatedOrder,
                    table_number: updatedOrder.tableNumber,
                    created_at: updatedOrder.createdAt
                };
                setOrder(formattedOrder);

                // Clear tracking badge if completed
                if (formattedOrder.status === 'completed' || formattedOrder.status === 'cancelled') {
                    if (localStorage.getItem('cafe_active_order_id') === orderId) {
                        localStorage.removeItem('cafe_active_order_id');
                        window.dispatchEvent(new Event('cafe_order_updated'));
                    }
                }
            }
        };

        socket.on('order_updated', handleOrderUpdate);

        return () => {
            socket.off('order_updated', handleOrderUpdate);
        };
    }, [orderId]);

    const fetchOrderDetails = async () => {
        setLoading(true);
        try {
            // Fetch Order metadata and items using new API
            const response = await api.get(`/orders/${orderId}`);
            const orderData = response.data;

            // Format camelCase to snake_case for existing UI components
            const formattedOrder = {
                ...orderData,
                table_number: orderData.tableNumber,
                created_at: orderData.createdAt
            };

            setOrder(formattedOrder);

            // Clear tracking badge if loaded order is already completed or cancelled
            if (formattedOrder.status === 'completed' || formattedOrder.status === 'cancelled') {
                if (localStorage.getItem('cafe_active_order_id') === orderId) {
                    localStorage.removeItem('cafe_active_order_id');
                    window.dispatchEvent(new Event('cafe_order_updated'));
                }
            }

            // The backend returns items nested within the order
            setItems(orderData.items.map((item: any) => ({
                ...item,
                item_name: item.itemName
            })));

        } catch (error) {
            console.error("Error fetching order:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async () => {
        if (!confirm("Are you sure you want to cancel this order?")) return;

        setIsCancelling(true);
        try {
            await api.patch(`/orders/${orderId}/status`, { status: 'cancelled' });
            // State updates automatically via realtime listener
        } catch (error) {
            console.error("Error cancelling order:", error);
            alert("Failed to cancel order. Please ask staff for assistance.");
        } finally {
            setIsCancelling(false);
        }
    };

    const statusMap: Record<string, { label: string; icon: any; color: string; progress: number }> = {
        'pending': { label: 'Order Received', icon: Clock, color: 'text-yellow-600', progress: 25 },
        'accepted': { label: 'Accepted by Kitchen', icon: CheckCircle2, color: 'text-blue-500', progress: 50 },
        'preparing': { label: 'Preparing Food', icon: ChefHat, color: 'text-orange-500', progress: 75 },
        'ready': { label: 'Ready for Pickup', icon: Package, color: 'text-green-600', progress: 100 },
        'completed': { label: 'Completed', icon: CheckCircle2, color: 'text-muted-foreground', progress: 100 },
        'cancelled': { label: 'Cancelled', icon: XCircle, color: 'text-destructive', progress: 0 }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-coffee-primary" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center gap-4">
                <p className="text-xl">Order not found.</p>
                <Link to="/menu"><Button>Return to Menu</Button></Link>
            </div>
        );
    }

    const currentStatus = statusMap[order.status] || statusMap['pending'];
    const StatusIcon = currentStatus.icon;

    return (
        <div className="pt-24 pb-16 min-h-screen bg-cafe-warm/30">
            <div className="cafe-container max-w-2xl px-4">
                <Link to="/menu" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Menu
                </Link>

                <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-border">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-heading font-bold mb-2">Order Tracking</h1>
                        <p className="text-muted-foreground">Order ID: <span className="font-mono text-xs">{orderId}</span></p>
                        {order.table_number && (
                            <div className="inline-block mt-4 px-4 py-1.5 bg-coffee-primary/10 text-coffee-primary rounded-full font-semibold text-sm">
                                Table {order.table_number}
                            </div>
                        )}
                    </div>

                    <div className="mb-10 p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
                        <StatusIcon className={`w-12 h-12 mb-4 ${currentStatus.color}`} />
                        <h2 className="text-2xl font-semibold mb-1">{currentStatus.label}</h2>
                        <p className="text-muted-foreground text-sm">
                            We'll update this status instantly as your food is prepared.
                        </p>

                        {/* Minimal Progress Bar */}
                        <div className="w-full max-w-xs h-2 bg-slate-200 rounded-full mt-6 overflow-hidden">
                            <div
                                className="h-full bg-coffee-primary transition-all duration-1000 ease-out"
                                style={{ width: `${currentStatus.progress}%` }}
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Order Summary</h3>
                        <div className="space-y-4 mb-6">
                            {items.map((item: any) => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium text-foreground">{item.quantity}x</span>
                                        <span className="text-muted-foreground">{item.item_name}</span>
                                    </div>
                                    <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2 text-sm">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Subtotal</span>
                                <span>₹{Number(order.subtotal).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Tax</span>
                                <span>₹{Number(order.tax).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-semibold pt-2">
                                <span>Total</span>
                                <span className={order.status === 'cancelled' ? 'text-muted-foreground line-through' : 'text-coffee-primary'}>
                                    ₹{Number(order.total).toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {(order.status === 'pending' || order.status === 'accepted') && (
                            <div className="mt-8 pt-6 border-t">
                                <Button
                                    variant="destructive"
                                    className="w-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                                    onClick={handleCancelOrder}
                                    disabled={isCancelling}
                                >
                                    {isCancelling ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <XCircle className="w-4 h-4 mr-2" />}
                                    Cancel Order
                                </Button>
                                <p className="text-center text-xs text-muted-foreground mt-3">
                                    You can only cancel before the kitchen begins preparing your food.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
