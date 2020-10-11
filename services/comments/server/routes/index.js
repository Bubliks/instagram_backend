const { Router } = require('express');
const router = Router();
const controllers = require('../controllers');
const fetch = require("node-fetch");

const publicMiddleware = async (req, res, next) => {
    const token = /<(.*?)>/.exec(req.header('authorization'))[1];
    const {
        id
    } = req.params;
    const {
        appId
    } = req.query;
    console.log('token: ', token, ' ', 'id: ', id, ' appId:', appId);

    if (token && id) {
        console.log('check token: ', token);
        if (appId) {
            console.log('for app');
            await fetch(`http://localhost:8007/session/code/?userId=${req.params.id}&token=${token}`, {
                method: "get",
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                if (response.status === 200) {
                    return next();
                } else {
                    return res.status(401).json({message: 'error authorization'});
                }
            })
        } else {
            console.log('for user');
            await fetch(`http://localhost:8007/session/user/${id}/token/${token}`, {
                method: "get",
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                if (response.status === 200) {
                    return next();
                } else {
                    return res.status(401).json({message: 'error authorization'});
                }
            });
        }
    } else {
        console.log('token or id indefined');
        return res.status(400).json({message: 'need login'});
    }
};

const privateMiddleware = async (req, res, next) => {
    console.log(req.query.key, req.query.secret, req.query.token);
    console.log(process.env.KEY, process.env.SECRET);
    if (req.query.key === process.env.KEY && req.query.secret === process.env.SECRET) {
        console.log('key and secret equal');
        if (req.query.token && req.query.token !== "undefined") {
            console.log('get');
            await fetch("http://localhost:8007/session/token/" + req.query.token + "/service/Comments", {
                method: "get",
                headers: {'Content-Type': 'application/json'},
            }).then(result => {
                if (result.status === 200) {
                    return next();
                } else {
                    console.log('expired token');
                    return res
                        .status(401)
                        .json({message: 'expired token'});
                }
            });
        } else {
            console.log('create');
            await fetch("http://localhost:8007/session/token/Comments", {
                method: "post",
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                if (response.status === 201) {
                    console.log('201 - ok');
                    response
                        .json()
                        .then(body => {
                            console.log('body', body);
                            return res.status(449).json(body)
                        })
                        .catch(error => {
                            console.log('some error 401', error);
                            return res.status(401).json(error);
                        })
                }
            });
        }
    } else {
        console.log('fail token');
        return res.sendStatus(401).json({});
    }
};

router.post('/create', publicMiddleware, controllers.createComment);

router.post('/delete/:id', publicMiddleware, controllers.deleteComment);
router.post('/delete/publication/:id', publicMiddleware, controllers.deleteCommentsByPublicationId);
router.post('/delete/user/:id', publicMiddleware, controllers.deleteCommentsByUserId);

router.get('/get/publication/:id', publicMiddleware, controllers.getCommentsByPublicationId);

router.post('/ping', (req, res) => (res.status(200).json({})));

module.exports = router;
