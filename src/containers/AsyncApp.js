import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import Channel from '../components/Channel'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))

    window.gapi.load('client:auth2', loadClient);

    function loadClient() {
      // Client ID and API key from the Developer Console
      const CLIENT_ID = '523535459158-jomkfdco6mt9adj7gtt6691pfj4tp4ah.apps.googleusercontent.com';
      // Array of API discovery doc URLs for APIs used by the quickstart
      const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
      // Authorization scopes required by the API. If using multiple scopes,
      // separated them with spaces.
      const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

      window.gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
      }).then(function () {
        // Listen for sign-in state changes.
        //gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        //updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        //authorizeButton.onclick = handleAuthClick;
        //signoutButton.onclick = handleSignoutClick;
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
            items.forEach(function(element) {
              console.log(element.snippet.title);
            });
          });
        });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit))
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated, selectedChannel } = this.props
    return (
      <div>
        <Channel channel={selectedChannel}/>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend']}
        />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>}
          {!isFetching &&
            <a href="#" onClick={this.handleRefreshClick}>
              Refresh
            </a>}
        </p>
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>}
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  selectedChannel: PropTypes.string.isRequired,
}

/* By default, the entire state is provided to the AsyncApp component through the prop variable.
  This function can filter/modify the prop values before they reach the component.
*/
function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit, selectedChannel } = state
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[selectedSubreddit] || { isFetching: true, items: [] }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
    selectedChannel,
  }
}

/* Any component wrapped with connect() call will receive a dispatch function as a prop,
  and any state it needs from the global state.
*/
export default connect(mapStateToProps)(AsyncApp)
