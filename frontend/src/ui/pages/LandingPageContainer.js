import { connect } from 'react-redux';
import LandingPage from './LandingPage'

const mapStateToProps = state => {
  return {
    config: state.config
  }
}

const LandingPageContainer = connect(mapStateToProps, {

})(LandingPage)

export default LandingPageContainer;