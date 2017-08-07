import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import {
  loadAuthClient,
  fetchChannelIfNeeded,
} from '../actions/index'
import Channel from '../components/Channel'
import Search from '../components/Search'
import logo from '../logo.svg'
import './AsyncApp.css'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleSearchEnter = this.handleSearchEnter.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(loadAuthClient())
  }

  handleSearchEnter(e) {
    if(e.key === 'Enter') {
      const { dispatch } = this.props
      dispatch(fetchChannelIfNeeded(e.target.value))
    }
  }

  render() {
    const {
      requestedChannel,
      isFetching,
      resources,
      prevCollapsed,
      nextCollapsed,
    } = this.props

    const channelNotFound = (requestedChannel !== '' && !isFetching &&
      Object.keys(resources).length === 0)

    const headerClass = prevCollapsed ?
      (nextCollapsed ? "App-header-collapsed" : "App-header-expand") :
      (nextCollapsed ? "App-header-collapse" : "App-header-expanded")

    return (
      <div>
        <Grid>
          <Row>
            <Col md={4} mdOffset={4}>
              <div className={headerClass}>
                <Image src={logo} className="App-logo" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={4} mdOffset={4}>
              <Search
                id="formControlsText"
                type="text"
                placeholder=""
                onKeyPress={this.handleSearchEnter}
                channelNotFound={channelNotFound}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Channel channel={resources} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

AsyncApp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  requestedChannel: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resources: PropTypes.object.isRequired,
  prevCollapsed: PropTypes.bool.isRequired,
  nextCollapsed: PropTypes.bool.isRequired,
}

/* By default, the entire state is provided to the AsyncApp component through the prop variable.
  This function can filter/modify the prop values before they reach the component.
*/
function mapStateToProps(state) {
  const { requestedChannel, requestedChannelResources, isFetching } = state
  const { resources, prevCollapsed, nextCollapsed } = requestedChannelResources

  return {
    requestedChannel,
    isFetching,
    resources,
    prevCollapsed,
    nextCollapsed,
  }
}

/* Any component wrapped with connect() call will receive a dispatch function as a prop,
  and any state it needs from the global state.
*/
export default connect(mapStateToProps)(AsyncApp)
