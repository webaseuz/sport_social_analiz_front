import ApiService from "./api.service";

const DashboardService = {
    Posts(oblast,category,specialization,organ,isconnect,satsial,date_from,date_to){
        return ApiService.get(`/stats/oblast=${oblast}&category=${category}&specialization=${specialization}&organ=${organ}&isconnect=${isconnect}&satsial=${satsial}&date_from=${date_from}&date_to=${date_to}/`)
    },
    OrganizationList(){
        return ApiService.get(`/organization/`)
    },
    StaticListData(oblast,category,specialization,organ,satsial,isconnect,date_from,date_to){
        return ApiService.get(`/statc_list_data/oblast=${oblast}&category=${category}&specialization=${specialization}&organ=${organ}&satsial=${satsial}&isconnect=${isconnect}&date_from=${date_from}&date_to=${date_to}/`)
    },
    StaticOrganPostData(oblast,category,specialization,isconnect){
        return ApiService.get(`/post/oblast=${oblast}&category=${category}&specialization=${specialization}&isconnect=${isconnect}/`)
    },
    SatsialNetwork(oblast,category,specialization,organ,isconnect){
        return ApiService.get(`/satsial_network/oblast=${oblast}&category=${category}&specialization=${specialization}&organ=${organ}&isconnect=${isconnect}/`)
    },
    OrganizationPostCount(sort,page,limit,order_by,oblast,category,specialization,organ,satsial,isconnect,date_from,date_to){
        return ApiService.get(`/organizationpostcount/sort=${sort}&page=${page}&limit=${limit}&order_by=${order_by}&oblast=${oblast}&category=${category}&specialization=${specialization}&organ=${organ}&satsial=${satsial}&isconnect=${isconnect}&date_from=${date_from}&date_to=${date_to}/`)
    },
    IsConnectCount(oblast,category,specialization,isconnect){
        return ApiService.get(`/IsConnectCount/oblast=${oblast}&category=${category}&specialization=${specialization}&isconnect=${isconnect}/`)
    }
}
export default DashboardService