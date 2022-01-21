
import React from "react"
import { FormattedMessage } from "react-intl"
const Translate = {
    t1(text){
        return <FormattedMessage id={text} />
        
    },
    t2(text,func){
        return func.formatMessage({ id : text })
    }
}
export default Translate