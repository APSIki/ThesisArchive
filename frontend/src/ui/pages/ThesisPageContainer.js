import { connect } from 'react-redux';
import ThesisPage from './ThesisPage'
import * as actionCreators from '../../store/actions/index';

const mapStateToProps = state => {
  return {
    thesis: state.thesis.theses,
    currentThesis: state.thesis.currentThesis
  }
}

const mapDispatchToProps = dispatch => {
  return {
      setCurrentThesis: (currentThesis) => dispatch(actionCreators.setCurrentThesis(currentThesis))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThesisPage);