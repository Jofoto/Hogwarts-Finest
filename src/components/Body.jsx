import { useState } from 'react';
import { Route, Routes, Navigate, NavLink, useNavigate } from 'react-router-dom';

import Home from './content/Home.jsx';
import Add from './content/Add.jsx';
import Login from './content/Login.jsx';
import CustomerList from './content/CustomerList.jsx';

import '../styles/Body.css';

function Body({ isLoggedIn, setIsLoggedIn }) {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const navigate = useNavigate();

  const highestCustomerId = function () {
    return customers.length > 0 ? Math.max(...customers.map(c => c.id)) : 0;
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/home');
  };

  return (
    <div>
      <div className='body'>
        <aside className='aside'>
          <nav>
            <li><NavLink to="/home" style={{ textDecoration: "none", color: "inherit" }}>Home</NavLink></li>
            {isLoggedIn && (
              <>
                <li><NavLink to="/add" style={{ textDecoration: "none", color: "inherit" }}>Add</NavLink></li>
              </>
            )}
            <li><NavLink to="/list" style={{ textDecoration: "none", color: "inherit" }}>List</NavLink></li>
            <li>
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    background: "none",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Logout
                </button>
              )}
              {!isLoggedIn && (
                <>
                  <NavLink to="/login" style={{ textDecoration: "none", color: "inherit" }}>Login</NavLink>
                </>
              )}
            </li>
          </nav>
        </aside>
      </div>

      <main className='main'>
        <Routes>

          {/* Redirect root to /home */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Home */}
          <Route path="/home" element={<Home />} />

          {isLoggedIn && (
            <>
              {/* Add */}
              <Route path="/add" element={
                <Add
                  selectedCustomer={selectedCustomer}
                  setSelectedCustomer={setSelectedCustomer}
                  customers={customers}
                  highestCustomerId={highestCustomerId}
                />
              } />

              <Route path="/update/:id" element={
                <Add
                  selectedCustomer={selectedCustomer}
                  setSelectedCustomer={setSelectedCustomer}
                  customers={customers}
                  highestCustomerId={highestCustomerId}
                />
              } />
            </>
          )}

          {!isLoggedIn && (
            <>
              {/* Login */}
              < Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            </>
          )}

          {/* List */}
          <Route path="/list" element={
            <CustomerList
              customers={customers}
              setSelectedCustomer={setSelectedCustomer}
              isLoggedIn={isLoggedIn}
            />
          } />
        </Routes>
      </main>
    </div>
  )
}

export default Body;