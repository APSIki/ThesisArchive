import { connect } from 'react-redux';
import LandingPage from './LandingPage'
import { setUsers } from '../../store/actions/config'
import { setTheses } from '../../store/actions/thesis'

const mapStateToProps = state => {
  return {
    config: state.config
  }
}

const LandingPageContainer = connect(mapStateToProps, {
    setUsers,
    setTheses
})(LandingPage)

export default LandingPageContainer;