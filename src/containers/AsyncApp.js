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
      requestedChannelResources,
      isFetching,
    } = this.props

    const channelNotFound = (requestedChannel !== '' &&
      Object.keys(requestedChannelResources).length === 0)

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
                placeholder=""
                onKeyPress={this.handleSearchEnter}
                channelNotFound={channelNotFound}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Channel
                channel={requestedChannelResources}
              />
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
  requestedChannelResources: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

/* By default, the entire state is provided to the AsyncApp component through the prop variable.
  This function can filter/modify the prop values before they reach the component.
*/
function mapStateToProps(state) {
  const { requestedChannel, requestedChannelResources, isFetching } = state

  return {
    requestedChannel,
    requestedChannelResources,
    isFetching,
  }
}

/* Any component wrapped with connect() call will receive a dispatch function as a prop,
  and any state it needs from the global state.
*/
export default connect(mapStateToProps)(AsyncApp)
