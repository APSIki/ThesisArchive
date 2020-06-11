import { connect } from 'react-redux';
import DashboardPage from './DashboardPage'
import { setUsers } from '../../store/actions/config'

const mapStateToProps = state => {
  return {
    config: state.config
  }
}

const DashboardPageContainer = connect(mapStateToProps, {
  setUsers
})(DashboardPage)

export default DashboardPageContainer;