export function unique<T>(arr: T[]): T[] {
    let appeard = new Set<string>();
    return arr.filter(item => {
        // 创建一个可以唯一标识对象的字符串id
        let id = item + JSON.stringify(item);
        if (appeard.has(id)) {
            return false;
        } else {
            appeard.add(id);
            return true;
        }
    });
}