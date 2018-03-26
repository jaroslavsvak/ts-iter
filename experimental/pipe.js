exports.pipe = function(source, ...ops) {
    let result = Array.isArray(source) ? source[Symbol.iterator]() : source;

    for (const operation of ops) {
        result = operation(result);
    }

    return result;
}
