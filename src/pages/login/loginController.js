import Parse from 'parse';
import { Record } from 'immutable';
import { withState, withHandlers, pipe } from '../../js';

const onSignUp = ({ data, setData }) => () => {
  if (
    data.email &&
    data.passWord &&
    data.phoneNumber &&
    data.firstName &&
    data.lastName &&
    data.role
  ) {
    console.log('if');
    const user = new Parse.User();
    user.set('username', data.email);
    user.set('password', data.passWord);
    user.set('email', data.email);
    user.set('phoneNumber', data.phoneNumber);
    user.set('firstName', data.firstName);
    user.set('lastName', data.lastName);
    user.set('role', data.role);
    console.log(user);
    user
      .signUp()
      .then(() => {
        console.log('done');
        alert('user created');
        setData(d =>
          d.merge({
            firstName: undefined,
            passWord: undefined,
            signUpFormVisible: false,
          }),
        );
      })
      .catch(function(error) {
        console.log('Error: ' + error.code + ' ' + error.message);
      });
  } else console.log('else');
};

// const onFinish = ({ setData }) => values => {
//   const user = new Parse.User();
//   user.add(values);
//   console.log(user);
//   try {
//     user.signUp().then(() => {
//       console.log('done');
//       alert('user created');
//       setData(d =>
//         d.merge({
//           firstName: undefined,
//           passWord: undefined,
//         }),
//       );
//     });
//   } catch (error) {
//     // Show the error message somewhere and let the user try again.
//     console.log('eee', error);

//     alert('Error: ' + error.code + ' ' + error.message);
//   }
// };

const onSignIn = ({ data, setData }) => history => {
  if (data.passWord && data.userName) {
    Parse.User.logIn(data.userName, data.passWord).then(user => {
      if (user.toJSON.role == 'lawyer') history.push('/lawyer-panel');
      else history.push('/user-panel');
      setData(d => d.set('authenticated', true));
    });
  }
};

const showSignUpForm = ({ setData }) => () => {
  setData(d => d.set('signUpFormVisible', true));
};

const setTextFieldsValue = ({ setData }) => (fieldName, value) => {
  console.log(value);
  setData(d => d.set([fieldName], value));
};

const setRole = ({ setData }) => role => {
  console.log(role);
  setData(d => d.set('role', role));
};

const init = () =>
  Record({
    signUpFormVisible: false,
    userName: undefined,
    passWord: undefined,
    authenticated: Parse.User.current(),
    phoneNumber: undefined,
    firstName: undefined,
    lastName: undefined,
    role: undefined,
    email: undefined,
  });
const loginController = pipe(
  withState(init, 'data', 'setData'),
  withHandlers({
    onSignUp,
    onSignIn,
    showSignUpForm,
    setTextFieldsValue,
    setRole,
  }),
);

export default loginController;
