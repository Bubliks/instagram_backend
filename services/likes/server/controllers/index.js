const db = require('../../db/models/index.js');
const {winston} = require('../../../libs/winston');
const log = winston('log.log');

const createLike = async (req, res) => {
    try {
        const {
            pid,
            uid
        } = req.body;
        log.log("info",`new request createLike pid: ${pid}; uid: ${uid}`);

        if (pid && uid) {
            const like = await db.Likes.findOne({
                pid,
                uid
            });

            log.log("info", `finded like pid: ${pid}; uid: ${uid}`);
            if (!like) {
                const createdLike = await db.Likes.create({
                    pid,
                    uid
                });

                log.log("info", `create like pid: ${pid}; uid: ${uid}`);
                return createdLike ? res.status(201).json({}) : res.status(500).json({});
            } else {
                await db.Likes.destroy({
                    where: {
                        pid,
                        uid
                    }
                });

                log.log("info", `delete like pid: ${pid}; uid: ${uid}`);
                return res.status(200).json({});
            }
        } else {
            log.log("info", `not pid: ${pid} or uid: ${uid}`);
            return res.status(404).json({});
        }
    } catch (err) {
        log.log("info", `catch error: ${err}`);
        return res.status(500).json({err})
    }
};

const deleteLikesByPublicationId = async (req, res) => {
    try {
        const {
            pid
        } = req.params;
        log.log("info",`new request deleteLikesByPublicationId pid: ${pid}`);

        if (pid) {
            await db.Likes.destroy({
                where: {
                    pid
                }
            });

            log.log("info", `deleted likes pid: ${pid}`);
            return res.status(200).json({});
        } else {
            log.log("info", `not pid: ${pid}`);
            return res.status(404).json({});
        }
    } catch (err) {
        log.log("info", `catch error: ${err}`);
        return res.status(500).json({err})
    }
};

const deleteLikesByUserId = async (req, res) => {
    try {
        const {
            uid
        } = req.params;
        log.log("info",`new request deleteLikesByUserId uid: ${uid}`);

        if (uid) {
            await db.Likes.destroy({
                where: {
                    uid
                }
            });

            log.log("info", `deleted likes uid: ${uid}`);
            return res.status(200).json({});
        } else {
            log.log("info", `not uid: ${uid}`);
            return res.status(404).json({});
        }
    } catch (err) {
        log.log("info", `catch error: ${err}`);
        return res.status(500).json({err})
    }
};

const getLikesByPublicationId = async (req, res) => {
    try {
        const {
            pid
        } = req.params;
        log.log("info",`new request getLikesByPublicationId uid: ${pid}`);

        if (pid) {
            const likes = await db.Likes.findAll({
                where: {
                    pid
                }
            });

            log.log("info", `finded likes uid: ${pid}, likes: ${likes}`);
            return res.status(200).json({data: likes});
        } else {
            log.log("info", `not pid: ${pid}`);
            return res.status(404).json({});
        }
    } catch (err) {
        log.log("info", `catch error: ${err}`);
        return res.status(500).json({err})
    }
};

const getLikesByPublicationsIds = async (req, res) => {
    try {
        const {
            pids
        } = req.body;
        log.log("info",`new request getLikesByPublicationsIds pids: ${pids}`);

        if (pids) {
            const data = pids.reduce(async (acc, pid) => {
                acc[pid] = await db.Likes.findAll({
                    where: {
                        pid
                    }
                });

                return acc;
            }, {});

            log.log("info", `finded likes pids: ${pids}, data: ${data}`);
            return res.status(200).json({data});
        } else {
            log.log("info", `not pids: ${pids}`);
            return res.status(404).json({});
        }
    } catch (err) {
        log.log("info", `catch error: ${err}`);
        return res.status(500).json({err})
    }
};


module.exports = {
    createLike,
    deleteLikesByPublicationId,
    deleteLikesByUserId,
    getLikesByPublicationId,
    getLikesByPublicationsIds
};
