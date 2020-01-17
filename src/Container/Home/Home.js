import React, { useState, useGlobal, useDispatch } from "reactn";
import { Form, Text } from 'informed';
import "./css/style.css";
import Row from "../../Component/Row/Row";
import Modal from 'react-responsive-modal';

function Home(props) {


    const updateLocalStorage = useDispatch("updateLocalStorage");
    const [pokemons, setPokemons] = useGlobal("pokemons");
    const [addRowModalvisibility, setAddRowModalvisibility] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const updateTemporaryPokemonDetails = useDispatch("updateTemporaryPokemonDetails");

    let storedPokemons =
        localStorage.getItem("pokemons") != null ? JSON.parse(localStorage.getItem("pokemons")) : [];


    if (!initialized) {


        setPokemons(storedPokemons);
        setInitialized(true);
    }

    let pokemonRows = [];


    const addRow = (info) => {
        
        let newArr = Array.from(pokemons);
        newArr.push(info);
        localStorage.setItem('pokemons', JSON.stringify(newArr));
        setPokemons(newArr);
        updateLocalStorage();
        closeAddRowModal();
    }

    const deleteRow = (index) => {
        let newRows = [...pokemons];
        newRows.splice(index, 1);
        setPokemons(newRows);
        updateLocalStorage();
    }

    const editRow = (index, obj) => {
        let newRows = [...pokemons];
        newRows[index] = obj;
        setPokemons(newRows);
        updateLocalStorage();
    }

    const openAddRowModal = () => {
        console.log(updateTemporaryPokemonDetails());
        //setAddRowModalvisibility(true);
    }

    const closeAddRowModal = () => {
        setAddRowModalvisibility(false);
    }

    pokemons.forEach((element, index) => {
        pokemonRows.push(
            <Row
                key={"row" + index}
                index={index}
                firstName={element.firstName}
                lastName={element.lastName}
                date={element.date}
                deleteRow={deleteRow}
            />
        )
    });

    return (
        <div>
            <div className="content-padder content-background">
                <div className="uk-section-small uk-section-default header">
                    <div className="uk-container uk-container-large">
                        <h1><span className="ion-speedometer"></span> Pokemons</h1>
                        <p>
                            Pokemon list will be saved in the local storage
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
                                                    <th>Number</th>
                                                    <th>Name</th>
                                                    <th>type</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pokemonRows}

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