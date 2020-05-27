import { connect } from 'react-redux';
import CatalogPage from './CatalogPage'

const mapStateToProps = state => {
  return {
    config: state.config
  }
}

const CatalogPageContainer = connect(mapStateToProps, null)(CatalogPage)

export default CatalogPageContainer;