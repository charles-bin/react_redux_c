import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit,
  loadAuthClient,
  fetchChannelIfNeeded,
} from '../actions/index'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import Channel from '../components/Channel'
import Search from '../components/Search'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import logo from '../logo.svg'
import './AsyncApp.css'

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
      const { dispatch } = this.props
      dispatch(fetchChannelIfNeeded(e.target.value))
    }
  }

  render() {
    console.log('AsyncApp.render')
    const {
      selectedSubreddit,
      posts,
      isFetching,
      lastUpdated,
      requestedChannel,
      requestedChannelResources
    } = this.props

    return (
      <div>
        <Grid>
          <Row className="App-header">
            <Col md={4} mdOffset={4}>
              <Image
                src={logo}
                className="App-logo"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4} mdOffset={4}>
              <Search
                id="formControlsText"
                type="text"
                label=""
                placeholder="Channel name"
                onKeyPress={this.handleSearchEnter}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Channel
                requestedChannel={requestedChannel}
                channel={requestedChannelResources}
              />
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
            </Col>
          </Row>
        </Grid>
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
  requestedChannel: PropTypes.string.isRequired,
  requestedChannelResources: PropTypes.object.isRequired,
}

/* By default, the entire state is provided to the AsyncApp component through the prop variable.
  This function can filter/modify the prop values before they reach the component.
*/
function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit, requestedChannel, requestedChannelResources } = state
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[selectedSubreddit] || { isFetching: true, items: [] }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
    requestedChannel,
    requestedChannelResources,
  }
}

/* Any component wrapped with connect() call will receive a dispatch function as a prop,
  and any state it needs from the global state.
*/
export default connect(mapStateToProps)(AsyncApp)
