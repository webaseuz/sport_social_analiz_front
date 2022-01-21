const Numbers = {
    parseNumber(num){
        if(num >= 1000 && num < 1000000){
            return (num/1000).toFixed(1) + 'k'
        }
        if(num >= 1000000 && num < 100000000){
            return (num/1000000).toFixed(1) + 'M'
        }
        else{
             return num
        }
    },
    currencyFilter(num,fixed){
        if(!!num){
            return num.toFixed(fixed || 0).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1 ')
        }
        
    }
}
export default Numbers