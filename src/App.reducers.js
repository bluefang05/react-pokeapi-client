import { addReducer, setGlobal } from "reactn";
const superagent = require('superagent');

addReducer(
    "updateTemporaryPokemonDetails", (global, dispatch, action) => {
        
        console.log(action)
        console.log("superagent will start with action " + action);
        superagent
            .get("https://pokeapi.co/api/v2/pokemon/" + action + "/")
            .end((err, res) => {
                let text = res != null && res != undefined ? res.text : "Not Found";
               
                if (text != "Not Found") {
                    console.log(res.body)
                    global.temporaryPokemonDetails = JSON.parse(res.text);
                    console.log(global)
                    setGlobal({ temporaryPokemonDetails : JSON.parse(res.text) })


                } else {
                    setGlobal({ temporaryPokemonDetails : {name: "not found", order : 0}});
                    console.log(err);
                }
            });
    }
)



addReducer(
    "updateLocalStorage",
    (global) => {
        localStorage.setItem('pokemons', JSON.stringify(global.pokemons));
    }
);

