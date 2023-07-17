export const addPokemon = (details) =>  {
    return{
        type : "ADD_POKEMON",
        payload: details
    }
}

export const deletePokemon = (index) =>  {
    return{
        type : "DELETE_POKEMON",
        payload: index
    }
}

export const resetPokemon = () =>{
    return {
        type: "RESET"
    }
}