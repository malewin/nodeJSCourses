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
e), (req, res) => {
    const article = articles.find((article) => article.id === Number(req.params.id));

    if (article) {
        res.send({ article });
    } else {
        res.status(404);
        res.send({ article: null });
    }
})

/*
 * Создать кокретную статью
 */
app.post('/articles', checkBody(articleScheme), (req, res) => {
    uniqueID += 1;
    articles.push({
        id: uniqueID,
        ...req.body
    });
    res.send({
        id: uniqueID,
    });
});

/*
 * Обновить кокретную статью
 */
app.put('/articles/:id', checkParams(idScheme), checkBody(articleScheme), (req, res) => {
    const article = articles.find((article) => article.id === Number(req.params.id));

    if (article) {
        article.title = req.body.title;
        article.content = req.body.content;

        res.send({ article });
    } else {
        res.status(404);
        res.send({ article: null });
    }
});

/*
 * Удалить кокретную статью
 */
app.delete('/articles/:id', checkParams(idScheme), (req, res) => {
    const article = articles.find((article) => article.id === Number(req.params.id));

    if (article) {
        const articleIndex = articles.indexOf(article);
        articles.splice(articleIndex, 1);

        res.send({ article });
    } else {
        res.status(404);
        res.send({ article: null });
    }
})

/**
 * Обработка несуществующих роутов
 */
app.use((req, res) => {
    res.status(404).send({ message: 'URL not found!' })
});

app.listen(3000);