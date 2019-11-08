import React, { Component } from 'react';
import './Event.css';

class Event extends Component {
  state = {
    hover: false
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover })
  }

  render() {
    let attendButton = <button onClick={this.props.clickedAttend} className="BTN">Sign Up</button>
    let leaveEventButton;

    if (this.state.hover) {
      leaveEventButton = <button onClick={this.props.leaveEvent} className="BTN" onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)}>Cancel</button>
    }
    else {
      leaveEventButton = <button onClick={this.props.leaveEvent} className="BTN" onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)} style={{ opacity: '0.6' }}>You're In</button>
    }

    return (
      <div className="EventContainer">
        <table className="Table">
          <tbody>
            <tr>
              <th className="TimeCol">{this.props.startTime}</th>
              <th className="MainCol">{this.props.name}

                {this.props.free ? <span className="FreeEvent"> Free Event</span> : null}


              </th>
              <th> {this.props.attendance ? leaveEventButton : attendButton}</th>
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

export default Event;
