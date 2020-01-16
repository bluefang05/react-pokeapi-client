import React, { useState } from "reactn";
import { Form, Text } from 'informed';
import "./css/style.css";
import swal from "sweetalert";
import Modal from 'react-responsive-modal';

function Row(props) {
    const [informationModalVisibility, setInformationModalVisibility] = useState(false);
    const [editionModalVisibility, setEditionModalVisibility] = useState(false);

    const openInfoModal = () => {
        setInformationModalVisibility(true);
    }

    const closeInfoModal = () => {
        setInformationModalVisibility(false);
    }

    const openEditionModal = () => {
        setEditionModalVisibility(true);
    }

    const closeEditionModal = () => {
        setEditionModalVisibility(false);
    }

    const confirmDelete = () => {
        swal({
            title: "Do you want to delete this row?",
            text: "Everything will be lost",
            icon: "warning",
            buttons: ["cancel", "understood"],
            dangerMode: true
        }).then(willDelete => {
            if (willDelete) {
                props.deleteRow(props.index);
            }
        });
    };

    const editRow = ( obj ) => {
        props.editRow( props.index, obj );
        closeEditionModal();
    }

    return (

        <tr>
            <Modal open={informationModalVisibility} onClose={() => { closeInfoModal() }} center>
            <div className="uk-height-large uk-width-medium  uk-overflow-auto" >
                    <fieldset className="uk-fieldset">

                        <legend className="uk-legend">Review row</legend>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">firstName</label>
                            <div required={true} className="uk-input" type="text" >
                                {props.firstName}
                            </div>

                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">lastName</label>
                            <div required={true} className="uk-input" type="text" >
                                {props.lastName}
                            </div>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">date</label>
                            <div required={true} className="uk-input" type="text" >
                                {props.date}
                            </div>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">arrival time</label>
                            <div required={true} className="uk-input" type="text" >
                                {props.arrival}
                            </div>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">phone</label>
                            <div required={true} className="uk-input" type="text" >
                                {props.phone}
                            </div>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">email</label>
                            <div required={true} className="uk-input" type="text" >
                                {props.email}
                            </div>
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">SSN</label>
                            <div required={true} className="uk-input" type="text" >
                                {props.ssn}
                            </div>
                        </div>

                    </fieldset>
                </div>
            </Modal>
            <Modal open={editionModalVisibility} onClose={() => { closeEditionModal() }} center>
                <Form 
                initialValues={ 
                    { "firstName" : props.firstName, 
                      "lastName" : props.lastName,
                      "date" : props.date,
                      "arrival" : props.arrival,
                      "phone" : props.phone,
                      "email" : props.email,
                      "ssn" : props.ssn




                       } } className="uk-height-large uk-overflow-auto" onSubmit={ editRow } >
                    <fieldset className="uk-fieldset">

                        <legend className="uk-legend">Edit row</legend>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">firstName</label>
                            <Text required={true} field="firstName" className="uk-input" value={props.firstName} type="text" />
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">lastName</label>
                            <Text required={true} field="lastName" className="uk-input" value={props.lastName} type="text" />
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">date</label>
                            <Text required={true} field="date" className="uk-input" value={props.date} type="date" />
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">arrival time</label>
                            <Text required={true} field="arrival" className="uk-input" value={props.arrival} type="time" />
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">phone</label>
                            <Text required={true} field="phone" className="uk-input" value={props.phone} type="text" />
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">email</label>
                            <Text required={true} field="email" className="uk-input" value={props.email} type="text" />
                        </div>
                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">SSN</label>
                            <Text required={true} field="ssn" className="uk-input" value={props.ssn} type="text" />
                        </div>
                        <div className="uk-margin uk-flex uk-flex-center" >
                            <button type="submit" className="uk-button uk-button-primary uk-button-small">Edit</button>
                        </div>

                    </fieldset>
                </Form>
            </Modal>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.date}</td>
            <td>{props.arrival}</td>
            <td>{props.phone}</td>
            <td>{props.email}</td>
            <td>{props.ssn}</td>
            <td className="uk-flex uk-flex-between">
                <span onMouseDown={() => { openInfoModal(); }} className="icon info-icon" uk-icon="info"></span>                
                <span onMouseDown={() => { openEditionModal(); console.log(props); }} className="icon pencil-icon" uk-icon="pencil"></span>
                <span onMouseDown={() => { confirmDelete(); }} className="icon trash-icon" uk-icon="trash"></span>
            </td>
        </tr>
    )
}

export default Row;