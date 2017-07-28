import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit,
  loadAuthClient,
  requestChannel,
} from '../actions/index'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import Channel from '../components/Channel'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleSearchEnter = this.handleSearchEnter.bind(this)
  }

  componentDidMount() {
    console.log('AsyncApp.componentDidMount')
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
    dispatch(loadAuthClient())
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

  handleSearchEnter(e) {
    if(e.key === 'Enter') {
      const { dispatch } = this.props;
      dispatch(requestChannel(e.target.value));
    }
  }

  render() {
    console.log('AsyncApp.render')
    const { selectedSubreddit, posts, isFetching, lastUpdated, selectedChannel } = this.props
    return (
      <div>
        <input
          type='search'
          onKeyPress={this.handleSearchEnter}
        />
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
