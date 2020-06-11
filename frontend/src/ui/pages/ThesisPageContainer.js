import { connect } from 'react-redux';
import ThesisPage from './ThesisPage'
import * as actionCreators from '../../store/actions/index';
import { setFilePath } from '../../store/actions/thesis'

const mapStateToProps = state => {
  return {
    thesis: state.thesis.theses,
    currentThesis: state.thesis.currentThesis,
    config: state.config
  }
}

const mapDispatchToProps = dispatch => {
  return {
      setCurrentThesis: (currentThesis) => dispatch(actionCreators.setCurrentThesis(currentThesis)),
      setFilePath: (filePath) => dispatch(actionCreators.setFilePath(filePath))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThesisPage);