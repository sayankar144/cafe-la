import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TableContextType {
    tableNumber: number | null;
    setTableNumber: (table: number | null) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export function TableProvider({ children }: { children: ReactNode }) {
    const [tableNumber, setTableNumberState] = useState<number | null>(null);

    useEffect(() => {
        // On load, retrieve from localStorage
        const storedTable = localStorage.getItem('cafe_table_number');
        if (storedTable) {
            setTableNumberState(parseInt(storedTable, 10));
        }
    }, []);

    const setTableNumber = (table: number | null) => {
        setTableNumberState(table);
        if (table !== null) {
            localStorage.setItem('cafe_table_number', table.toString());
        } else {
            localStorage.removeItem('cafe_table_number');
        }
    };

    return (
        <TableContext.Provider value={{ tableNumber, setTableNumber }}>
            {children}
        </TableContext.Provider>
    );
}

export function useTable() {
    const context = useContext(TableContext);
    if (context === undefined) {
        throw new Error('useTable must be used within a TableProvider');
    }
    return context;
}
