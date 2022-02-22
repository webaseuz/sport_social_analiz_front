import ApiService from "./api.service";

const Top10Service = {
    top10(page,limit,organ,date_from,date_to){
        return ApiService.get(`/top10stats/page=${page}&limit=${limit}&organ=${organ}&date_from=${date_from}&date_to=${date_to}/`)
    }
}
export default Top10Service