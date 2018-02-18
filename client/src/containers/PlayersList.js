import { connect } from 'react-redux';
import Players from '../components/players';

const mapStateToProps = state => {
  return {
    players: state.sidebar.players
  }
}

const PlayersList = connect(
  mapStateToProps
)(Players);

export default PlayersList;
