const initialState = { oblastid: 1 }
 const oblastAction = (state = initialState , action) => {
   console.log(state)
    switch (action.type) {
      case "CHANGE_OBLAST":
        return { ...state, oblastid: action.payload  }
  
      default:
        return state
    }
  }
  
  export default oblastAction