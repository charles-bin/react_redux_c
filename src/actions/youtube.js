export const LOAD_CLIENT = 'LOAD_CLIENT'
export const REQUEST_CHANNEL = 'REQUEST_CHANNEL'
export const RECEIVE_CLIENT = 'RECEIVE_CLIENT'
export const RECEIVE_CHANNEL_RESOURCES = 'RECEIVE_CHANNEL_RESOURCES'

export function loadAuthClient() {
  return dispatch => {
    dispatch(loadClient())

    window.gapi.load('client:auth2', function() {

      // Client ID and API key from the Developer Console
      const CLIENT_ID = '523535459158-jomkfdco6mt9adj7gtt6691pfj4tp4ah.apps.googleusercontent.com'
      // Array of API discovery doc URLs for APIs used by the quickstart
      const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
      // Authorization scopes required by the API. If using multiple scopes separate them with spaces.
      const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly'

      window.gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
      }).then(function () {
        dispatch(receiveClient())
      })
    })
  }
}

function loadClient() {
  return {
    type: LOAD_CLIENT,
  }
}

function receiveClient() {
  return {
    type: RECEIVE_CLIENT,
  }
}

export function fetchChannelIfNeeded(username) {
  return (dispatch, getState) => {
    if (shouldFetchChannel(getState(), username)) {
      return dispatch(fetchChannel(username))
    }
  }
}

function shouldFetchChannel(state, username) {
  return state.authClientLoaded && username
}

function fetchChannel(username) {
  return dispatch => {
    dispatch(requestChannel(username))

    window.gapi.client.youtube.channels.list({
      'part': 'snippet,contentDetails,statistics,brandingSettings,status',
      'forUsername': username
    }).then(function(response) {
      let channel = response.result.items[0]
      dispatch(receiveChannelResources(channel))
    })
  }
}

function requestChannel(username) {
  return {
    type: REQUEST_CHANNEL,
    username
  }
}

function receiveChannelResources(channel) {
  return {
    type: RECEIVE_CHANNEL_RESOURCES,
    channel
  }
}

/*
      window.gapi.client.youtube.playlistItems.list({
        'maxResults': '25',
        'part': 'snippet,contentDetails',
        'playlistId': playlistId
      }).then(function(response) {
        var items = response.result.items;
        items.forEach(function(element) {
          console.log(element.snippet.title);
        });
      });
*/
