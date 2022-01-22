import axios from 'axios'

const ApiService = {
    get(resource){
        return axios.get(resource)
    },
    post(resource, data) {
		return axios.post(resource, data)
	}
}
export default ApiService