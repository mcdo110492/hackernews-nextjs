import moment from "moment"

export const timestampToDate = (time: number|undefined) => {
    if(time) {
       return moment.unix(time).format("DD MMM YYYY h:mm A")
    }
    return time
}