import { toast, Flip } from "react-toastify"
import React from 'react'
const ToastContainer = ({arr}) => {
    return(
        <div>
            {
                arr.map((item) => (
                    <span> { item } <br /></span> 
                ))
            }
        </div>
    )
}

const Notification = {
    successToast(message){
        return toast.success( message , { transition: Flip })
    },
    customErrorToast(message){
        return toast.error( message , { transition: Flip })
    },
    errorToast(error){
        if(error.status == 400){
            var arrText = []
            try{
                var array = Object.values(error.errors)
                var keyArray = Object.keys(error.errors)
                for(var i = 0; i < array.length; i++){
                    for(var j = 0; j < array[i].length; j++){
                        arrText.push((i+1) +  '.' +  (j!=0 ? (j+1)+'. ' : '')  + array[i][j] + ' (' + keyArray[i] + ')')
                    }
                }
            }
            catch(error){

            }
            
            
            return toast.error( <ToastContainer arr={arrText} /> , { transition: Flip })
        }
        if(error.status == 500){
            return toast.error( error.title , { transition: Flip })
        }
    }
}
export default Notification