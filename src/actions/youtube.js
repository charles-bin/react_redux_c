export const LOAD_AUTH_CLIENT = 'LOAD_AUTH_CLIENT'
export const REQUEST_CHANNEL = 'REQUEST_CHANNEL'

export function loadAuthClient() {
  initAuthClient();
  return {
    type: LOAD_AUTH_CLIENT,
  }
}

export function requestChannel(username) {
  return {
    type: REQUEST_CHANNEL,
    username
  }
}

function initAuthClient() {
  window.gapi.load('client:auth2', function() {

    // Client ID and API key from the Developer Console
    const CLIENT_ID = '523535459158-jomkfdco6mt9adj7gtt6691pfj4tp4ah.apps.googleusercontent.com';
    // Array of API discovery doc URLs for APIs used by the quickstart
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
    // Authorization scopes required by the API. If using multiple scopes separate them with spaces.
    const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

    window.gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
    }).then(function () {
      var playlistId;
      window.gapi.client.youtube.channels.list({
        'part': 'snippet,contentDetails,statistics',
        'forUsername': 'BBCEarth'
      }).then(function(response) {
        let channel = response.result.items[0];
        console.log('This channel\'s ID is ' + channel.id + '. ' +
                  'Its title is \'' + channel.snippet.title + ', ' +
                  'and it has ' + channel.statistics.viewCount + ' views.');
        console.log('The liked playlist ID is: ' + channel.contentDetails.relatedPlaylists.likes);
        playlistId = channel.contentDetails.relatedPlaylists.likes;

        window.gapi.client.youtube.playlistItems.list({
          'maxResults': '25',
          'part': 'snippet,contentDetails',
          'playlistId': playlistId
        }).then(function(response) {
          var items = response.result.items;
          /*
          items.forEach(function(element) {
            console.log(element.snippet.title);
          });
          */
        });
      });
    });
  });
}
