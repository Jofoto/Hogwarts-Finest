import { useState } from 'react'
import './App.css'

function App() {
  const customerList = [
    {id: 1, name: "Sam Smith", email: "samsmith@adp.com", password: "sam1234"}
  ];

  const [customers, setCustomers] = useState(customerList);

  return(
    <div className='app'>
      <header><h1>Hogwarts Finest Customer List</h1></header>
        <ul className='customerList'>
          {customerList.map((customers) => {
            return 
              <li key={customers.id}>
                {customers.name},
                {customers.email},
                {customers.password}
              </li>
              console.log(`${customerList[0].name} Here are the customers!`);
          
            })
          }
        </ul>
      
    </div>
  )
}

export default App
