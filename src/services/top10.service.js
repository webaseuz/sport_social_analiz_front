import ApiService from "./api.service";

const Top10Service = {
    top10(organ,date){
        return ApiService.get(`/top10stats/organ=${organ}&date=${date}`)
    }
}
export default Top10Service