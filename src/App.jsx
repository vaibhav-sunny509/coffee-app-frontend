import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiShoppingBag, FiCoffee, FiSettings, FiMenu, FiX, FiMapPin, FiSearch, FiHeart } from 'react-icons/fi';

import Login from './pages/Login';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import Settings from './pages/Settings';
import Menu from './pages/Menu';
import Favorites from './pages/Favorites';
import AdminDashboard from './pages/AdminDashboard'; 

const productsData = [
  { id: 1, name: "Espresso Roast", price: 12.99, img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400" },
  { id: 2, name: "Morning Blend", price: 14.50, img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=400" },
  { id: 3, name: "Cold Brew Kit", price: 22.00, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=400" },
  { id: 4, name: "French Vanilla", price: 13.00, img: "https://www.texanerin.com/content/uploads/2022/12/french-vanilla-cappuccino-photo-1200.jpg" },
  { id: 5, name: "Hazelnut Cream", price: 15.50, img: "https://www.chocolats-pralus.com/cdn/shop/files/Creme_Noisette_THI_2490.jpg?crop=center&height=1200&v=1717067574&width=1200" },
  { id: 6, name: "Dark Roast", price: 16.00, img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=400" },
  { id: 7, name: "Colombian Supremo", price: 18.00, img: "https://www.brownjenkins.com/cdn/shop/files/ColombianSupremo.png?v=1704109491" },
  { id: 8, name: "Ethiopian Yirgacheffe", price: 24.00, img: "https://www.cooperscoffeeco.com/wp-content/uploads/2025/02/0cc92cdb-5588-404a-8192-da7cfc20f0cb.jpeg" },
  { id: 9, name: "Caramel Macchiato", price: 14.25, img: "https://theicedcoffee.com/wp-content/uploads/2025/06/p168-1-1024x819.webp" },
  { id: 10, name: "Mocha Java", price: 15.00, img: "https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=400" },
  { id: 11, name: "Pumpkin Spice", price: 16.50, img: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=400" },
  { id: 12, name: "Breakfast Blend", price: 11.99, img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=400" },
  { id: 13, name: "Irish Cream", price: 17.00, img: "https://spiritedgifts.com/cdn-cgi/image/q=80,format=auto,onerror=redirect,metadata=none/media/catalog/product/cache/469d01a9e5eee091cb6d510375206f27/t/l/tl1049-baileys-original-irish-cream_04.jpg" },
  { id: 14, name: "Italian Roast", price: 13.50, img: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=400" },
  { id: 15, name: "Decaf House", price: 12.00, img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=400" },
  { id: 16, name: "Turkish Coffee", price: 19.00, img: "https://images.unsplash.com/photo-1550950158-d0d960dff51b?q=80&w=400" },
  { id: 17, name: "Nitro Cold Brew", price: 21.00, img: "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?q=80&w=400" },
  { id: 18, name: "Kona Blend", price: 25.00, img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=400" },
  { id: 19, name: "Peppermint Mocha", price: 15.75, img: "https://oliviaskitchen.com/wp-content/uploads/2020/11/Healthy-Peppermint-Mocha-25.jpg" },
  { id: 20, name: "Organic Peru", price: 18.50, img: "https://www.trianoncoffee.com/cdn/shop/products/Peru.png?v=1630508823" },

  // --- NEW 50 ITEMS (IDs 21 - 70) ---
  { id: 21, name: "Flat White", price: 5.50, img: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=400" },
  { id: 22, name: "Cortado", price: 4.75, img: "https://arecipeforfun.com/wp-content/uploads/2023/10/edits-iced-cortado-10.jpg" },
  { id: 23, name: "Affogato", price: 6.50, img: "https://insanelygoodrecipes.com/wp-content/uploads/2024/05/Affogato-10-1060x1060.jpg" },
  { id: 24, name: "Americano", price: 4.00, img: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1200,h=630,fit=crop,f=jpeg/AGBr2xwyKpu5l2pw/americano-banner-YZ9nGBRX17Ib6M4V.png" },
  { id: 25, name: "Café au Lait", price: 5.00, img: "https://fthmb.tqn.com/k7ExgajsqcYW3dt3IHl-oPb3SaY=/2120x1416/filters:fill(auto,1)/145634220-56a32bc95f9b58b7d0d0b9f9.jpg" },
  { id: 26, name: "Vienna Coffee", price: 6.00, img: "https://cafe1820.com/wp-content/uploads/2022/03/Cafe-vienes-1.jpg" },
  { id: 27, name: "Red Eye", price: 5.25, img: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=400" },
  { id: 28, name: "Black Eye", price: 6.00, img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=400" },
  { id: 29, name: "Lungo", price: 4.50, img: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=400" },
  { id: 30, name: "Ristretto", price: 4.00, img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=400" },
  { id: 31, name: "Galão", price: 5.25, img: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=400" },
  { id: 32, name: "Frappé", price: 6.50, img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400" },
  { id: 33, name: "Mazagran", price: 5.75, img: "https://images.squarespace-cdn.com/content/v1/5fbd4ab0c1c294564ee51dd1/1741970707059-D0XYU3COF0FGAQFW9R8E/IMG_4531.JPG" },
  { id: 34, name: "Espresso Con Panna", price: 4.75, img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=400" },
  { id: 35, name: "Breve", price: 5.50, img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400" },
  { id: 36, name: "Cafe Bombon", price: 5.50, img: "https://eu-central-1-jde.graphassets.com/AiQ00hd1mTUe8afHSH6YFz/output=format:webp/w6sbHkZYREu8uqoaN0FR" },
  { id: 39, name: "Iced Latte", price: 5.50, img: "https://www.peanutbutterandfitness.com/wp-content/uploads/2023/08/Smores-Iced-Latte-Recipe-7-500x500.jpg" },
  { id: 40, name: "Iced Mocha", price: 6.00, img: "https://images.unsplash.com/photo-1534687941688-651ccaafbff8?q=80&w=400" },
  { id: 41, name: "Vanilla Sweet Cream Cold Brew", price: 6.25, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWbCTXqufzZrd7bFpiwlJExOfhgPrsSgY_-A&s" },
  { id: 43, name: "Espresso Tonic", price: 6.00, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJk1PDMJPCZdZ0g9fVmeWS8mb7P43jrlJH0g&s" },
  { id: 44, name: "White Chocolate Mocha", price: 6.25, img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400" },
  { id: 45, name: "Salted Caramel Latte", price: 6.25, img: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=400" },
  { id: 46, name: "Cinnamon Dolce Latte", price: 6.00, img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400" },
  { id: 47, name: "Toffee Nut Latte", price: 6.00, img: "https://ibevconcepts.com/cdn/shop/articles/1_520x500_40b98cab-dbc0-468b-bb2a-44318a7b1c40-727850.png?v=1746754207" },
  { id: 48, name: "Maple Pecan Latte", price: 6.50, img: "https://i0.wp.com/katerinafaith.com/wp-content/uploads/2025/08/Maple-Bourbon-Pecan-Pie-Latte_1-1.jpg?resize=683%2C1024&ssl=1" },
  { id: 49, name: "Honey Lavender Latte", price: 6.75, img: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=400" },
  { id: 50, name: "Coconut Milk Latte", price: 6.50, img: "https://images.unsplash.com/photo-1599398054066-846f28917f38?q=80&w=400" },
  { id: 51, name: "Oat Milk Flat White", price: 6.50, img: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=400" },
  { id: 52, name: "Almond Milk Cappuccino", price: 6.25, img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400" },
  { id: 53, name: "Sumatra Mandheling", price: 19.00, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17py0uFMG32KFg45T7pBdUOJ_JuzB9TDipg&s" },
  { id: 54, name: "Kenya AA", price: 21.00, img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=400" },
  { id: 56, name: "Costa Rica Tarrazu", price: 19.50, img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=400" },
  { id: 57, name: "Jamaica Blue Mountain", price: 45.00, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2zm1GTgbNWtQYawVG5bptSoi070E8q6flgg&s" },
  { id: 58, name: "Tanzanian Peaberry", price: 20.00, img: "https://www.buonacaffe.com/cdn/shop/products/buonacaffecoffeebeans_93293a61-6e6f-43f8-a380-2dd7e2417448.png?v=1673447739" },
  { id: 59, name: "Brazilian Santos", price: 16.00, img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400" },
  { id: 60, name: "Panama Geisha", price: 50.00, img: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/080797fc-343c-4bde-8e05-536d2dad7eb6.__CR0,0,970,600_PT0_SX970_V1___.jpg" },
  { id: 61, name: "Mexican Altura", price: 17.50, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQv2IrWx7MHd-d1nSHatSfh1Yk7-a0mg8oA&s" },
  { id: 62, name: "Rwanda Bourbon", price: 19.00, img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=400" },
  { id: 63, name: "Matcha Latte", price: 6.00, img: "https://mocktail.net/wp-content/uploads/2021/05/Matcha-Iced-Latte_ig.jpg" },
  { id: 64, name: "Chai Tea Latte", price: 5.50, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA8QWMKGJmwMCyDxjBBTBtQi-w3FN248P3Lg&s" },
  { id: 65, name: "London Fog", price: 5.75, img: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=400" },
  { id: 66, name: "Dirty Chai Latte", price: 6.25, img: "https://thebusybaker.ca/wp-content/uploads/2021/09/iced-dirty-chai-latte-fb-ig-9-scaled.jpg" },
  { id: 67, name: "Hot Chocolate", price: 5.00, img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=400" },
  { id: 68, name: "S'mores Frappuccino", price: 7.00, img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=400" },
  { id: 69, name: "Java Chip Frappe", price: 7.25, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKWCDYHluMp74gIkEbP_BqTMAAYrL1e0oVSA&s" },
  { id: 70, name: "Mango Dragonfruit Refresher", price: 6.00, img: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=400" },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('activeUser'));
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('activeUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('activeUser');
    return saved ? JSON.parse(saved).cart || [] : [];
  });
  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('coffeeAppFavorites');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (searchQuery && location.pathname !== '/menu') {
        navigate('/menu');
    }
  }, [searchQuery, navigate, location.pathname]);

  // Save Favorites to Local Storage
  useEffect(() => {
    localStorage.setItem('coffeeAppFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const saveCartToDb = (newCart) => {
    setCart(newCart);
    if (currentUser) {
      const updatedUser = { ...currentUser, cart: newCart };
      setCurrentUser(updatedUser);
      localStorage.setItem('activeUser', JSON.stringify(updatedUser));
      const db = JSON.parse(localStorage.getItem('coffeeAppDB')) || {};
      db[updatedUser.email] = updatedUser;
      localStorage.setItem('coffeeAppDB', JSON.stringify(db));
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    if (existingItem) {
      newCart = cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    saveCartToDb(newCart);
  };

  const updateQuantity = (productId, amount) => {
    const newCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(0, item.quantity + amount) };
      }
      return item;
    }).filter(item => item.quantity > 0);
    saveCartToDb(newCart);
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogin = (userObj) => {
    setCurrentUser(userObj);
    setIsLoggedIn(true);
    setCart(userObj.cart || []);
    localStorage.setItem('activeUser', JSON.stringify(userObj));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCart([]);
    setSearchQuery("");
    localStorage.removeItem('activeUser');
    navigate('/login');
  };

  const handlePlaceOrder = async (finalTotal, estimatedDelivery) => {
    if (!currentUser) return;
    
    const orderTotal = finalTotal || cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);

    try {
      // --- FIXED: Updated to live Render URL (REPLACE WITH YOUR ACTUAL URL!) ---
      const response = await fetch('https://YOUR-RENDER-APP-NAME.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser._id || currentUser.email, 
          items: cart,
          total: orderTotal,
          paymentMethod: 'cod',
          estimatedDelivery: estimatedDelivery 
        })
      });

      if (response.ok) {
        const savedOrder = await response.json(); 

        const updatedUser = { 
          ...currentUser, 
          history: [savedOrder, ...(currentUser.history || [])], 
          cart: [] 
        };
        
        localStorage.setItem('activeUser', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        setCart([]);

        console.log("Order saved to MongoDB successfully!");
      } else {
        alert("Failed to save order to the database.");
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Server error. Please make sure your Node.js backend is running!");
    }
  };

  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <Link to="/" className="logo-link">
          <FiCoffee className="logo-icon" /> 
          <span>CoffeeApp</span>
        </Link>
        
        {isLoggedIn && (
            <div className="search-bar">
                <FiSearch className="search-icon" />
                <input 
                    type="text" 
                    placeholder="Search coffee..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        )}

        <div className="nav-links">
          {isLoggedIn ? (
            <>
              <Link to="/" title="Home"><FiHome className="nav-icon" /></Link>
              <Link to="/menu" title="Menu"><FiMenu className="nav-icon" /></Link>
              
              <Link to="/favorites" title="Favorites" style={{position: 'relative'}}>
                <div className="cart-icon-container">
                   <FiHeart className="nav-icon" /> 
                   {favorites.length > 0 && <span className="cart-count" style={{background: '#e91e63'}}>{favorites.length}</span>}
                </div>
              </Link>

              <Link to="/cart" title="Cart">
                <div className="cart-icon-container">
                    <FiShoppingBag className="nav-icon" />
                    {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                </div>
              </Link>
              <Link to="/settings" title="Settings"><FiSettings className="nav-icon" /></Link>
            </>
          ) : (
            <Link to="/login" title="Login"><FiUser className="nav-icon" /></Link>
          )}
        </div>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={ isLoggedIn ? <Home navigate={navigate} /> : <Navigate to="/login" replace /> } />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/menu" element={ <ProtectedRoute isLoggedIn={isLoggedIn}><Menu products={productsData} addToCart={addToCart} cart={cart} updateQuantity={updateQuantity} searchQuery={searchQuery} favorites={favorites} toggleFavorite={toggleFavorite} /></ProtectedRoute> } />
          <Route path="/cart" element={ <ProtectedRoute isLoggedIn={isLoggedIn}><CartWrapper cart={cart} updateQuantity={updateQuantity} /></ProtectedRoute> } />
          <Route path="/checkout" element={ <ProtectedRoute isLoggedIn={isLoggedIn}><Checkout cart={cart} onPlaceOrder={handlePlaceOrder} /></ProtectedRoute> } />
          <Route path="/order-tracking" element={ <ProtectedRoute isLoggedIn={isLoggedIn}><OrderTracking /></ProtectedRoute> } />
          <Route path="/settings" element={ <ProtectedRoute isLoggedIn={isLoggedIn}><Settings currentUser={currentUser} onLogout={handleLogout} /></ProtectedRoute> } />
          <Route path="/favorites" element={ <ProtectedRoute isLoggedIn={isLoggedIn}><Favorites favorites={favorites} products={productsData} toggleFavorite={toggleFavorite} addToCart={addToCart} /></ProtectedRoute> } />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};

const CartWrapper = ({ cart, updateQuantity }) => {
  const navigate = useNavigate();
  return <Cart cartItems={cart} updateQuantity={updateQuantity} onCheckout={() => navigate('/checkout')} />;
};

// --- UPDATED HOME COMPONENT ---
const Home = ({ navigate }) => {
  const [activeProcess, setActiveProcess] = useState(null);

  const handleHomeFeedback = (e) => {
    e.preventDefault();
    alert("Submitted the feedback");
    e.target.reset();
  };

  // --- 1. ADDED IMAGES TO THE PROCESS DATA ---
  const processes = [
    { 
        icon: "🍒", 
        title: "Harvesting", 
        detail: "It all begins on the high-altitude slopes where our expert farmers hand-pick only the ripest, deepest red coffee cherries. This careful selection ensures the natural sweetness and complex flavor notes are captured right from the source before washing.",
        img: "https://images.unsplash.com/photo-1524414287096-c7fb74abe3eb?q=80&w=600"
    },
    { 
        icon: "☀️", 
        title: "Processing", 
        detail: "Once harvested, the cherries are washed and sun-dried using traditional eco-friendly methods. This careful process safely removes the outer fruit while allowing the inner beans to naturally ferment, locking in their unique regional characteristics.",
        img: "https://images.unsplash.com/photo-1518057111178-44a106bad636?q=80&w=600"
    },
    { 
        icon: "🔥", 
        title: "Roasting", 
        detail: "Our master roasters apply the perfect balance of heat and timing to transform the green beans. Roasted in small, closely monitored batches, we coax out the rich aromas, natural oils, and bold flavors tailored exactly to each specific blend.",
        img: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=600"
    },
    { 
        icon: "☕", 
        title: "Brewing", 
        detail: "The final step of the journey is in your cup. Using precise temperature control and optimal extraction methods, the freshly roasted beans are brewed to perfection, delivering a smooth, rich, and unforgettable coffee experience straight to you.",
        img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600"
    }
  ];

  return (
    <div>
      <div className="modern-hero">
        <div className="hero-content-wrapper">
            <div className="hero-image-side left">
                <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93" alt="Coffee Beans" />
            </div>
            <div className="hero-text-center">
                <h1>The best quality coffee beans for the best coffee brew</h1>
                <p>Experience the rich aroma and distinct taste of our premium artisanal coffee, roasted to perfection just for you.</p>
                <button className="hero-btn-modern" onClick={() => navigate('/menu')}>Order Now</button>
            </div>
            <div className="hero-image-side right">
                <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348" alt="Coffee Cup" />
            </div>
        </div>
      </div>

      <div className="featured-strip">
        <div className="featured-header">
            <h3>Popular Products</h3>
            <button onClick={() => navigate('/menu')}>View All</button>
        </div>
        <div className="featured-cards">
            <div className="f-card">
                <img src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=200" alt="Cappuccino" />
                <div className="f-details">
                    <h4>Cappuccino</h4>
                    <span>$5.50</span>
                </div>
            </div>
            <div className="f-card">
                <img src="https://www.mygingergarlickitchen.com/wp-content/uploads/2024/05/iced-caramel-latte-recipe-2.jpg" alt="Iced Latte" />
                <div className="f-details">
                    <h4>Iced Latte</h4>
                    <span>$5.20</span>
                </div>
            </div>
            <div className="f-card">
                <img src="https://images.unsplash.com/photo-1550950158-d0d960dff51b?q=80&w=200" alt="Turkish" />
                <div className="f-details">
                    <h4>Turkish Coffee</h4>
                    <span>$6.00</span>
                </div>
            </div>
        </div>
      </div>

      <div className="modern-process-section">
        <div className="container">
            <div className="process-header-row">
                <div className="process-header-text">
                    <span className="process-tag">The Journey</span>
                    <h2>From Bean to Cup</h2>
                    <p>We carefully curate every step of the process to ensure the finest quality coffee reaches your mug. Click on any step to dive deeper into our story.</p>
                    <button className="hero-btn-modern" style={{padding: '10px 30px', fontSize: '0.9rem'}}>Get Started</button>
                </div>
            </div>

            <div className="timeline-wrapper">
                <svg className="timeline-svg" viewBox="0 0 1000 200" preserveAspectRatio="none">
                    <path d="M0,150 C200,150 250,50 500,50 C750,50 800,150 1000,150" fill="none" stroke="#f36f21" strokeWidth="3" strokeDasharray="10 5" />
                </svg>

                <div className="timeline-steps-container">
                    {processes.map((proc, index) => (
                        <div 
                            key={index} 
                            className={`timeline-step step-${index % 2 === 0 ? 'bottom' : 'top'}`}
                            onClick={() => setActiveProcess(proc)}
                        >
                            <div className="step-bg-number">{index + 1}</div>
                            <div className="step-dot"></div>
                            <div className="step-info">
                                <div className="step-icon-small">{proc.icon}</div>
                                <h4>{proc.title}</h4>
                                <span>Read More</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
      
      {/* --- 2. THE NEW SLEEK DARK MODAL --- */}
      {activeProcess && (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
            padding: '20px'
        }} onClick={() => setActiveProcess(null)}>
           
           <div style={{
               display: 'flex', backgroundColor: '#212121', color: '#f1f1f1',
               borderRadius: '16px', overflow: 'hidden', maxWidth: '850px', width: '100%',
               boxShadow: '0 20px 50px rgba(0,0,0,0.7)', position: 'relative',
               flexDirection: window.innerWidth < 768 ? 'column' : 'row' // Responsive switch
           }} onClick={(e) => e.stopPropagation()}>
              
              <button onClick={() => setActiveProcess(null)} style={{
                  position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.15)',
                  border: 'none', color: 'white', borderRadius: '50%', width: '35px', height: '35px',
                  cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10
              }}>
                  <FiX size={20} />
              </button>

              {/* Left Image Side */}
              <div style={{ flex: '1', minHeight: '300px' }}>
                  <img src={activeProcess.img} alt={activeProcess.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Right Text Side */}
              <div style={{ flex: '1.2', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{activeProcess.icon}</div>
                  
                  <h2 style={{ fontSize: '2.2rem', marginBottom: '15px', borderBottom: '2px solid #c29545', paddingBottom: '10px', display: 'inline-block', width: 'max-content' }}>
                      {activeProcess.title}
                  </h2>
                  
                  <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#b3b3b3' }}>
                      {activeProcess.detail}
                  </p>
                  
                  <div style={{ marginTop: '30px' }}>
                      <button onClick={() => setActiveProcess(null)} style={{
                          background: '#c29545', color: 'white', border: 'none', padding: '12px 25px',
                          borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold'
                      }}>Close Preview</button>
                  </div>
              </div>

           </div>
        </div>
      )}

      <div className="about-section" id="about-us">
        <div className="container">
          <h2 className='a'>About Us</h2>
          <div className="about-content">
             <div className="about-text">
                <h3>Brewing Passion Since 2026</h3>
                <p>Crafted from the finest coffee beans, our brews are made for true coffee lovers.
                    We roast in small batches to preserve freshness and depth of flavor.
                    Each cup delivers rich aroma, smooth texture, and bold character.
                    Experience coffee made with care, passion, and precision.</p>
             </div>
             <div className="about-image"><img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb" alt="About Us" /></div>
          </div>
        </div>
      </div>

      <div className="modern-feedback-section">
        <div className="feedback-header">
            <h2>We Value Your Feedback</h2>
        </div>
        
        <div className="feedback-content-wrapper">
            <div className="feedback-info-col">
                <h3>OPENING HOURS</h3>
                <p>Tues - Thurs: 9am - 5pm</p>
                <p>Fri: 9am - 7pm / Sat: 8am - 4pm</p>
                <p>Sun - Mon: Closed</p>
                <br />
                <a href="mailto:contacts@coffeeapp.com" className="feedback-email">contacts@coffeeapp.com</a>
            </div>

            <div className="feedback-image-col">
                <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=400&auto=format&fit=crop" alt="Cafe Architecture" />
            </div>

            <div className="feedback-form-col">
                <form onSubmit={handleHomeFeedback}>
                    <input type="text" placeholder="Name" required />
                    <input type="email" placeholder="Email" required />
                    <textarea placeholder="Message" rows="4" required></textarea>
                    <button type="submit" className="feedback-submit-link">Submit</button>
                </form>
            </div>
        </div>
      </div>

      <div className="location-section">
        <h2>Visit Our Cafe</h2>
        <div className="location-container">
          <div className="location-info">
            <FiMapPin className="map-icon" />
            <h3>CoffeeApp HQ</h3>
            <p><strong>Address:</strong> 123 Brew Street, Coffee District, New York, NY 10001</p>
            <button className="location-btn">Get Directions</button>
          </div>
          <div className="map-frame">
            <iframe title="Cafe Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215560765977!2d-73.98785308459375!3d40.74790797932796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629815462743!5m2!1sen!2sus" width="100%" height="300" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;