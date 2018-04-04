exports.pipe = function(input, ...ops) {
    let result = input;

    for (const operation of ops) {
        result = operation(result);
    }

    return result;
}
