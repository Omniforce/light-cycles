import { connect } from 'react-redux';
import Board from '../components/board';

const mapStateToProps = state => {
  return {
    game: state.game
  }
}

const Gameboard = connect(
  mapStateToProps
)(Board);

export default Gameboard;
