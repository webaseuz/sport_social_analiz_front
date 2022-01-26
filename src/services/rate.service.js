import ApiService from "./api.service";

const RateService = {
    levelOrg(timetype){
        return ApiService.get(`/level_OrganizationView/${timetype}`)
    }
}
export default RateService