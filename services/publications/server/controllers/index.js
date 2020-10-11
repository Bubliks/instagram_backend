const db = require('../../db/models/index.js');
const {winston} = require('../../../libs/winston');
const log = winston('log.log');

const createPublication = async (req, res) => {
    try {
        const {
            uid,
            text,
            img
        } = req.body;
        log.log("info",`new request createPublication for uid: ${uid}, text: ${text}`);

        if (uid && text && img) {
            const data = await db.Publications.create({
                uid,
                text,
                img,
                date: new Date()
            });
            log.log("info",`success question was created: ${data}`);
            return res.status(201).json({});
        } else {
            log.log("info",`not found uid: ${uid}, text: ${text} or img`);
            return res.status(404).json({});
        }
    } catch (err) {
        log.log("info", `fail ${err}`);
        return res.status(500).json({err})
    }
};

const deletePublication = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        log.log("info",`new request deletePublication by id: ${id}`);

        if (id) {
            await db.Publications.destroy({
                where: {
                    id
                }
            });
            log.log("info",`success question was deleted`);
            return res.status(200).json({});
        } else {
            log.log("info",`not found id or img`);
            return res.status(404).json({});
        }

    } catch (err) {
        log.log("info", `fail ${err}`);
        return res.status(500).json({err})
    }
};

const getPublicationsByUserId = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let {
            from,
            to
        } = req.query;
        log.log("info",`new request getUserPublications by id: ${id}`);

        if (id) {
            const data = await db.Publications.findAll({
                uid: id
            });
            log.log("info",`getUserPublications ${data}`);

            if (from && to) {
                if (Number.isFinite(from) && Number.isFinite(to) && from <= to) {
                    if (from > data.length) {
                        from = data.length;
                    }
                    if (to > data.length) {
                        to = data.length;
                    }

                    return res.status(200).json({data: data.slice(from, to), total: data.length});
                } else {
                    return res.status(404).json({err: 'invalid'});
                }
            } else {
                return res.status(200).json({data, total: data.length});
            }
        } else {
            log.log("info",`not found id`);
            return res.status(404).json({});
        }
    } catch (err) {
        log.log("info", `fail ${err}`);
        return res.status(500).json({})
    }
};

const deletePublicationsByUserId = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        log.log("info",`new request deletePublicationsByUserId by uid: ${id}`);

        if (id) {
            await db.Publications.destroy({
                where: {
                    uid: id
                }
            });
            log.log("info",`success question was deleted`);
            return res.status(200).json({});
        } else {
            log.log("info",`not found id`);
            return res.status(404).json({});
        }
    } catch (err) {
        log.log("info", `fail ${err}`);
        return res.status(500).json({})
    }
};

module.exports = {
    createPublication,
    deletePublication,
    getPublicationsByUserId,
    deletePublicationsByUserId
};
