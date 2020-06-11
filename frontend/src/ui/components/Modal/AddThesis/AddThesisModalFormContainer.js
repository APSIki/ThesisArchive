import { connect } from 'react-redux';
import * as actionCreators from '../../../../store/actions';
import AddThesisModalForm from './AddThesisModalForm';

const mapDispatchToProps = dispatch => {
  return {
      addThesis: (thesis) => dispatch(actionCreators.addThesis(thesis))
  }
}

export default connect(null, mapDispatchToProps)(AddThesisModalForm);