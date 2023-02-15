// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, sessionName, onDate, isStarred} = appointmentDetails
  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }
  return (
    <li className="list-item">
      <div className="heading-container">
        <p className="heading">{sessionName}</p>
        <button type="button" onClick={onClickStar} className="star-btn">
          <img src={starImage} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date-para">Date: {onDate}</p>
    </li>
  )
}

export default AppointmentItem
