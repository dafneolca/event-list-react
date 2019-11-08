import React, { Component } from 'react';
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../Aux/aux';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  render() {

    let date = new Date(this.props.eventDate);
    let options = { day: 'numeric', month: 'long' };
    let dateTimeFormat = new Intl.DateTimeFormat(undefined, options);
    let newDateFormat = dateTimeFormat.format(date)

    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className="Modal" style={{
          transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: this.props.show ? '1' : '0'
        }}>
          <div className="ModalHeader" >Join the event<span className="ClosingX" onClick={this.props.modalClosed}>X</span></div>
          <div style={{ padding: '16px' }}>
            <p>You're about to sign up for {this.props.eventName}.
              This event takes place the {newDateFormat} in {this.props.city}.
              </p>
            <p>Are you sure? </p>




            <div className="Buttons">
              <button className="Button Cancel" onClick={this.props.modalClosed}>Cancel</button>
              <button className="Button Confirm" onClick={this.props.attendEventHandler}>Join</button>
            </div>
          </div>
        </div>
      </Aux>



    )
  }
}

export default Modal;