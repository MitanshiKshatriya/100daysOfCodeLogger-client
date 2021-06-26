export const getMonth = (x) => {
    switch(x){
        case 1:
        return "January"
        case 2:
            return "Feburary"
        case 3:
            return "March"
        case 4: 
            return "April"
        case 5:
            return "May"
        case 6:
            return "June"
        case 7:
            return "July"
        case 8:
            return "August"
        case 9:
            return "September"
        case 10:
            return "October"
        case 11:
            return "November"
        case 12:
            return "December"
    }
}
export const getStringDate = (date) => {
    let d  = new Date(date)
    // 2021-06-23
    // let month = d.getMonth()+1>10 ? `${d.getMonth()+1}` : `0${d.getMonth()+1}`
    // return `${d.getFullYear()}-${month}-${d.getDate()}`
    // 21 January, 2021
    let day = d.getDate()+1>10 ? `${d.getDate()+1}` : `0${d.getDate()+1}`
    return `${day} ${getMonth(d.getMonth()+1)}, ${d.getFullYear()}`
}