import React from 'react'
import { Table, Image } from 'react-bootstrap'

export default function ResourceTable(props) {
  const { title, resources } = props
  return (
    <div>
      <h3>{ title }</h3>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th style={{width: '160px'}}>Resource</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          { Object.keys(resources).map(function(v) {
            const toRender = (v === "thumbnails" ||
              typeof(resources[v]) === "string" ||
              typeof(resources[v]) === "boolean")
            return (
              toRender &&
              <tr key={v}>
                <td>{v}</td>
                <td>
                  { v === "thumbnails" ?
                    <Image src={resources[v].medium.url} /> :
                    resources[v].toString() }
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}
