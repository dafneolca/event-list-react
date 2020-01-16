import React, { Component } from 'react';
import axios from 'axios';
import './Events.css';
import Cities from '../../assets/data/cities.json';
import Event from '../Event/Event';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Dates from '../Dates/Dates';
import Modal from '../UI/Modal/Modal';
import MyEvents from '../MyEvents/MyEvents';


class Events extends Component {
  state = {
    events: [],
    dates: [],
    selectedEventID: null,
    confirmAttendance: false,
    selectedEventName: null,
    selectedEventDate: null,
    selectedEventCity: null,
    cities: [],
    attendingEvents: [],
    attendingDates: []
  }

  componentDidMount() {
    axios.get('http://localhost:4000/data')
      .then(res => {

        //Get Data
        const events = res.data

        //Modify JSON Data
        const updatedEvents = events.map(event => {
          return {
            ...event,
            attending: false,
            startDate: event.startDate.slice(0, 10),
            finishDate: event.endDate.slice(0, 10),
            startTime: event.startDate.slice(11, 16),
            endTime: event.endDate.slice(11, 16),
          }
        })

        this.setState({ events: updatedEvents })

        //Add Event Dates
        let dateArray = [];
        events.forEach(el => {
          if (!dateArray.includes(el.startDate.slice(0, 10))) {
            dateArray.push(el.startDate.slice(0, 10))
          }
        });
        const updatedDateArray = dateArray.sort();
        this.setState({ dates: updatedDateArray });

        //Add Cities
        let citiesArray = Cities.map(city => {
          return city;
        });
        this.setState({ cities: citiesArray });
      })
  }

  attendEventHandler = (id) => {
    let updatedAttendance = this.state.events;
    updatedAttendance[id].attending = true;

    let updateDates = this.state.attendingDates;
    updateDates.push(this.state.events[id].startDate);

    let attendingEvents = this.state.attendingEvents;
    attendingEvents.push(this.state.events[id]);

    this.setState({
      events: updatedAttendance,
      confirmAttendance: false,
      attendingEvents: attendingEvents,
      attendingDates: updateDates
    })
  }

  confirmAttendanceHandler = (id, cityID) => {
    let updatedAttendance = this.state.events;
    let updatedCity = Cities.map(city => {
      if (city.id === cityID) {
        return city.name
      }
      else { return null }
    })
    this.setState({
      selectedEventID: this.state.events[id].id,
      selectedEventName: this.state.events[id].name,
      confirmAttendance: true,
      selectedEventCity: updatedCity,
      selectedEventDate: updatedAttendance[id].startDate,
    })
  }

  confirmAttendanceCancelHandler = () => {
    this.setState({ confirmAttendance: false })
  }

  leaveEventHandler = (id) => {
    let updatedAttendance = this.state.events
    updatedAttendance[id].attending = false

    let attendingEvents = this.state.attendingEvents.splice(id, 1)

    this.setState({
      events: updatedAttendance,
      attendingEvents: attendingEvents
    })
  }

  filterSearch = (evt) => {
    console.log(evt.target.value);
    this.setState({ searchFilter: evt.target.value })
  }

  render() {
    const eventDates = this.state.dates.map(date => {
      const eventName = this.state.events.map(event => {
        return (event.startDate === date ?
          <Event
            key={event.id}
            startTime={event.startTime}
            duration={parseInt(event.endTime) - parseInt(event.startTime)}
            id={event.id}
            attendance={event.attending}
            name={event.name}
            free={event.isFree}
            date={date}
            clickedAttend={() => this.confirmAttendanceHandler(event.id, event.city)}
            leaveEvent={() => this.leaveEventHandler(event.id)}
            city={this.state.cities.map(date => {
              if (date.id === event.city) {
                return date.name
              }
              else { return null }//check
            })}>
          </Event > : null
        )
      })
      return (
        <div key={date + eventName}>
          <Dates date={date}></Dates>
          {eventName}
        </div>
      )
    })

    return (
      <div className='App'>
        <Modal show={this.state.confirmAttendance}
          modalClosed={this.confirmAttendanceCancelHandler}
          attendEventHandler={() => this.attendEventHandler(this.state.selectedEventID)}
          eventName={this.state.selectedEventName}
          city={this.state.selectedEventCity}
          eventDate={this.state.selectedEventDate} />
        <div>
          <Tabs className="TabContainer" defaultActiveKey="allEvents" id="uncontrolled-tab-example">
            <Tab eventKey="allEvents" title="All events">
              <div className='EventsBox'>
                {eventDates}
              </div>
            </Tab>
            <Tab eventKey="myEvents" title="My events">
              <div className='EventsBox'>
                <div className="MyEventsHeader">
                  <h4>My next tech events</h4>
                  {this.state.attendingEvents.length > 0 ? (this.state.attendingEvents.map(event => {
                    return (
                      <div>
                        <Dates date={event.startDate} key={Math.random()}></Dates>
                        <MyEvents
                          events={event}
                          city={this.state.cities.map(date => {
                            if (date.id === event.city) {
                              return date.name
                            }
                            else { return null } //CHECK
                          })}
                          duration={parseInt(event.endTime) - parseInt(event.startTime)}
                          leaveEvent={() => this.leaveEventHandler(event.id)} />
                      </div>
                    )
                  })) : <div>You are currently not signed up to any events</div>}
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div >
    );
  }
}


export default Events;