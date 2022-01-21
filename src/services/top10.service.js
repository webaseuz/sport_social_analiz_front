import ApiService from "./api.service";

const Top10Service = {
    top10(){
        return ApiService.get(`/organizationProfileViews/top10`)
    }
}
export default Top10Service