 const oblast = (state , action) => {
    switch (action.type) {
      case "CHANGE_OBLAST":
        return { ...state, oblastid: action.payload }
  
      default:
        return state
    }
  }
  
  export default oblast