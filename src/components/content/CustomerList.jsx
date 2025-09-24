import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/CustomerList.css';




function CustomerList({ setSelectedCustomer, setView }) {

    const initialFormCustomer = { id: -1, name: "", email: "", password: "" };

    const pageSize = 10;
    const [page, setPage] = useState(1);

    const [formCustomer, setFormCustomer] = useState(initialFormCustomer);
    const [customers, setCustomers] = useState([]);
    const [selectCustomerId, setselectCustomerId] = useState(-1);
    const [morePages, setMorePages] = useState(true)

    const resetFormCustomer = () => setFormCustomer(initialFormCustomer);

    const navigate = useNavigate();

    async function getCustomerList(pageNum = page) {
        const custo = fetch(`http://localhost:4000/customers?_page=${pageNum}&_limit=${pageSize}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCustomers(data)
                setMorePages(data.length === pageSize);
            })
            .catch(err => console.error("error fetching:", err));

    }

    useEffect(() => {
        getCustomerList()
    }, [page]);

    const getCustomer = function (id) {
        fetch(`http://localhost:4000/customers/${id}` , {method: "GET"})
        .then(res => res.json())
        .then(data => {return data})
        .catch(err => console.error("error fetching", err));
    }


    const selectCustomer = function (cId) {
        if (selectCustomerId == cId) {
            setselectCustomerId(-1);
            resetFormCustomer();
            console.log(`Customer ${cId} was deselected`);
        } else {
            setselectCustomerId(cId);
            const selected = getCustomer(cId);
            setFormCustomer(selected || initialFormCustomer);
            console.log(`Customer ${cId} was selected`);
        }
    }

    const validSelectedCustomerId = function (caller = '', flag = false) {
        const isValid = customers.some(c => c.id === selectCustomerId);
        if (flag)
            console.log(`Validate selectedCustomerId: ${isValid}. Caller: ${caller}`);
        return isValid;
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

    const updateCustomer = function () {
        if (validSelectedCustomerId()) {
            const cust = customers.find(c => c.id === selectCustomerId);
            if (!cust) navigate('/add');
            setSelectedCustomer(cust);
            navigate(`/update/${cust.id}`);
            console.log(`Navigating to ADD with customer id ${cust.id}`);
        }
    }

    const addCustomer = function () {
        navigate(`/add`);
        console.log(`Navigating to the ADD page`);
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
                    {customers.map((cust) => {
                        return (
                            <li key={cust.id} 
                                onClick={(_) => selectCustomer(cust.id)} 
                                className={(selectCustomerId == cust.id) ? 'selected' : ''}>
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
                    <button id="fetch-btn" onClick={() => {setPage(1); getCustomerList();}}>FETCH CUSTOMERS</button>
                    <button id="add-btn" onClick={addCustomer} disabled={validSelectedCustomerId('Add Btn')}>ADD CUSTOMER</button>
                    <button id="edit-btn" onClick={updateCustomer} disabled={!validSelectedCustomerId('Edit Btn')}>EDIT CUSTOMER</button>
                    <button id="delete-btn" onClickCapture={() => deleteCustomer(selectCustomerId)} disabled={!validSelectedCustomerId('Delete Btn')}>DELETE CUSTOMER</button>
                    <button onClick={(_) => selectCustomer(selectCustomerId)} disabled={selectCustomerId === -1}>CANCEL SELECTION</button>
                    <button id="prev-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous 10</button>
                    <button id="next-btn" onClick={() => setPage(p => Math.max(1, p + 1))} disabled={!morePages}>Next 10</button>
                </div>
            </section>
        </>
    );
}


export default CustomerList;