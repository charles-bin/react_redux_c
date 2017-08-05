import React from 'react'
import { Table } from 'react-bootstrap'

export default function ResourceTable(props) {
  const { title, resources } = props
  return (
    <div>
      <h3>{ title }</h3>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th style={{width: '150px'}}>Resource</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          { Object.keys(resources).map(function(v) {
            return (
              typeof(resources[v]) === "string" &&
                <tr key={v}>
                  <td>{v}</td>
                  <td>{resources[v]}</td>
                </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}
