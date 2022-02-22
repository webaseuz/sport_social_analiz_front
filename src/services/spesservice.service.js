import ApiService from "./api.service"

const SpecService = {
    AllOrganizationStatsData(page,limit,oblast,category,specialization,isconnect,date_from,date_to,lang){
        return ApiService.get(`/organazation_grade_data/page=${page}&limit=${limit}&oblast=${oblast}&category=${category}&specialization=${specialization}&isconnect=${isconnect}&date_from=${date_from}&date_to=${date_to}&lang=${lang}/`)
    },
    LevelOrganizationViews(data){
        return ApiService.post(`/LevelOrganization/`,data)
    },
    levelName(lang){
        return ApiService.get(`/levelNameView/lang=${lang}/`)
    }

}
export default SpecService