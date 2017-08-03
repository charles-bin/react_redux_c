import React from 'react';
import Video from './Video';

export default class Channel extends React.Component {
  render() {
    const { requestedChannel, channel } = this.props

    return (
      <div>
        <h3>Showing results for { requestedChannel }</h3>
        { Object.getOwnPropertyNames(channel).length !== 0 &&
          <p>
            This channel's ID is { channel.id }. Its title is { channel.snippet.title }
            and it has { channel.statistics.viewCount } views.
            The liked playlist ID is { channel.contentDetails.relatedPlaylists.likes }.
          </p>
        }
        <Video />
      </div>
    );
  }
}
