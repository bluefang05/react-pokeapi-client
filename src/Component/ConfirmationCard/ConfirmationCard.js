import React from "reactn";


function ConfirmationCards(props) {
  
    return (
        <div className="uk-card uk-card-default uk-width-1-1 ">
            <div className="uk-card-header uk-flex uk-flex-center">
                <div className="uk-grid-small uk-flex-middle uk-grid " >
                    <div className="uk-width-auto">
                        <img className="uk-border-circle" width="100" height="100" src={props.sprite} alt = "front sprite" />
                    </div>
                    <div className="uk-width-expand">
                        <h3 className="uk-card-title uk-margin-remove-bottom">{props.name}</h3>
                        <p className="uk-text-meta uk-margin-remove-top"> ID : {props.id}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ConfirmationCards;