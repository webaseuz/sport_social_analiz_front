import ApiService from "./api.service";
const TwoPageService = {
    OrganizationEvolation(order_by,page,limit,oblast,category,specialization,isconnect,satsial,date_from,date_to){
        return ApiService.get(`/OrganizationEvolation/order_by=${order_by}&page=${page}&limit=${limit}&oblast=${oblast}&category=${category}&specialization=${specialization}&isconnect=${isconnect}&satsial=${satsial}&date_from=${date_from}&date_to=${date_to}/`)
    }
}
export default TwoPageService