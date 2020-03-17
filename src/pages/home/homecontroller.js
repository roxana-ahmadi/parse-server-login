import Parse from 'parse';
import { Record } from 'immutable';
import { withState, pipe, withEmitter, withHandlers } from '../../js';

const authenticateListener = ({ emitter, setData }) => {
  console.log(emitter, 'homeemiter');
  const subscription = emitter.addListener('onAuthenticationChange', args =>
    setData(d => d.set('isAuthenticated', true)),
  );
};

const init = () =>
  Record({
    isAuthenticated: false,
  });
const homecontroller = pipe(
  withState(init, 'data', 'setData'),
  withEmitter(authenticateListener),
  withHandlers({}),
);

export default homecontroller;
