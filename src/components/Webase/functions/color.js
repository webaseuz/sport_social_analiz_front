const Color = {
    status(item){
        if(item.state == 'Актив'){
            return 'success'
        }
        if(item.state == 'Пассив'){
            return 'danger'
        }
    }
}
export default Color