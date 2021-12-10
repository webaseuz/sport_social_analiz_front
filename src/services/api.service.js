import axios from 'axios'

const ApiService = {
    get(resource){
        return axios.get(resource)
    }
}
export default ApiService