const Url = require("../../domain/entities/url");
const Click = require("../../domain/entities/click");

const urlRedirectController = async (req, res) => {
    const { code } = req.params;

    try {
        const urlDoc = await Url.findOne({ code: code });
        if (!urlDoc) {
            return res.satus(404).json({ message: "short url not found" });
        }

        if (urlDoc.expiresAt && urlDoc.expiresAt < new Date()) {
            return res.status(404).json({ message: "short url has expired" });
        }

        urlDoc.clickCount += 1;

        await urlDoc.save();

        await Click.create({
            urlId: urlDoc._id,
            timestamp: new Date(),
            ipAddress: req.ip
        });

        return res.redirect(urlDoc.targetUrl);

    } catch (error) {
        console.error("error occurred: ", err);
        res.status(500).json({ message: "error occurred in the server" });
    }
}

module.exports = { urlRedirectController };