const additionalMap = async (map, fromObj, toObj) => {
    for (let mapKey in map) {
        // eslint-disable-next-line no-prototype-builtins
        if (typeof fromObj[map[mapKey]] !== 'undefined' && toObj.hasOwnProperty(mapKey)) {
            toObj[mapKey] = fromObj[map[mapKey]]
        }
    }
    return toObj
}
const transform = async (fromObj, toObj, map = null) => {
    for (let toObjKey in toObj) {
        if (typeof fromObj[toObjKey] !== 'undefined') {
            if (toObj[toObjKey] !== null && typeof toObj[toObjKey] === 'function') {
                if (Array.isArray(fromObj[toObjKey])) {
                    toObj[toObjKey] = await Promise.all(
                        fromObj[toObjKey].map(async (item) => {
                            return transform(item, new toObj[toObjKey]())
                        }),
                    )
                } else {
                    toObj[toObjKey] = await transform(
                        fromObj[toObjKey],
                        new toObj[toObjKey](),
                        map,
                    )
                }
            } else if (typeof toObj[toObjKey] !== 'undefined') {
                toObj[toObjKey] = fromObj[toObjKey]
            }
        }
    }
    if (map !== null) {
        toObj = additionalMap(map, fromObj, toObj)
    }

    return toObj
}

const Lazy = {
    transform
}
export default Lazy
