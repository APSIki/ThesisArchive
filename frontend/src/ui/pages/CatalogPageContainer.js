import { connect } from 'react-redux';
import CatalogPage from './CatalogPage'
import { setUsers } from '../../store/actions/config'
import { setTheses } from '../../store/actions/thesis'

const mapStateToProps = state => {
  return {
    config: state.config
  }
}

const CatalogPageContainer = connect(mapStateToProps, null)(CatalogPage)

export default CatalogPageContainer;