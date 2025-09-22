import { useEffect, useState } from 'react';
import '../../styles/CustomerList.css';

import { getAll, get, post, put, deleteById } from '../../memdb.js';

function CustomerList() {
    // const customerList = [
    //     { id: 1, name: "Sam Smith", email: "samsmith@adp.com", password: "sam1234" },
    //     { id: 2, name: "Sam Smyth", email: "samsmith2@adp.com", password: "sam12345" },
    //     { id: 3, name: "Sam Smih", email: "samsmith3@adp.com", password: "sam1234567" },
    //     { id: 4, name: "Samm Sith", email: "samsmith4@adp.com", password: "sam1234567" }
    // ];

    const initalFormCustomer = { id: -1, name: "", email: "", password: "" };

    const [formCustomer, setFormCustomer] = useState(initalFormCustomer);
    const [customers, setCustomers] = useState([]);
    const [selectCustomerId, setselectCustomerId] = useState(-1);

    //Get all wizards from memdb
    useEffect(() => {
        setCustomers(getAll());
    }, []);

    const resetFormCustomer = () => setFormCustomer(initalFormCustomer);

    const selectCustomer = function (artId) {
        if (selectCustomerId == artId) {
            setselectCustomerId(-1);
            resetFormCustomer();
            console.log(`Customer ${artId} was deselected`);
        } else {
            setselectCustomerId(artId);
            // const selected = customers.find(c => c.id === artId);
            const selected = get(artId); //memdb
            setFormCustomer(selected || initalFormCustomer);
            console.log(`Customer ${artId} was selected`);
        }
    }

    const validSelectedCustomerId = function (caller = '') {
        const isValid = customers.some(c => c.id === selectCustomerId);
        console.log(`Validate selectedCustomerId: ${isValid}. Caller: ${caller}`);
        return isValid;
    }

    const changeHandler = function (event) {
        const { name, value } = event.target;
        console.log(`changeHandler(). Register input: Name ${name}, Val: ${value}`);
        setFormCustomer(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const addCustomer = function () {
        // const id = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
        // const newCustomer = { ...formCustomer, id: id };
        post({ ...formCustomer }); //memdb post
        // setCustomers([...customers, newCustomer]);
        const updated = getAll(); //memdb getall
        const newCustomer = updated[updated.length - 1];
        setCustomers(updated);
        resetFormCustomer();
        console.log(`Add customer with ID ${newCustomer.id}`);
    }

    const deleteCustomer = function () {
        console.log(`Delete customer`);
        if (validSelectedCustomerId()) {
            // setCustomers(customers.filter(c => c.id !== selectCustomerId));
            deleteById(selectCustomerId); //delete from memdb
            setCustomers(getAll());
            setselectCustomerId(-1);
            resetFormCustomer();
            console.log(`Customer ${selectCustomerId} deleted`);
        }
    }

    const updateCustomer = function () {
        if (validSelectedCustomerId()) {
            // setCustomers(customers.map(c =>
            //     c.id === selectCustomerId ? { ...formCustomer, id: selectCustomerId } : c
            // ));
            put(selectCustomerId, {...formCustomer, id: selectCustomerId}); //memdb put/update 
            setCustomers(getAll());
            setselectCustomerId(-1);
            resetFormCustomer();
            console.log(`Customer ${selectCustomerId} updated`);
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
                    <form>
                        <label name="name">Name</label>
                        <input type={"text"} name={"name"} value={formCustomer.name} onChange={(e) => changeHandler(e)} /><br />
                        <label name="email">Email</label>
                        <input type={"text"} name={"email"} value={formCustomer.email} onChange={(e) => changeHandler(e)} /><br />
                        <label name="password">Password</label>
                        <input type={"text"} name={"password"} value={formCustomer.password} onChange={(e) => changeHandler(e)} />
                    </form>
                    <button id="add-btn" onClick={addCustomer} disabled={validSelectedCustomerId('Add Btn')}>ADD CUSTOMER</button>
                    <button id="edit-btn" onClick={updateCustomer} disabled={!validSelectedCustomerId('Edit Btn')}>EDIT CUSTOMER</button>
                    <button id="delete-btn" onClick={deleteCustomer} disabled={!validSelectedCustomerId('Delete Btn')}>DELETE CUSTOMER</button>
                </div>
            </section>
        </>
    );
}

export default CustomerList;