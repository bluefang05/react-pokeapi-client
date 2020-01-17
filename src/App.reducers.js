import { addReducer, setGlobal } from "reactn";
const superagent = require('superagent');

addReducer(
    "updateTemporaryPokemonDetails", (global, dispatch, action) => {
        if(action){

        
        superagent
            .get("https://pokeapi.co/api/v2/pokemon/" + action + "/")
            .end((err, res) => {
                let text = res !== null && res !== undefined ? res.text : "Not Found";

                if (text !== "Not Found") {
                    setGlobal({ temporaryPokemonDetails: JSON.parse(res.text) })


                } else {
                    setGlobal({ temporaryPokemonDetails: null });

                }
            });
        }else{
            setGlobal({ temporaryPokemonDetails: null });
        }
    }
)



addReducer(
    "updateLocalStorage",
    (global) => {
        localStorage.setItem('pokemons', JSON.stringify(global.pokemons));
    }
);

