exports.pipe = function(input, ...ops) {
    //let result = Array.isArray(source) ? source[Symbol.iterator]() : source;
    let result = input;

    for (const operation of ops) {
        result = operation(result);
    }

    return result;
}

exports.pipeArray = function(array, ...ops) {
    let result = array[Symbol.iterator]();

    for (const operation of ops) {
        result = operation(result);
    }

    return result;
}
