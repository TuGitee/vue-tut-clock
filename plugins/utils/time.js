export default function formatTime(date = new Date(), dateFormat = 'YYYY-MM-DD hh:ii:ss') {
    date = new Date(date)
    if(date == 'Invalid Date'){
        throw new Error(date)
    }
    const o = {
        'y+': date.getFullYear(),
        'm+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'i+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (const k in o) {
        const reg = new RegExp(`(${k})`,'i')
        if (reg.test(dateFormat)) {
            dateFormat = dateFormat.replace(reg, (match, p1) => o[k].toString().padStart(p1.length, '0'));
        }
    }
    return dateFormat;
};