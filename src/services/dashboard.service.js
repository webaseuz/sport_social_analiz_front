import ApiService from "./api.service";

const DashboardService = {
    Posts(organ,satsial,date_from,date_to){
        return ApiService.get(`/stats?organ=${organ}&satsial=${satsial}&date_from=${date_from}&date_to=${date_to}`)
    },
    OblastList(){
        return ApiService.get(`/all_oblast`)
    },
    StaticListData(organ,satsial,date_from,date_to){
        return ApiService.get(`/statc_list_data/organ=${organ}&satsial=${satsial}&date_from=${date_from}&date_to=${date_to}`)
    },
    StaticOrganPostData(satsial,date_from,date_to){
        return ApiService.get(`/statc_organ_post_data/satsial=${satsial}&date_from=${date_from}&date_to=${date_to}`)
    }
}
export default DashboardService