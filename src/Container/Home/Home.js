import React, { useState, useGlobal, useDispatch } from "reactn";
import { Form, Text } from 'informed';
import "./css/style.css";
import Row from "../../Component/Row/Row";
import Modal from 'react-responsive-modal';

function Home(props) {


    const updateLocalStorage = useDispatch("updateLocalStorage");
    const [contacts, setContacts] = useGlobal("contacts");
    const [addRowModalvisibility, setAddRowModalvisibility] = useState(false);
    const [initialized, setInitialized] = useState(false);
    let storedContacts =
        localStorage.getItem("contacts") != null ? JSON.parse(localStorage.getItem("contacts")) : [];


    if (!initialized) {


        setContacts(storedContacts);
        setInitialized(true);
    }

    let contactRows = [];


    const addRow = (info) => {
        let newArr = Array.from(contacts);
        newArr.push(info);
        localStorage.setItem('contacts', JSON.stringify(newArr));
        setContacts(newArr);
        updateLocalStorage();
        closeAddRowModal();
    }

    const deleteRow = (index) => {
        let newRows = [...contacts];
        newRows.splice(index, 1);
        setContacts(newRows);
        updateLocalStorage();
    }

    const editRow = (index, obj) => {
        let newRows = [...contacts];
        newRows[index] = obj;
        setContacts(newRows);
        updateLocalStorage();
    }

    const openAddRowModal = () => {

        setAddRowModalvisibility(true);
    }

    const closeAddRowModal = () => {
        setAddRowModalvisibility(false);
    }

    contacts.forEach((element, index) => {
        contactRows.push(
            <Row
                key={"row" + index}
                index={index}
                firstName={element.firstName}
                lastName={element.lastName}
                date={element.date}
                arrival={element.arrival}
                phone={element.phone}
                email={element.email}
                ssn={element.ssn}
                deleteRow={deleteRow}
                editRow={editRow}
            />
        )
    });

    return (
        <div>
            <div className="content-padder content-background">
                <div className="uk-section-small uk-section-default header">
                    <div className="uk-container uk-container-large">
                        <h1><span className="ion-speedometer"></span> Contacts</h1>
                        <p>
                            Contacts will be saved in the local storage
                    </p>
                    </div>
                </div>
                <div className="uk-section-small">
                    <div className="uk-container uk-container-large">

                        <div uk-grid="" className="uk-child-width-1-1@s uk-child-width-1-1@l uk-grid uk-grid-stack">
                            <div className="uk-first-column">
                                <div className="uk-card uk-card-default">
                                    <p className="uk-margin">
                                        <button onMouseDown={() => { openAddRowModal(); }} className="uk-button uk-button-primary uk-button-small">Add contact</button>
                                    </p>

                                    <Modal open={addRowModalvisibility} onClose={() => { closeAddRowModal() }} center>
                                        <Form className="uk-height-large uk-overflow-auto" onSubmit={addRow} >
                                            <fieldset className="uk-fieldset">

                                                <legend className="uk-legend">Add new row</legend>

                                                <div className="uk-margin">
                                                    <label className="uk-form-label" htmlFor="form-stacked-text">firstName</label>
                                                    <Text required={true} field="firstName" className="uk-input" value={props.firstName} type="text" />
                                                </div>
                                                <div className="uk-margin">
                                                    <label className="uk-form-label" htmlFor="form-stacked-text">lastName</label>
                                                    <Text required={true} field="lastName" className="uk-input" type="text" />
                                                </div>
                                                <div className="uk-margin">
                                                    <label className="uk-form-label" htmlFor="form-stacked-text">date</label>
                                                    <Text required={true} field="date" className="uk-input" type="date" />
                                                </div>
                                                <div className="uk-margin">
                                                    <label className="uk-form-label" htmlFor="form-stacked-text">arrival time</label>
                                                    <Text required={true} field="arrival" className="uk-input" type="time" />
                                                </div>
                                                <div className="uk-margin">
                                                    <label className="uk-form-label" htmlFor="form-stacked-text">phone</label>
                                                    <Text required={true} field="phone" className="uk-input" type="text" />
                                                </div>
                                                <div className="uk-margin">
                                                    <label className="uk-form-label" htmlFor="form-stacked-text">email</label>
                                                    <Text required={true} field="email" className="uk-input" type="text" />
                                                </div>
                                                <div className="uk-margin">
                                                    <label className="uk-form-label" htmlFor="form-stacked-text">SSN</label>
                                                    <Text required={true} field="ssn" className="uk-input" type="text" />
                                                </div>
                                                <div className="uk-margin uk-flex uk-flex-center" >
                                                    <button type="submit" className="uk-button uk-button-primary uk-button-small">Add</button>
                                                </div>

                                            </fieldset>
                                        </Form>
                                    </Modal>
                                    <div className="uk-card-body">
                                        <table className="uk-table uk-table-striped">
                                            <thead>
                                                <tr>
                                                    <th>FirstName</th>
                                                    <th>LastName</th>
                                                    <th>Date</th>
                                                    <th>Arrival</th>
                                                    <th>Phone</th>
                                                    <th>E-mail</th>
                                                    <th>SSN</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {contactRows}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Home;