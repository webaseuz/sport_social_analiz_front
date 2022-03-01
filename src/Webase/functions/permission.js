const Permission = {
    can(permission){
        var bool =
          !!localStorage.getItem("user_info") &&
          !!JSON.parse(localStorage.getItem("user_info")).permission;
        var permissions = bool
          ? JSON.parse(localStorage.getItem("user_info")).permission
          : [];
        return bool ? permissions.includes(permission) : false
    }
}
export default Permission