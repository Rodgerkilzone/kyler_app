const location=(state=null,action)=>{
    if(action.type=="UPDATE_LOCATION"){
        state = action.location
        return state
    }else{
          return state
    }
  
}
export default location