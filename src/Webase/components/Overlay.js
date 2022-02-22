import React from 'react'
import Spinner from "../../@vuexy/spinner/Loading-spinner"
const Overlay = (props) => {
    return(
        <div>
            {
                props.show ? <Spinner /> : props.children
            }
        </div>
    )
}
export default Overlay