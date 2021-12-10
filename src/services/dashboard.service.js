import ApiService from "./api.service";

const DashboardService = {
    Posts(){
        return ApiService.get('/posts')
    },
    OblastList(){
        return ApiService.get(`/all_oblast`)
    }
}
export default DashboardService