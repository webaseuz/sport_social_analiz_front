import ApiService from "./api.service"

const SpecService = {
    AllOrganizationStatsData(date_from,date_to){
        return ApiService.get(`/organazation_grade_data/date_from=${date_from}&date_to=${date_to}`)
    },
    LevelOrganizationViews(data){
        return ApiService.post(`/level_OrganizationView/`,data)
    },
    levelName(){
        return ApiService.get(`/levelNameView`)
    }

}
export default SpecService