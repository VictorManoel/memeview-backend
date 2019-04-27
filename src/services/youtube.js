const { google } = require("googleapis");

// Connect with google api
const youtube = google.youtube({
	version: "v3",
	auth: process.env.API_KEY
});

// Api query
module.exports = params => {
	return youtube.playlistItems.list({
		playlistId: process.env.PLAYLIST_ID,
		part: "snippet",
		...params
	});
};
