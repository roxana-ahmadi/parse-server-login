import Parse from 'parse';
import { Record } from 'immutable';
import { withState, withHandlers, pipe } from '../../js';

const onSignUp = ({ data, setData }) => () => {
  const user = new Parse.User();
  user.set('username', data.userName);
  user.set('password', data.passWord);
  //user.set('email', 'roxaaan@yahoo.com');
  try {
    user.signUp().then(() => {
      alert('user created');
      setData(d =>
        d.merge({
          userName: undefined,
          passWord: undefined,
        }),
      );
    });
  } catch (error) {
    // Show the error message somewhere and let the user try again.
    console.log('eee', error);

    alert('Error: ' + error.code + ' ' + error.message);
  }
};

const getUserName = ({ setData }) => userName => {
  setData(d => d.set('userName', userName));
};

const getPassWord = ({ setData }) => passWord => {
  setData(d => d.set('passWord', passWord));
};

const onSignIn = ({ data, setData }) => () => {
  console.log(Parse.User.current());
  // if (data.passWord && data.userName) {
  //   Parse.User.logIn(data.userName, data.passWord).then(() => {
  //
  //     setData(d => d.set('isAuthenticated', true));
  //   });
  // }
};

const init = () =>
  Record({
    userName: undefined,
    passWord: undefined,
    isAuthenticated: false,
  });
const logincontroller = pipe(
  withState(init, 'data', 'setData'),
  withHandlers({
    onSignUp,
    onSignIn,
    getUserName,
    getPassWord,
  }),
);

export default logincontroller;
