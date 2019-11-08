import React, { Component } from 'react';
import './MyEvents.css';


class MyEvents extends Component {
  state = {
    hover: false
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover })
  }

  render() {
    let button;
    if (this.state.hover) {
      button = <button onClick={this.props.leaveEvent} className="BTN" >Cancel</button>
    } else {
      button = <button onClick={this.props.leaveEvent} className="BTN" style={{ opacity: 0.6 }}>You're In</button>
    }

    return (
      <div className="EventContainer" key={this.props.events.id}>
        <table className="Table">
          <tbody>
            <tr>
              <th className="TimeCol">{this.props.events.startTime}</th>
              <th className="MainCol">{this.props.events.name} <span className="FreeEvent" >{this.props.events.isFree ? 'Free!!!' : null}</span></th>
              <th onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}> {button}</th>
            </tr>
            <tr>
              <td></td>
              <td>{this.props.city} - {this.props.duration}h</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default MyEvents;
