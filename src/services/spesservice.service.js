import ApiService from "./api.service"

const SpecService = {
    AllOrganizationStatsData(date_from,date_to){
        return ApiService.get(`/all_organization_stats_data/date_from=${date_from}&date_to=${date_to}`)
    },
    LevelOrganizationViews(level,organization){
        return ApiService.get(`/level_OrganizationViews/level=${level}&organization=${organization}`)
    },
    levelName(){
        return ApiService.get(`/level_name`)
    }

}
export default SpecService