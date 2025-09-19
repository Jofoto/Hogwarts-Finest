import { useState } from 'react';

function Body(){
    const customerList = [
        { id: 1, name: "Sam Smith", email: "samsmith@adp.com", password: "sam1234" },
        { id: 2, name: "Sam Smyth", email: "samsmith2@adp.com", password: "sam12345" },
        { id: 3, name: "Sam Smih", email: "samsmith3@adp.com", password: "sam1234567" },
        { id: 4, name: "Samm Sith", email: "samsmith4@adp.com", password: "sam1234567" }
        ];
    
    const [customers, setCustomers] = useState(customerList);
    const [selectedArticleId, setSelectedArticleId] = useState(-1);
    const selectArticle = function(artId) {
      if (selectedArticleId == artId) {
        setSelectedArticleId(-1);
        console.log(`Customer ${artId} was deselected`);
      } else {
        setSelectedArticleId(artId)
        console.log(`Customer ${artId} was selected`);
      }
    }
    const [view, setView] = useState('Home');
    return(
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
                <tr><td>A</td><td>B</td><td>C</td><td>D</td></tr>
              </tbody>
            </table>
            <ul className='customerList'>
              {customerList.map((customers, index) => {
                return (
                  <li key={customers.id} onClick={(_) => selectArticle(customers.id)} className={(selectedArticleId == customers.id) ? 'selected' : ''}>
                    {customers.id},
                    {customers.name},
                    {customers.email},
                    {customers.password}
                  </li>
                );
              })
              }
            </ul>
            <div>
              <button id="add-btn" onClick={() => console.log(`Just pressed the add-btn`)}>ADD CUSTOMER</button>
              <button id="edit-btn" onClick={() => console.log(`Just pressed the edit-btn`)}>EDIT CUSTOMER</button>
              <button id="delete-btn" onClick={() => console.log(`Just pressed the delete-btn`)}>DELETE CUSTOMER</button>
            </div>
          </section>
        )}

        {view === 'Search' && (
          <section>
            <h2>Search Wizards</h2>
            <p>Wizard Search</p>
          </section>
        )}
      </main>
        </div>
    )
}

export default Body;