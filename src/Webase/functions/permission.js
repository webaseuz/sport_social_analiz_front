const Permission = {
    can(permission){
        var bool = !!localStorage.getItem('user_info') && !!JSON.parse(localStorage.getItem('user_info')).modules
        var permissions = bool ?  JSON.parse(localStorage.getItem('user_info')).modules : []
        return bool ? permissions.includes(permission) : false
    }
}
export default Permission