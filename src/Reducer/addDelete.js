const initialState=[];

const addDelete = (state = initialState, action) => {
     if(action.type === "ADD_POKEMON"){
        return [action.payload, ...state];
     }else if(action.type === "DELETE_POKEMON"){
        return state.filter((e, index)=>action.payload !== index);
     }else if (action.type === "RESET"){
        return [];
     }
     else{
        return state;
     }
}

export default addDelete;