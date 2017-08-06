import React from 'react'
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap'

/* Object destructuring notation matches on id, label while type, placeholder
  are keys of the props object. The help variable is currently left undefined.
*/
export default function Search({ id, label, channelNotFound, ...props }) {
  return (
    <FormGroup
      controlId={id}
      validationState={channelNotFound ? 'error' : null}
    >
      <FormControl {...props} />
      {channelNotFound && <HelpBlock>Channel not found</HelpBlock>}
      <FormControl.Feedback />
    </FormGroup>
  )
}
