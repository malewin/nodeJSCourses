function checkParams(scheme) {
    return (rew, res, next) => {
        const idValidatationResult = idScheme.validate(req.params);
        if (idValidatationResult.error) {
            return res.status(400).send(idValidatationResult.error.details);
        }
        next();
    }
}

function checkBody(scheme) {
    return (rew, res, next) => {
        const articleValidationResult = articleScheme.validate(req.body);
        if (articleValidationResult.error) {
            res.status(400).send(articleValidationResult.error.details);
        }
        next();
    }
}

module.exports = { checkParams, checkBody };