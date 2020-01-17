import React, { useState } from "reactn";
import "./css/style.css";
import swal from "sweetalert";
import Modal from 'react-responsive-modal';

function Row(props) {
    const [informationModalVisibility, setInformationModalVisibility] = useState(false);

    const openInfoModal = () => {
        setInformationModalVisibility(true);
    }

    const closeInfoModal = () => {
        setInformationModalVisibility(false);
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


    return (

        <tr>
            <Modal   open={informationModalVisibility} onClose={() => { closeInfoModal() }} center>
                
                    <div className="uk-card-header">
                        <div className="uk-grid-small uk-flex-middle uk-grid" >
                            <div className="uk-width-auto">
                                <img className="uk-border-circle" width="100" height="100" src={props.sprite} alt = "front sprite" />
                            </div>
                            <div className="uk-width-expand">
                                <h3 className="uk-card-title uk-margin-remove-bottom">{props.name}</h3>
                                <p className="uk-text-meta uk-margin-remove-top">{props.id}</p>
                            </div>
                        </div>
                    </div>
                    <div className="uk-card-body">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                    <div className="uk-card-footer">
                        <ul className="uk-list">
                            <li>Weight : {props.weight}</li>
                            <li>Height : {props.height}</li>
                            <li>Base experience : {props.base_experience}</li>
                        </ul>


                    </div>
            </Modal>

            <td>{props.id}</td>
            <td>{props.name}</td>
            <td className="uk-flex uk-flex-start">
                <span onMouseDown={() => { openInfoModal(); }} className="icon info-icon" uk-icon="info"></span>
                <span onMouseDown={() => { confirmDelete(); }} className="icon trash-icon uk-margin-medium-left" uk-icon="trash"></span>
            </td>
        </tr>
    )
}

export default Row;