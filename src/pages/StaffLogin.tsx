import { useState } from "react";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Coffee, Lock, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function StaffLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/auth/login', {
                email,
                password,
            });

            // Save token and user data to local storage
            localStorage.setItem('cafe_staff_token', response.data.token);
            localStorage.setItem('cafe_staff_user', JSON.stringify(response.data.user));

            toast.success("Login successful!");
            navigate("/admin/kitchen"); // Default to kitchen on login
        } catch (error: any) {
            toast.error(error.message || "Invalid login credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-coffee-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Coffee className="w-8 h-8 text-coffee-primary" />
                    </div>
                    <h1 className="text-2xl font-bold font-heading text-slate-900">Staff Portal</h1>
                    <p className="text-sm text-slate-500 mt-1">Sign in to access cafe management.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                type="email"
                                placeholder="staff@cafela.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 h-12"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 h-12"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 mt-4 bg-coffee-primary hover:bg-[#5a3420] text-white rounded-xl"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" /> Authenticating...
                            </span>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
