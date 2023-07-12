import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import { useSignIn } from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  textInput: {
    fontSize: 24,
    margin: 10,
  },
  submitBtn: {
    backgroundColor: theme.colors.primary,
    padding: 8,
    borderRadius: 5,
    margin: 10,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={{ backgroundColor: theme.background.primary }}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.textInput}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        style={styles.textInput}
      />
      <Pressable onPress={onSubmit} style={styles.submitBtn}>
        <Text
          color={"textSecondary"}
          style={{ textAlign: "center", fontSize: 24 }}
        >
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn, { data, loading, error }] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const dataDirect = await signIn({ username, password });
      console.log({ dataDirect });
      // if properly signed in, redirect to repo list
      if (dataDirect) navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  // Handle loading and error states
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;
  if (data) return <Text>Data {JSON.stringify(data)}</Text>;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
