import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTable } from '@/lib/table-context';

export default function TableQRHandler() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setTableNumber } = useTable();

    useEffect(() => {
        if (id) {
            const tableNum = parseInt(id, 10);
            if (!isNaN(tableNum)) {
                setTableNumber(tableNum);
                // Redirect to menu after explicitly scanning/entering table link
                navigate('/menu', { replace: true });
            } else {
                navigate('/', { replace: true });
            }
        }
    }, [id, setTableNumber, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-coffee-bg">
            <div className="text-center font-heading text-xl text-coffee-primary animate-pulse">
                Connecting to Table {id}...
            </div>
        </div>
    );
}
