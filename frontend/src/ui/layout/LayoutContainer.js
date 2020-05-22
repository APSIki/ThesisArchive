import { connect } from 'react-redux';
import Layout from './Layout'

const mapStateToProps = state => {
  return {
    config: state.config
  }
}

const LayoutContainer = connect(mapStateToProps, {

})(Layout)

export default LayoutContainer;