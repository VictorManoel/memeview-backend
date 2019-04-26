const youtube = require("../services/youtube");

class AppController {
	// List videos of playlist
	async list(req, res) {
		try {
			const { index = 1 } = req.query;
			const pageToken = index == 1 ? "" : index;

			const { data } = await youtube.playlistItems.list({
				part: "snippet",
				playlistId: process.env.PLAYLIST_ID,
				maxResults: 12,
				pageToken
			});

			return res.status(200).json(data);
		} catch (error) {
			console.log(error);
			return res.status(400).json({ error: "Bad request" });
		}
	}

	// Once video
	async once(req, res) {
		try {
			const { id } = req.params;

			const { data } = await youtube.videos.list({
				part: "snippet",
				maxResults: 1,
				id
			});

			const item = data.items[0];

			if (item) {
				return res.status(200).json(item);
			} else {
				return res.status(404).json({ error: "Video not found" });
			}
		} catch (error) {
			console.log(error);
			return res.status(400).json({ error: "Bad request" });
		}
	}
}

module.exports = new AppController();
