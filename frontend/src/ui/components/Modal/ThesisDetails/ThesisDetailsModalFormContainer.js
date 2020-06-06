import { connect } from 'react-redux';
import ThesisDetailsModalForm from './ThesisDetailsModalForm'
import { setAuthorization } from '../../../../store/actions/config'

const mapStateToProps = state => {
  return {
    config: state.config
  }
}

const ThesisDetailsFormContainer = connect(mapStateToProps, {
  setAuthorization
})(ThesisDetailsModalForm)

export default ThesisDetailsFormContainer;