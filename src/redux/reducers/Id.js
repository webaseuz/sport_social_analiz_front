const initialState = { id: 1 }
 const IdAction = (state = initialState , action) => {
   console.log(state)
    switch (action.type) {
      case "SEND_ID":
        return { ...state, id: action.payload  }
  
      default:
        return state
    }
  }
  
  export default IdAction