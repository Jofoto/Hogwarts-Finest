import { useState } from 'react';
import { Route, Routes, Navigate, Link } from 'react-router'

import Home from './content/Home.jsx';
import Add from './content/Add.jsx';
import Search from './content/Search.jsx';
import CustomerList from './content/CustomerList.jsx';

import '../styles/Body.css';

function Body() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const highestCustomerId = function () {
    return customers.length > 0 ? Math.max(...customers.map(c => c.id)) : 0;
  }

  return (
    <div>
      <div className='body'>
        <aside className='aside'>
          <nav>
            <li><Link to="/home" style={{textDecoration: "none", color: "inherit"}}>Home</Link></li>
            <li><Link to="/add" style={{textDecoration: "none", color: "inherit"}}>Add</Link></li>
            <li><Link to="/list" style={{textDecoration: "none", color: "inherit"}}>List</Link></li>
            <li><Link to="/search" style={{textDecoration: "none", color: "inherit"}}>Search</Link></li>
          </nav>
        </aside>
      </div>

      <main className='main'>
        <Routes>

        {/* Redirect root to /home */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Home */}
        <Route path="/home" element={<Home/>}/>

        {/* Add */}
        <Route path="/add" element={
          <Add
          selectedCustomer={selectedCustomer} 
          setSelectedCustomer={setSelectedCustomer}
          customers={customers}
          highestCustomerId={highestCustomerId} 
          />
        }/>

        <Route path="/update/:id" element={
          <Add
          selectedCustomer={selectedCustomer} 
          setSelectedCustomer={setSelectedCustomer}
          customers={customers}
          highestCustomerId={highestCustomerId} 
          />
        }/>

        {/* List */}
        <Route path="/list" element={
          <CustomerList 
          customers={customers}
          setSelectedCustomer={setSelectedCustomer}
          />
        }/>

        {/* Search */}
        <Route path="/search" element={<Search/>} />
        </Routes>
      </main>
    </div>
  )
}

export default Body;