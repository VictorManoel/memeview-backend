const youtube = require("../services/youtube");

// Controller for recommended videos
class MoreController {
	// Generate radom number for query by total videos in playlist
	radomNumber(data) {
		const { totalResults } = data.pageInfo;
		const totalQuery = Math.round(totalResults / 50);
		const randomQuery = Math.floor(Math.random() * totalQuery) + 1;

		return randomQuery;
	}

	// Loop for generate a radom list of 50 videos
	async query(index, randomQuery) {
		let result = null;

		for (let i = 1; i < randomQuery; i++) {
			result = await youtube.playlistItems.list({
				playlistId: process.env.PLAYLIST_ID,
				pageToken: index,
				part: "snippet",
				maxResults: 50
			});

			index = result.data.nextPageToken;
		}

		return result.data;
	}

	// From list of 50 videos, choose 6 randomly to recommendeds
	async getVideos(data) {
		const totalItems = data.items,
			numbers = [],
			items = [];

		for (let video = 0; video < 6; ) {
			let number = (await Math.floor(Math.random() * 50)) + 1;
			if (!numbers.includes(number)) {
				if (totalItems[number]) {
					items.push(totalItems[number]);
					video++;
				}
				numbers.push(number);
			}
		}

		return items;
	}
}

module.exports = new MoreController();
