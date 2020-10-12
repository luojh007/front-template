import React, { Component } from 'react';

export default class Index extends Component {
  render() {
    const geneTdStyle = {
      borderRight: '1px solid #ccc',
      borderBottom: '1px solid #ccc'
    };
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>head</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={geneTdStyle}>111</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
