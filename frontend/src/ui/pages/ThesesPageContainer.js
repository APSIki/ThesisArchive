import { connect } from 'react-redux';
import ThesesPage from './ThesesPage'
import { setUsers } from '../../store/actions/config'
import { setTheses } from '../../store/actions/thesis'

const mapStateToProps = state => {
  return {
    config: state.config
  }
}

const ThesesPageContainer = connect(mapStateToProps, {
    setUsers,
    setTheses
})(ThesesPage)

export default ThesesPageContainer;