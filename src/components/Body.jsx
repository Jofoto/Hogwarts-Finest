import { useState } from 'react';

import Home from './content/Home.jsx';
import Add from './content/Add.jsx';
import Search from './content/Search.jsx';
import CustomerList from './content/CustomerList.jsx';

import '../styles/Body.css';

function Body() {

  const [view, setView] = useState('Home');

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
          <Add />
        )}

        {/* List */}
        {view === 'List' && (
          <CustomerList />
        )}

        {view === 'Search' && (
          <Search />
        )}
      </main>
    </div>
  )
}

export default Body;