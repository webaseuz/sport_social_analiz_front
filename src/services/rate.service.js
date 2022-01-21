import ApiService from "./api.service";

const RateService = {
    levelOrg(timetype){
        return ApiService.get(`/level_OrganizationViews/${timetype}`)
    }
}
export default RateService