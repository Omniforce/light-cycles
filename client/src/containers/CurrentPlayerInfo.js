import { connect } from 'react-redux';
import Info from '../components/info';

const mapStateToProps = state => {
  return {
    currentPlayer: state.sidebar.currentPlayer
  }
}

const CurrentPlayerInfo = connect(
  mapStateToProps
)(Info);

export default CurrentPlayerInfo;
