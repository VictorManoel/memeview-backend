const youtube = require("../services/youtube");

class AppController {
	// List videos of playlist
	async list(req, res) {
		try {
			const { data } = await youtube.playlistItems.list({
				part: "snippet",
				playlistId: process.env.PLAYLIST_ID,
				maxResults: 12,
				pageToken: ""
			});

			return res.status(200).json(data);
		} catch (error) {
			console.log(error);
			return res.status(400).json({ error: "Bad request" });
		}
	}
}

module.exports = new AppController();
