export const isFalsy = (value) => value === 0 ? false : !value

//把对象中的空值去除
export const clearObject = (object) => {
  const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key]
        if(isFalsy(value)){
            delete result[key]
        }
    })
    return result
}