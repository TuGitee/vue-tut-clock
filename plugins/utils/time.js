export function formatTime(date = new Date(), dateFormat = 'YYYY-MM-DD hh:ii:ss') {
    date = new Date(date)
    if (isNaN(date.getTime())) {
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
        const reg = new RegExp(`(${k})`, 'i')
        if (reg.test(dateFormat)) {
            dateFormat = dateFormat.replace(reg, (match, p1) => o[k].toString().padStart(p1.length, '0'));
        }
    }
    return dateFormat;
};

export function getTimeGap(end, dateFormat = 'DD hh:ii:ss', start = new Date()) {
    try {
        const startDate = new Date(start);
        const endDate = new Date(end);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw new Error(startDate, endDate);
        }

        const duration = endDate - startDate;

        const sign = Math.sign(duration)

        const positiveDuration = sign * duration

        const o = {
            'd+': Math.floor(positiveDuration / (1000 * 60 * 60 * 24)),
            'h+': Math.floor((positiveDuration / (1000 * 60 * 60)) % 24),
            'i+': Math.floor((positiveDuration / (1000 * 60)) % 60),
            's+': Math.floor((positiveDuration / 1000) % 60)
        };


        for (const k in o) {
            const reg = new RegExp(`(${k})`, 'i')
            if (reg.test(dateFormat)) {
                dateFormat = dateFormat.replace(reg, (match, p1) => o[k].toString().padStart(p1.length, '0'));
            }
        }

        return dateFormat;

    } catch (error) {
        throw new Error(error);
    }
}