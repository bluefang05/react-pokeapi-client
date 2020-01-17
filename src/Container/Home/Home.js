import React, { useState, useGlobal, useDispatch } from "reactn";
import { Form, Text } from 'informed';
import "./css/style.css";
import Row from "../../Component/Row/Row";
import ConfirmationCard from "../../Component/ConfirmationCard/ConfirmationCard"
import Modal from 'react-responsive-modal';

function Home(props) {

    const [pokemons, setPokemons] = useGlobal("pokemons");
    const [addRowModalvisibility, setAddRowModalvisibility] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const updateTemporaryPokemonDetails = useDispatch("updateTemporaryPokemonDetails");
    const [temporaryPokemonDetails] = useGlobal("temporaryPokemonDetails");
    const updateLocalStorage = useDispatch("updateLocalStorage");

    let storedPokemons =
        localStorage.getItem("pokemons") != null ? JSON.parse(localStorage.getItem("pokemons")) : [];


    if (!initialized) {


        setPokemons(storedPokemons);
        setInitialized(true);
    }

    let pokemonRows = [];


    const addRow = () => {

        let newArr = Array.from(pokemons);
        newArr.push(temporaryPokemonDetails);
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


    const openAddRowModal = () => {
        setAddRowModalvisibility(true);
    }

    const closeAddRowModal = () => {
        setAddRowModalvisibility(false);
    }

    pokemons.forEach((element, index) => {
        pokemonRows.push(
            <Row
                key={"row" + index}
                index={index}
                name={element.name}
                sprite={element.sprites.front_default}
                id={element.id}
                weight={element.weight}
                height= {element.height}
                base_experience = {element.base_experience}
                deleteRow={deleteRow}
            />

        )
    });

    let confirmationCard = temporaryPokemonDetails != null ?
        <div><ConfirmationCard
            name={temporaryPokemonDetails.name}
            sprite={temporaryPokemonDetails.sprites.front_default}
            id = {temporaryPokemonDetails.id}
        />
        <div className="uk-margin uk-flex uk-flex-center" >
            <button type="submit" className="uk-button uk-button-primary uk-button-small">Add</button>
        </div>
        </div>
        : <div></div>;

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
                                        <button onMouseDown={() => { openAddRowModal(); }} className="uk-button uk-button-primary uk-button-small">Add pokemon</button>
                                    </p>

                                    <Modal open={addRowModalvisibility} onClose={() => { closeAddRowModal() }} center>
                                        <Form className="uk-height-medium uk-width-large uk-overflow-auto" onSubmit={addRow} >
                                            

                                                
                                                <div className="uk-margin uk-flex uk-flex-column">
                                                    <label className="uk-form-label" htmlFor="form-stacked-text">Please type the pokemon's name or number</label>
                                                    <Text onChange={(e) => { updateTemporaryPokemonDetails(e.target.value) }} required={true} field="identifier" className="uk-input uk-width-small"  type="text" />
                                                </div>

                                                {confirmationCard}


                                        </Form>
                                    </Modal>
                                    <div className="uk-card-body">
                                        <table className="uk-table uk-table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Number</th>
                                                    <th>Name</th>
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