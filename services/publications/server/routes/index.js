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

router.post('/create', publicMiddleware, controllers.createPublication);

router.post('/delete/:id', publicMiddleware, controllers.deletePublication);
router.post('/delete/user/:id', publicMiddleware, controllers.deletePublicationsByUserId);

router.get('/get/user/:id', publicMiddleware, controllers.getPublicationsByUserId);

router.post('/ping', (req, res) => (res.status(200).json({})));

module.exports = router;
