import { addReducer } from "reactn";


addReducer(
    "updateLocalStorage",
    (global) => {
        localStorage.setItem('contacts', JSON.stringify(global.contacts));
    }
);