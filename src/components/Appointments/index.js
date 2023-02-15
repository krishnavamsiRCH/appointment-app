// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleValue: '',
    dateValue: '',
    appointmentList: [],
    isFilterActive: false,
  }

  onChangeTitleInput = event => {
    this.setState({
      titleValue: event.target.value,
    })
  }

  onChangeDateInput = event => {
    this.setState({
      dateValue: event.target.value,
    })
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleValue, dateValue} = this.state

    const formatDate = dateValue
      ? format(new Date(dateValue), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      sessionName: titleValue,
      onDate: formatDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleValue: '',
      dateValue: '',
    }))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  render() {
    const {titleValue, dateValue, isFilterActive} = this.state
    let {appointmentList} = this.state
    if (isFilterActive) {
      const newList = appointmentList.filter(
        eachTask => eachTask.isStarred === true,
      )
      appointmentList = newList
    }
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'

    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="main-heading">Add Appointment</h1>
          <div className="inputs-image-container">
            <form onSubmit={this.onAddAppointment}>
              <div className="inputs-container">
                <div className="text-card">
                  <label htmlFor="title" className="label">
                    TITLE
                  </label>
                  <input
                    className="input"
                    type="text"
                    id="title"
                    placeholder="Title"
                    value={titleValue}
                    onChange={this.onChangeTitleInput}
                  />
                </div>

                <div className="text-card">
                  <label htmlFor="date" className="label">
                    DATE
                  </label>
                  <input
                    className="input"
                    type="date"
                    id="date"
                    placeholder="Title"
                    value={dateValue}
                    onChange={this.onChangeDateInput}
                  />
                </div>

                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>

          <hr className="line" />

          <div className="appointments-container">
            <div className="heading-container">
              <h1 className="bottom-heading">Appointments</h1>
              <button
                className={`starred-button ${filterClassName}`}
                type="button"
                data-testid="star"
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>

            <ul className="appointments-list">
              {appointmentList.map(eachSchedule => (
                <AppointmentItem
                  key={eachSchedule.id}
                  appointmentDetails={eachSchedule}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
