///<reference path="index.d.ts"/>

function prependZero(matched: string, num: number) {
    return matched.length > 1 && num < 10 ? `0${num}` : `${num}`;
}

Date.prototype.format = function (pattern: string = 'YYYY-MM-DD hh:mm:ss') {
    return pattern.replace(/y{2,}|Y{2,}/, v => (this.getFullYear() + "").substr(4 - v.length))
        .replace(/M{1,2}/, v => prependZero(v, this.getMonth() + 1))
        .replace(/D{1,2}|d{1,2}/, v => prependZero(v, this.getDate()))
        .replace(/Q|q/, v => prependZero(v, Math.ceil((this.getMonth() + 1) / 3)))
        .replace(/h{1,2}|H{1,2}/, v => prependZero(v, this.getHours()))
        .replace(/m{1,2}/, v => prependZero(v, this.getMinutes()))
        .replace(/s{1,2}/, v => prependZero(v, this.getSeconds()))
        .replace(/SSS|S/, v => {
            let ms = '' + this.getMilliseconds();
            return v.length === 1 ? ms : `${ms.length === 1 ? '00' : ms.length === 2 ? '0' : ''}${ms}`;
        })
}

Date.today = function () {
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}