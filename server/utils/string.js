const _ = require('lodash');

const removeBlankProperties = obj => {
    if(typeof obj === 'undefined' || obj === null) return obj;
    const finalObj = obj;
    const propNames = Object.getOwnPropertyNames(finalObj);
    let propName;

    for (let i = 0; i < propNames.length; i++) {
        propName = propNames[i];
        if(
            finalObj[propName] === null ||
            finalObj[propName] === undefined ||
            finalObj[propName] === '' ||
            (typeof finalObj[propName] === 'object' && _.isEmpty(finalObj[propName]))
        ) {
            delete finalObj[propName]
        }
    }
    return finalObj;
}

module.exports = {
    removeBlankProperties
}