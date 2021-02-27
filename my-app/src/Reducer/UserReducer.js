export const initialState=null
export const UserReducer = (state,action) => {
    if(action.type=="USER")
        return action.payload
    else
        return state
    if(action.type=="CLEAR")
        return null
}
