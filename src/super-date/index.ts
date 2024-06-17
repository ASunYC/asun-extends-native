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

Date.prototype.formatExt = function (pattern: string = 'YYYY-MM-DD hh:mm:ss') {
    let Y = this.getFullYear().toString();
    let M = (this.getMonth() + 1).toString().padStart(2, '0');
    let D = this.getDate().toString().padStart(2, '0');
    let h = this.getHours().toString().padStart(2, '0');
    let m = this.getMinutes().toString().padStart(2, '0');
    let s = this.getSeconds().toString().padStart(2, '0');

    // 使用一个对象来映射模式中的占位符到实际的日期时间部分
    const replacements: { [key: string]: string } = {
        'YYYY': Y,
        'MM': M,
        'DD': D,
        'hh': h, // 注意：这里使用的小写 'hh' 对应于12小时制的小时数
        'mm': m,
        'ss': s,
    };

    // 使用String.prototype.replace方法替换模式中的占位符
    return pattern.replace(/(YYYY|MM|DD|hh|mm|ss)/g, (match) => replacements[match] || match);
}

Date.today = function () {
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}