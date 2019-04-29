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
	async query(pageToken, randomQuery) {
		let result = null;

		for (let page = 1; page < randomQuery; page++) {
			result = await youtube({
				maxResults: 50,
				pageToken
			});

			pageToken = result.data.nextPageToken;
		}

		return result.data;
	}

	// From list of 50 videos, choose 6 randomly to recommendeds
	async getVideos(data) {
		const totalItems = data.items;
		const numbers = [];
		const items = [];
		let video = 0;

		while (video < 6) {
			let number = Math.floor(Math.random() * 50) + 1;

			if (!numbers.includes(number)) {
				if (totalItems[number]) {
					items.push(totalItems[number].snippet);
					video++;
				}
				numbers.push(number);
			}
		}

		return items;
	}
}

module.exports = new MoreController();
