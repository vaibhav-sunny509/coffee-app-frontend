import React, { useState, useEffect } from 'react';
import { FiPackage, FiTruck, FiCheckCircle, FiClock } from 'react-icons/fi';

const AdminDashboard = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders when page loads
  const fetchAllOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/orders');
      const data = await response.json();
      setAllOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admin orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Handle Status Change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Refresh the orders to show the new status
        fetchAllOrders();
        alert(`Order status updated to: ${newStatus}`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return <div style={{textAlign: 'center', marginTop: '100px'}}>Loading Orders...</div>;

  return (
    <div className="settings-page-wrapper" style={{ maxWidth: '1200px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 className="settings-page-title" style={{ marginBottom: 0 }}>Cafe Admin Dashboard</h2>
        <div style={{ background: '#d4a373', color: '#fff', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold' }}>
          Total Orders: {allOrders.length}
        </div>
      </div>

      <div className="admin-orders-grid" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {allOrders.length === 0 ? (
          <p>No orders in the database yet.</p>
        ) : (
          allOrders.map((order) => (
            <div key={order._id} className="order-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              
              {/* Order Details */}
              <div style={{ flex: 2, minWidth: '250px' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#4b3621', marginBottom: '5px' }}>
                  {order.orderId}
                </div>
                <div style={{ color: '#888', fontSize: '0.9rem', marginBottom: '15px' }}>
                  Placed: {new Date(order.date).toLocaleString()}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Payment:</strong> <span style={{ textTransform: 'uppercase' }}>{order.paymentMethod}</span>
                </div>
                <div>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ color: '#555' }}>• {item.quantity}x {item.name}</div>
                  ))}
                </div>
                <div style={{ marginTop: '15px', fontSize: '1.2rem', fontWeight: 'bold', color: '#27ae60' }}>
                  Total: ${order.total}
                </div>
              </div>

              {/* Status Update Actions */}
              <div style={{ flex: 1, minWidth: '250px', background: '#fdfbf7', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
                <h4 style={{ marginBottom: '15px', color: '#333' }}>Update Status</h4>
                
                <select 
                  value={order.status} 
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: '8px', 
                    border: '2px solid #d4a373',
                    backgroundColor: 'white',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    outline: 'none',
                    fontWeight: 'bold',
                    color: '#4b3621'
                  }}
                >
                  <option value="Accepted">⏳ Accepted</option>
                  <option value="Preparing">☕ Preparing</option>
                  <option value="On the way">🚚 On the way</option>
                  <option value="Delivered">✅ Delivered</option>
                </select>

                <p style={{ marginTop: '15px', fontSize: '0.85rem', color: '#888', textAlign: 'center' }}>
                  Changing this will update the customer's tracking page instantly.
                </p>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;