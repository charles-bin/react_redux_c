import React from 'react'
import ResourceTable from './ResourceTable'

export default class Channel extends React.Component {
  render() {
    const { channel } = this.props

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
          title="Related Playlists"
          resources={ channel.contentDetails.relatedPlaylists }
        />

        <ResourceTable
          title="Branding Settings"
          resources={ channel.brandingSettings.channel }
        />
      </div>
    )
  }
}
