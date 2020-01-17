import { addReducer } from "reactn";
const superagent = require('superagent');

addReducer(
    "updateTemporaryPokemonDetails", (global, action) => {
        console.log("superagent will start");
        superagent
        .get("https://pokeapi.co/api/v2/pokemon/25/")
        .end( (err, res) => {
            let text = res.text;
            console.log(res.text);
            if(res){
                
                    global.temporaryPokemonDetails = JSON.parse( res.text );
                    console.log(global)

                
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

