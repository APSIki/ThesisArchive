import { connect } from 'react-redux';
import DashboardPage from './DashboardPage'
import { setUsers, setStaffPersons } from '../../store/actions/config'

const mapStateToProps = state => {
  return {
    config: state.config
  }
}

const DashboardPageContainer = connect(mapStateToProps, {
  setUsers,
  setStaffPersons
})(DashboardPage)

export default DashboardPageContainer;