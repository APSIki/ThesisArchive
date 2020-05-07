import { connect } from 'react-redux';
import ThesisPage from './ThesisPage'
import { setCurrentThesis } from '../../actions/actions'

const mapStateToProps = state => {
  return {
    config: state.config,
    currentThesis: state.currentThesis
  }
}

const ThesisPageContainer = connect(mapStateToProps, {
  setCurrentThesis
})(ThesisPage)

export default ThesisPageContainer;