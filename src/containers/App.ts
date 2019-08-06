import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../store';
import appActions from '../modules/App/actions';
import App from '../components/App/App';

function mapStateToProps(state: State) {
  return {
    appState: state.app,
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>) {
  return {
    changeName: (v: string) => dispatch(appActions.changeName(v)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
