import ApiService from "./api.service";

const RateService = {
    levelOrg(page,limit,oblast,category,specialization,isconnect,date_from,date_to,lang){
        return ApiService.get(`/LevelOrganization/page=${page}&limit=${limit}&oblast=${oblast}&category=${category}&specialization=${specialization}&isconnect=${isconnect}&date_from=${date_from}&date_to=${date_to}&lang=${lang}/`)
    }
}
export default RateService