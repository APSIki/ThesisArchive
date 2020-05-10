import { connect } from 'react-redux';
import MyTheses from './MyTheses'

const mapStateToProps = state => {
  return {
    theses: state.thesis.theses
  }
}

const MyThesesContainer = connect(mapStateToProps, {

})(MyTheses)

export default MyThesesContainer;