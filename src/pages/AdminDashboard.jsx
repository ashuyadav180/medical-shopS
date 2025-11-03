import React, { useState, useEffect } from 'react';
import { fetchMedicines, addMedicine, updateMedicine, deleteMedicine } from '../api/medicineApi';

// --- MOCK ORDERS DATA (Replace with an actual API call later) ---
const MOCK_ORDERS = [
    { id: 'O1', user: 'Ashu', total: 45.99, status: 'Shipped', date: '2025-10-25' },
    { id: 'O2', user: 'Test User', total: 12.00, status: 'Processing', date: '2025-10-26' },
];

// --- Sub-Component: Manage Products ---
const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(null); // null or the ID of the product being edited
    const [form, setForm] = useState({});

    useEffect(() => {
        fetchMedicines().then(setProducts);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEdit = (product) => {
        setForm(product);
        setIsEditing(product.id);
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        
        if (isEditing) {
            const updated = await updateMedicine(form);
            setProducts(products.map(p => p.id === updated.id ? updated : p));
        } else {
            const added = await addMedicine(form);
            setProducts([...products, added]);
        }
        setIsEditing(null);
        setForm({});
    };

    const handleDelete = async (id) => {
        await deleteMedicine(id);
        setProducts(products.filter(p => p.id !== id));
    };

    return (
        <div className="admin-section">
            <h3>{isEditing ? `Edit Product: ${form.name}` : 'Add New Product'}</h3>
            <form onSubmit={handleAddOrUpdate} className="admin-form">
                <input name="name" placeholder="Name" value={form.name || ''} onChange={handleChange} required />
                <input name="price" type="number" step="0.01" placeholder="Price" value={form.price || ''} onChange={handleChange} required />
                <input name="stock" type="number" placeholder="Stock" value={form.stock || ''} onChange={handleChange} required />
                <input name="category" placeholder="Category" value={form.category || ''} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={form.description || ''} onChange={handleChange} required />
                
                <button type="submit">{isEditing ? 'Save Changes' : 'Add Product'}</button>
                {isEditing && <button type="button" onClick={() => {setIsEditing(null); setForm({});}} className="cancel-button">Cancel</button>}
            </form>

            <h3 style={{marginTop: '40px'}}>Current Inventory ({products.length})</h3>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>${p.price.toFixed(2)}</td>
                            <td>{p.stock}</td>
                            <td>
                                <button onClick={() => handleEdit(p)}>Edit</button>
                                <button onClick={() => handleDelete(p.id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// --- Sub-Component: Manage Orders ---
const ManageOrders = () => {
    // In a real app, this would fetch data from an orders API
    const [orders, setOrders] = useState(MOCK_ORDERS); 

    const handleUpdateStatus = (id, newStatus) => {
        setOrders(orders.map(o => o.id === id ? {...o, status: newStatus} : o));
        alert(`Order ${id} status updated to ${newStatus}`);
    };

    return (
        <div className="admin-section">
            <h3>Recent Orders ({orders.length})</h3>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.user}</td>
                            <td>${o.total.toFixed(2)}</td>
                            <td>{o.date}</td>
                            <td><span className={`status-${o.status.toLowerCase()}`}>{o.status}</span></td>
                            <td>
                                <button onClick={() => handleUpdateStatus(o.id, 'Shipped')}>Ship</button>
                                <button onClick={() => handleUpdateStatus(o.id, 'Delivered')} className="complete-button">Complete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// --- Main Admin Dashboard Component ---
function AdminDashboard() {
    // State to control which view (Products or Orders) is visible
    const [activeView, setActiveView] = useState('products'); 

    return (
        <div className="admin-dashboard">
            <h1>Admin Control Panel</h1>
            <div className="admin-nav">
                <button 
                    className={activeView === 'products' ? 'active' : ''} 
                    onClick={() => setActiveView('products')}>
                    💊 Manage Products
                </button>
                <button 
                    className={activeView === 'orders' ? 'active' : ''} 
                    onClick={() => setActiveView('orders')}>
                    📦 View Orders
                </button>
            </div>

            <div className="admin-content">
                {activeView === 'products' && <ManageProducts />}
                {activeView === 'orders' && <ManageOrders />}
            </div>
        </div>
    );
}

export default AdminDashboard;