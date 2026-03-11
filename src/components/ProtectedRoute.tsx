import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute() {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session from localStorage
        const token = localStorage.getItem('cafe_staff_token');
        setSession(token);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-coffee-primary" />
            </div>
        );
    }

    // If no active staff session, redirect them to a login page (or home for now)
    if (!session) {
        return <Navigate to="/staff/login" replace />;
    }

    return <Outlet />;
}
