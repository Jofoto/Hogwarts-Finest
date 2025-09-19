import { useState } from 'react'
import './App.css'

function App() {
  const customerList = [
    { id: 1, name: "Sam Smith", email: "samsmith@adp.com", password: "sam1234" }
  ];

  const [customers, setCustomers] = useState(customerList);
  const [view, setView] = useState('Home');

  return (
    <div className='app'>
      <header className='header'><h1>Hogwarts Finest Customer List</h1>
        <img src="./public/HLogo.jpg" alt='Logo' className='logo'/>
      </header>

      {/* Body */}
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
          <section>
            <h2>Wizard Manager</h2>
            <p>Wizard Information Manager</p>
          </section>
        )}

        {/* Add */}
        {view === 'Add' && (
          <section>
            <h2>Add Wizard</h2>
            <p>Add Wizard</p>
          </section>
        )}

        {/* List */}
        {view === 'List' && (
          <section>
            <h2>Wizard List</h2>
            <table className='table'>
              <thead>
                <tr><th>ID</th><th>Name</th><th>Email</th><th>Password</th></tr>
              </thead>
              <tbody>
                <ul className='customerList'>
                  {customerList.map((customers) => {
                    return (
                      <li key={customers.id}>
                        {customers.id},
                        {customers.name},
                        {customers.email},
                        {customers.password}
                      </li>
                      );
                      console.log(`${customerList[0].name} Here are the customers!`);
                      })
                    }
                </ul>
              </tbody>
            </table>
          </section>
        )}

        {view === 'Search' && (
          <section>
            <h2>Search Wizards</h2>
            <p>Wizard Search</p>
          </section>
        )}
      </main>

      <footer className='footer'>
        <div>Wizards' Finest</div>
      </footer>
    </div>
  )
}

export default App
