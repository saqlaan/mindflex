import React, { useState } from 'react';
import {
  Button,
  Input,
  Layout,
  Text,
  Icon,
  useTheme,
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const theme = useTheme();

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderPasswordIcon = (props) => (
    <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
  );

  const handleLogin = () => {
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>
        Login
      </Text>
      <Input
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        value={password}
        accessoryRight={renderPasswordIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Text appearance="hint" style={styles.footerText}>
        Don't have an account? Sign up.
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
  },
});
