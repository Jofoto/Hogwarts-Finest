import { useState, useEffect, use } from 'react';

import '../../styles/CustomerList.css';



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

    const resetFormCustomer = () => setFormCustomer(initalFormCustomer);

    async function getCustomerList() {
        const custo = fetch(`http://localhost:4000/customers`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCustomers(data)
            })
            .catch(err => console.error("error fetching:", err));

    }
    useEffect(() => {
        getCustomerList()
    }, []);


    const selectCustomer = function (artId) {
        if (selectCustomerId == artId) {
            setselectCustomerId(-1);
            resetFormCustomer();
            console.log(`Customer ${artId} was deselected`);
        } else {
            setselectCustomerId(artId);
            const selected = customers.find(c => c.id === artId);
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

    function addCustomer() {
        const id = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
        formCustomer.id = id;
        console.log(formCustomer);
        fetch('http://localhost:4000/customers', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formCustomer),
        })
            .then(res => res.json())
            .then(newCustomer => {
                console.log(id)
                newCustomer = { ...newCustomer, id: id };
                console.log(newCustomer.id)
                setCustomers([...customers, newCustomer]);
                resetFormCustomer();
            })
            .catch(err => console.error("Error:", err));
    }

    const deleteCustomer = (id) => {
        fetch(`http://localhost:4000/customers/${id}`, { method: "DELETE" })
            .then(res => {
                if (validSelectedCustomerId('deleteCustomer()')) {
                    setCustomers(prev => prev.filter(c => c.id !== id));
                    setselectCustomerId(-1);
                    resetFormCustomer();
                    console.log(`Customer ${selectCustomerId} deleted`);
                } else { throw new Error("Failed to delete") }

            })
            .catch(err => console.error("Error deleting:", err));
    }

    const updateCustomer = () => {
        if (validSelectedCustomerId('updateCustomer')) {

            const id = selectCustomerId;

            fetch(`http://localhost:4000/customers/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formCustomer)
            })
                .then(res => res.json())
                .then(updated => {
                    setCustomers(prev => prev.map(c => (c.id === selectCustomerId ? { ...formCustomer, id: selectCustomerId } : c)));
                    setselectCustomerId(-1);
                    resetFormCustomer();
                    console.log(`Customer ${selectCustomerId} updated`);
                })
                .catch(err => console.error("Update failed:", err));
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
                    <button id="delete-btn" onClickCapture={() => deleteCustomer(selectCustomerId)} disabled={!validSelectedCustomerId('Delete Btn')}>DELETE CUSTOMER</button>
                </div>
            </section>
        </>
    );
}


export default CustomerList;