import React from 'react'
import { Table } from 'react-bootstrap'
import ResourceTable from './ResourceTable'

export default class Channel extends React.Component {
  render() {
    const { requestedChannel, channel } = this.props

    if (Object.getOwnPropertyNames(channel).length === 0) {
      return null
    }

    return (
      <div>
        <ResourceTable
          title="Basic Resources"
          resources={ channel }
        />

        <ResourceTable
          title="Snippet"
          resources={ channel.snippet }
        />

        <ResourceTable
          title="Statistics"
          resources={ channel.statistics }
        />

        <ResourceTable
          title="Status"
          resources={ channel.status }
        />

        <ResourceTable
          title="Content Details"
          resources={ channel.contentDetails }
        />

        <ResourceTable
          title="Branding Settings"
          resources={ channel.brandingSettings }
        />
      </div>
    )
  }
}
