import { connect } from 'react-redux';
import LandingPage from './LandingPage'

const mapStateToProps = state => {
  return {
    config: state.thesis.theses
  }
}

const LandingPageContainer = connect(mapStateToProps, {

})(LandingPage)

export default LandingPageContainer;