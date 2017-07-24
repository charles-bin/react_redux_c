import React from 'react';
import Video from './Video';

export default class Channel extends React.Component {
  render() {
    return (
      <div>
        <h3>{ this.props.channel }</h3>
        <Video />
      </div>
    );
  }
}
