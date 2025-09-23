import { useState, useEffect } from "react";

function Add({ onAdd, onUpdate, selectedCustomer, setSelectedCustomer, setView }) {
    const initialForm = { id: -1, name: "", email: "", password: "" };
    const [formCustomer, setFormCustomer] = useState(initialForm);

    useEffect(() => {
        if (selectedCustomer) {
            setFormCustomer(selectedCustomer);
        }else{
            setFormCustomer(initialForm);
        }
    }, [selectedCustomer])

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
        setView('List'); //redirect
    }

    const addCustomer = function (e) {
        e.preventDefault();
        //Add wizard
        if(formCustomer.id === -1){
            onAdd({...formCustomer});
            console.log(`Added new wizard with ID`);
        }else{
            //Update wizard
            onUpdate(formCustomer.id, formCustomer);
            console.log(`Updated Wizard ${formCustomer.id}`);
        }
       setFormCustomer(initialForm);
       setSelectedCustomer(null);
       setView('List'); //redirect
    }

    
    return (
        <>
            <section>
                <h2>{formCustomer.id === -1 ? "Add Wizard" : "Update Wizard"}</h2>
                <form onSubmit={addCustomer}>
                    <label>Name</label>
                    <input type="text" name="name" value={formCustomer.name} onChange={changeHandler}/>
                    <label>Email</label>
                    <input type="text" name="email" value={formCustomer.email} onChange={changeHandler}/>
                    <label>Password</label>
                    <input type="text" name="password" value={formCustomer.password} onChange={changeHandler}/>

                    <button type="submit">{formCustomer.id === -1 ? "ADD CUSTOMER" : "UPDATE CUSTOMER"}</button>
                    <button onClick={cancelButton} disabled={formCustomer.id ==! -1}>CANCEL</button>
                </form>
            </section>
        </>
    );
}

export default Add;