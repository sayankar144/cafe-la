import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Plus, Pencil, Trash2, CheckCircle2, XCircle, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MenuItem } from "@/lib/menu-data";

export default function AdminMenuPage() {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState<Partial<MenuItem>>({
        name: '', description: '', price: 0, category: 'Coffee', image: '', isAvailable: true
    });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const res = await api.get('/menu');
            const formatted = res.data.map((item: any) => ({
                id: item.id,
                name: item.name,
                description: item.description,
                price: parseFloat(item.price),
                image: item.imageUrl,
                category: item.category,
                isAvailable: item.isAvailable,
                tags: []
            }));
            setItems(formatted);
        } catch (error) {
            toast.error("Failed to load menu items");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenForm = (item?: MenuItem) => {
        if (item) {
            setEditingId(item.id);
            setFormData({ ...item });
        } else {
            setEditingId(null);
            setFormData({ name: '', description: '', price: 0, category: 'Coffee', image: '', isAvailable: true });
        }
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const payload = {
                name: formData.name,
                description: formData.description,
                price: formData.price,
                category: formData.category,
                imageUrl: formData.image,
                isAvailable: formData.isAvailable !== false
            };

            if (editingId) {
                await api.put(`/menu/${editingId}`, payload);
                toast.success("Menu item updated");
            } else {
                await api.post('/menu', payload);
                toast.success("Menu item created");
            }
            setIsFormOpen(false);
            fetchMenuItems();
        } catch (error) {
            toast.error(editingId ? "Failed to update item" : "Failed to create item");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this menu item? This cannot be undone.")) return;
        try {
            await api.delete(`/menu/${id}`);
            toast.success("Item deleted");
            setItems(items.filter(i => i.id !== id));
        } catch (error) {
            toast.error("Failed to delete item");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-coffee-primary" />
            </div>
        );
    }

    return (
        <div className="pt-24 pb-16 min-h-screen bg-slate-50">
            <div className="cafe-container px-4 max-w-7xl">
                <div className="mb-6">
                    <Link to="/admin/kitchen" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-coffee-primary transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Kitchen
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-foreground">Menu Management</h1>
                        <p className="text-muted-foreground mt-1">Manage your cafe's menu items seamlessly.</p>
                    </div>
                    <Button onClick={() => handleOpenForm()} className="bg-coffee-primary hover:bg-coffee-primary/90 text-white gap-2 shadow-sm">
                        <Plus className="w-4 h-4" /> Add New Item
                    </Button>
                </div>

                {isFormOpen && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
                        <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Item' : 'Create New Item'}</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded-lg p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full border rounded-lg p-2">
                                    <option value="Coffee">Coffee</option>
                                    <option value="Desserts & Drinks">Desserts & Drinks</option>
                                    <option value="Pizza">Pizza</option>
                                    <option value="Burgers">Burgers</option>
                                    <option value="Munches">Munches</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Price (₹)</label>
                                <input required type="number" min="0" step="0.01" value={formData.price} onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })} className="w-full border rounded-lg p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Image URL</label>
                                <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." className="w-full border rounded-lg p-2" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full border rounded-lg p-2" rows={2} />
                            </div>
                            <div className="md:col-span-2 flex items-center gap-2 mt-2">
                                <input type="checkbox" id="isAvailable" checked={formData.isAvailable} onChange={e => setFormData({ ...formData, isAvailable: e.target.checked })} className="w-4 h-4" />
                                <label htmlFor="isAvailable" className="text-sm font-medium">Item is currently available (in stock)</label>
                            </div>
                            <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t">
                                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Item'}</Button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500 uppercase">
                                    <th className="px-6 py-4 font-semibold">Item</th>
                                    <th className="px-6 py-4 font-semibold">Category</th>
                                    <th className="px-6 py-4 font-semibold">Price</th>
                                    <th className="px-6 py-4 font-semibold text-center">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                            No menu items found in the database.
                                        </td>
                                    </tr>
                                ) : (
                                    items.map((item) => (
                                        <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-md object-cover" />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-md bg-slate-200 flex items-center justify-center text-xs text-slate-400">No Img</div>
                                                    )}
                                                    <div>
                                                        <p className="font-semibold text-slate-900">{item.name}</p>
                                                        <p className="text-xs text-slate-500 truncate max-w-xs">{item.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{item.category}</td>
                                            <td className="px-6 py-4 font-medium">₹{item.price.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-center">
                                                {item.isAvailable !== false ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        <CheckCircle2 className="w-3.5 h-3.5" /> Available
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        <XCircle className="w-3.5 h-3.5" /> Out of Stock
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => handleOpenForm(item)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
