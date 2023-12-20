exports.respon200 = function (message, value) {
    var response = {
        status: 200,
        message: message,
        payload: value,
    }

    return response;
}

exports.v2respon200 = function (req, res, message,value) {
    var response = {
        status: 200,
        message: message,
        payload: value,
    }

    return res.status(200).json(response);
}

exports.respon400 = function (message,value) {
    var response = {
        status: 400,
        message: message,
        payload: value,
    }

    return response;
}

exports.v2respon400 = function (req, res, message, value) {
    var response = {
        status: 400,
        message: message,
        payload: value,
    }

    return res.status(400).json(response);
}

exports.respon404 = (req, res, message,value) => {
    var response = {
        status: 404,
        message: message,
        payload: value,
    }

    return res.status(404).json(response);
}

exports.respon401 = (req, res, message,value) => {
    var response = {
        status: 401,
        message: message,
        payload: value,
    }

    return res.status(401).json(response);
}

