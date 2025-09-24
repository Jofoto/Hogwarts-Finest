import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../../styles/Add.css';

function Add({ selectedCustomer, setSelectedCustomer, setView, highestCustomerId }) {
    const initialForm = { id: -1, name: "", email: "", password: "" };
    const [formCustomer, setFormCustomer] = useState(initialForm);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id && selectedCustomer) {
            setFormCustomer(selectedCustomer);
        } else {
            setFormCustomer(initialForm);
        }
    }, [id, selectedCustomer])

    const changeHandler = function (event) {
        const { name, value } = event.target;
        console.log(`changeHandler(). Register input: Name ${name}, Val: ${value}`);
        setFormCustomer(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const cancelButton = () => {
        setFormCustomer(initialForm);
        setSelectedCustomer(null);
        navigate("/list");
    }

    function postCustomer() {
        const id = highestCustomerId;

        formCustomer.id = id;
        console.log(formCustomer);
        fetch('http://localhost:4000/customers', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formCustomer),
        })
            .then(res => res.json())
            .then(newCustomer => {
                newCustomer = { ...newCustomer, id: id };
                console.log(newCustomer.id)
            })
            .catch(err => console.error("Error:", err));
    }

    const putCustomer = () => {

        const id = selectedCustomer.id;

        fetch(`http://localhost:4000/customers/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formCustomer)
        })
            .then(res => res.json())
            .then(updated => {
                console.log(`Customer ${id} updated`);
            })
            .catch(err => console.error("Update failed:", err));

    }



    const addCustomer = function (e) {
        e.preventDefault();
        //Add wizard
        if (formCustomer.id === -1) {
            postCustomer();
            console.log(`Added new wizard with ID`);
        } else {
            //Update wizard
            putCustomer();
            console.log(`Updated Wizard ${formCustomer.id}`);
        }
        setFormCustomer(initialForm);
        setSelectedCustomer(null);
        navigate("/list");
    }


    return (
        <>
            <section>
                <h2>{formCustomer.id === -1 ? "Add Wizard" : "Update Wizard"}</h2>
                <form onSubmit={addCustomer}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" value={formCustomer.name} onChange={changeHandler} />
                    </div>

                    <div className="field">
                        <label>Email</label>
                        <input type="text" name="email" value={formCustomer.email} onChange={changeHandler} />
                    </div>

                    <div className="field">
                        <label>Password</label>
                        <input type="text" name="password" value={formCustomer.password} onChange={changeHandler} />
                    </div>
                    
                    <div className="actions">
                        <button type="submit">{formCustomer.id === -1 ? "ADD CUSTOMER" : "UPDATE CUSTOMER"}</button>
                        <button onClick={cancelButton} disabled={formCustomer.id === -1}>CANCEL</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Add;