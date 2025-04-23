const Url = require("../../domain/entities/url");
const Click = require("../../domain/entities/click");
const shortid = require("shortid");

const createShortUrlController = async (req, res) => {
    try {
        const { targetUrl, alias, expiresAt } = req.body;
        const code = alias || shortid.generate();

        if (alias) {
            const aliasExists = await Url.findOne({ code: code });
            if (aliasExists) {
                return res.status(400).json({ message: "custom alias already in use" })
            }

            const newUrl = await Url.create({
                userId: req.user.id,
                code: code,
                targetUrl: targetUrl,
                expiresAt: expiresAt
            });

            res.status(201).json(newUrl);
        }
    } catch (error) {
        res.status(500).json({ message: "insternal server errorr occurred" });
    }
};

const getUserUrlsController = async (req, res) => {
    const urls = await Url.find({ userId: req.user.id });
    res.status(200).json(urls);
};

const getUrlDetailsController = async (req, res) => {
    const url = await Url.findOne({ _id: req.params.urlId, userId: req.user.id });
    if (!url) return res.status(404).json({ message: "url not found" });
    res.status(200).json(url);
};

const deleteUrlController = async (req, res) => {
    const deleted = await Url.findOneAndDelete({ _id: req.params.urlId, userId: req.user.id });
    if (!deleted) return res.status(404).json({ message: "url not found" });
    res.status(200).json({ message: "url deleted successfully" });
}

const getUrlClicksController = async (req, res) => {
    const { urlId } = req.params;
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {

        const urlDoc = await Url.findOne({ _id: urlId, userId });
        if (!urlDoc) {
            return res.status(403).json({ message: "access denied" });
        }

        const totalClicks = await Click.countDocuments({ urlId });

        const clicks = await Click.find({ urlId })
            .sort({ timestamp: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            total: totalClicks,
            page,
            limit,
            clicks: clicks.map(click => ({
                timestamp: click.timestamp,
                ipAddress: click.ipAddress
            }))
        });
    } catch (err) {
        console.error('Error fetching clicks:', err);
        res.status(500).json({ message: "error occurred in the server" });
    }
};


module.exports = { createShortUrlController, getUserUrlsController, getUrlDetailsController, deleteUrlController, getUrlClicksController };

