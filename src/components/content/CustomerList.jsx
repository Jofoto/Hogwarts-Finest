import { useEffect, useState } from 'react';
import '../../styles/CustomerList.css';

import { getAll, get } from '../../memdb.js';


function CustomerList({onDelete, setSelectedCustomer, setView}) {

    const initialFormCustomer = { id: -1, name: "", email: "", password: "" };

    const [formCustomer, setFormCustomer] = useState(initialFormCustomer);
    const [customers, setCustomers] = useState([]);
    const [selectCustomerId, setselectCustomerId] = useState(-1);


    //Get all wizards from memdb
    useEffect(() => {
        setCustomers(getAll());
    }, []);

    const resetFormCustomer = () => setFormCustomer(initialFormCustomer);

    const selectCustomer = function (artId) {
        if (selectCustomerId == artId) {
            setselectCustomerId(-1);
            resetFormCustomer();
            console.log(`Customer ${artId} was deselected`);
        } else {
            setselectCustomerId(artId);
            const selected = get(artId); //memdb
            setFormCustomer(selected || initialFormCustomer);
            console.log(`Customer ${artId} was selected`);
        }
    }

    const validSelectedCustomerId = function (caller = '') {
        const isValid = customers.some(c => c.id === selectCustomerId);
        console.log(`Validate selectedCustomerId: ${isValid}. Caller: ${caller}`);
        return isValid;
    }

    const deleteCustomer = function () {
        console.log(`Delete customer`);
        if (validSelectedCustomerId()) {
            onDelete(selectCustomerId); //delete from memdb
            setselectCustomerId(-1);
            resetFormCustomer();
            console.log(`Customer ${selectCustomerId} deleted`);
        }
    }

    const updateCustomer = function () {
        if (validSelectedCustomerId()) {
            const cust = customers.find(c => c.id === selectCustomerId);
            if (!cust) return;
            setSelectedCustomer(cust); 
            setView('Add');
            console.log(`Navigating to ADD with customer id ${cust.id}`);
        }
    }

    return (
        <>
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
                <ul className='CustomerList'>
                    {customers.map((cust, index) => {
                        return (
                            <li key={cust.id} onClick={(_) => selectCustomer(cust.id)} className={(selectCustomerId == cust.id) ? 'selected' : ''}>
                                {cust.id}, <span id='space'></span>
                                {cust.name}, <span id='space'></span>
                                {cust.email}, <span id='space'></span>
                                {cust.password}
                            </li>
                        );
                    })
                    }
                </ul>
                <div>
                    <h3>Customer Functionality</h3>
                    <button id="edit-btn" onClick={updateCustomer} disabled={!validSelectedCustomerId('Edit Btn')}>EDIT CUSTOMER</button>
                    <button id="delete-btn" onClick={deleteCustomer} disabled={!validSelectedCustomerId('Delete Btn')}>DELETE CUSTOMER</button>
                </div>
            </section>
        </>
    );
}

export default CustomerList;