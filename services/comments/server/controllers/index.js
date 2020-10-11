const db = require('../../db/models/index.js');
const {winston} = require('../../../libs/winston');
const log = winston('log.log');

const createComment = async (req, res) => {
    try {
        const {
            pid,
            uid,
            text
        } = req.body;
        log.log("info",`new request createComment pid: ${pid}, uid: ${uid}, text: ${text}`);

        if (pid && uid && text) {
            const comment = await db.Comments.create({
                pid,
                uid,
                text,
                date: new Date()
            });
            log.log("info",`created createComment pid: ${pid}, uid: ${uid}, text: ${text}`);

            comment ? res.status(201).json({}) : res.status(500).json({});
        } else {
            log.log("info",`not found pid or uid or text`);
            return res.status(404).json({});
        }
    } catch (err) {
        log.log("info", `fail ${err}`);
        return res.status(500).json({err})
    }
};

const deleteComment = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        log.log("info",`new request deleteComment id: ${id}`);

        if (id) {
            await db.Comments.destroy({
                where: {
                    id
                }
            });
            log.log("info",`success comment was deleted`);
            return res.status(200).json({});
        } else {
            log.log("info",`not found pid or uid or text`);
            return res.status(404).json({});
        }
    } catch (err) {
        log.log("info", `fail ${err}`);
        return res.status(500).json({err})
    }
};

const deleteCommentsByPublicationId = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        log.log("info",`new request deleteCommentByPublicationId by pid: ${id}`);

        if (id) {
            await db.Comments.destroy({
                where: {
                    pid: id
                }
            });
            log.log("info", `success comment was deleted`);
            return res.status(200).json({});
        } else {
            log.log("info",`not found pid or uid or text`);
            return res.status(404).json({});
        }
    } catch (err) {
        log.log("info", `fail ${err}`);
        return res.status(500).json({err})
    }
};

const deleteCommentsByUserId = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        log.log("info",`new requests deleteCommentByUserId by uid: ${id}`);

        if (id) {
            await db.Comments.destroy({
                where: {
                    uid: id
                }
            });
            log.log("info",`success comment was deleted`);
            return res.status(200).json({});
        } else {
            log.log("info",`not found pid or uid or text`);
            return res.status(404).json({});
        }
    } catch (err) {
        log.log("info", `fail ${err}`);
        return res.status(500).json({})
    }
};

const getCommentsByPublicationId = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        log.log("info",`new requests deleteCommentByUserId by uid: ${id}`);

        if (id) {
            const data = await db.Comments.findAll({
                where: {
                    pid: id
                }
            });
            log.log("info",`success comment was deleted`);
            return res.status(200).json({data});
        } else {
            log.log("info",`not found pid or uid or text`);
            return res.status(404).json({});
        }
    } catch (err) {
        log.log("info", `fail ${err}`);
        return res.status(500).json({})
    }
};

module.exports = {
    createComment,
    deleteComment,
    deleteCommentsByPublicationId,
    deleteCommentsByUserId,
    getCommentsByPublicationId
};
