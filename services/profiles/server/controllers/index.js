const db = require('../../db/models/index.js');
const log = winston('log.log');

const createProfile = async (req, res) => {
    try {
        const {
            id,
            name,
            img,
            descriptions
        } = req.body;
        log.log("info",`new request createProfile uid: ${id}`);

        if (id) {
            const profile = await db.Profiles.create({
                uid: id,
                name,
                img,
                descriptions
            });

            log.log("info",`created profile: ${profile}`);
            return res.status(201).json({data: profile});
        } else {
            log.log("info",`not found uid`);
            return res.status(404).json({});
        }
    } catch (error) {
        logger.log("info", `fail ${error}`);
        return res.status(500).json({error: error.message})
    }
};

const changeProfile = async (req, res) => {
    try {
        const {
            id,
            name,
            img,
            descriptions
        } = req.body;
        log.log("info",`new request changeProfile uid: ${id}`);

        if (id) {
            const profile = await db.Profiles.update({
                uid: id,
                name,
                img,
                descriptions
            }, {
                where: {
                    uid: id
                }
            });

            log.log("info",`created profile: ${profile}`);
            return res.status(200).json({data: profile});
        } else {
            log.log("info",`not found uid`);
            return res.status(404).json({});
        }
    } catch (error) {
        logger.log("info", `fail ${error}`);
        return res.status(500).json({error: error.message})
    }
};

const getProfile = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        log.log("info",`new request getProfile uid: ${id}`);

        if (id) {
            const profile = await db.Profiles.findOne({
                uid: id
            });

            log.log("info",`success profile: ${profile}`);
            return res.status(200).json({data: profile});
        } else {
            log.log("info",`not found uid`);
            return res.status(404).json({});
        }
    } catch (error) {
        logger.log("info", `fail ${error}`);
        return res.status(500).json({error: error.message})
    }
};

module.exports = {
    getProfile,
    createProfile,
    changeProfile
};
