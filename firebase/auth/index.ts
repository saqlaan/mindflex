/* eslint-disable no-useless-catch */
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";


export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return auth().signInWithEmailAndPassword(email, password);
};
