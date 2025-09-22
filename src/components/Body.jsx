import { useState, useEffect } from 'react';

import Home from './content/Home.jsx';
import Add from './content/Add.jsx';
import Search from './content/Search.jsx';
import CustomerList from './content/CustomerList.jsx';
import { getAll, post, put, deleteById } from '../memdb.js';

import '../styles/Body.css';

function Body() {

  const [view, setView] = useState('Home');
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

    //Get all wizards from memdb
    useEffect(() => {
        setCustomers(getAll());
    }, []);

    const handleAdd = (customer) => {
        post(customer);
        setCustomers(getAll());
    }

    const handleUpdate = (id, customer) => {
        put(id, customer);
        setCustomers(getAll());
    }

    const handleDelete = (id) => {
        deleteById(id);
        setCustomers(getAll());
    }

  return (
    <div>
      <div className='body'>
        <aside className='aside'>
          <nav>
            <li className={view === 'Home' ? 'active' : ''} onClick={() => setView('Home')}>Home</li>
            <li className={view === 'Add' ? 'active' : ''} onClick={() => setView('Add')}>Add</li>
            <li className={view === 'List' ? 'active' : ''} onClick={() => setView('List')}>List</li>
            <li className={view === 'Search' ? 'active' : ''} onClick={() => setView('Search')}>Search</li>
          </nav>
        </aside>
      </div>

      <main className='main'>
        {/* Home */}
        {view === 'Home' && (
          <Home />
        )}

        {/* Add */}
        {view === 'Add' && (
          <Add
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            selectedCustomer={selectedCustomer} setView={setView}
            customers={customers} 
        />
        )}

        {/* List */}
        {view === 'List' && (
          <CustomerList 
            customers={customers}
            // onUpdate={handleUpdate}
            onDelete={handleDelete} 
            setSelectedCustomer={setSelectedCustomer}
            setView={setView}/>
        )}

        {view === 'Search' && (
          <Search />
        )}
      </main>
    </div>
  )
}

export default Body;