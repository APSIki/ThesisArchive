import { connect } from 'react-redux';
import SelectUserModalForm from './SelectUserModalForm'
import { setAuthorization } from '../../../store/actions/config'

const mapStateToProps = state => {
  return {
    config: state.config
  }
}

const SelectUserModalFormContainer = connect(mapStateToProps, {
  setAuthorization
})(SelectUserModalForm)

export default SelectUserModalFormContainer;