const youtube = require("../services/youtube");
const MoreController = require("./MoreController");

class AppController {
	// List videos of playlist
	async list(req, res) {
		try {
			const { index = 1 } = req.query;
			const pageToken = index == 1 ? "" : index;

			// Query
			const { data } = await youtube({
				maxResults: 5,
				pageToken
			});

			// Pagination
			const hasMore = data.nextPageToken ? true : false;
			const { nextPageToken } = data;

			// Response
			const result = {
				hasMore,
				nextPageToken,
				items: data.items
			};

			return res.status(200).json(result);
		} catch (error) {
			// In case of error
			console.log(error);
			return res.status(400).json({ error: "Bad request" });
		}
	}

	// Once video
	async once(req, res) {
		try {
			// Query
			const { data } = await youtube({
				videoId: req.params.id,
				maxResults: 1
			});

			const item = data.items[0];

			if (item) {
				return res.status(200).json(item.snippet);
			} else {
				return res.status(404).json({ error: "Video not found" });
			}
		} catch (error) {
			// In case of error
			console.log(error);
			return res.status(400).json({ error: "Bad request" });
		}
	}

	// Get recommended videos
	async more(req, res) {
		try {
			// First query to get the total videos in playlist
			let { data } = await youtube({ maxResults: 50 });

			// Generate radom number for query by total videos in playlist
			const randomQuery = MoreController.radomNumber(data);

			if (randomQuery !== 1) {
				// Loop for generate a radom list of 50 videos
				data = await MoreController.query(data.nextPageToken, randomQuery);
			}

			// From list of 50 videos, choose 6 randomly to recommendeds
			const items = await MoreController.getVideos(data);

			return res.status(200).json(items);
		} catch (error) {
			// In case of error
			console.log(error);
			return res.status(400).json({ error: "Bad request" });
		}
	}
}

module.exports = new AppController();
