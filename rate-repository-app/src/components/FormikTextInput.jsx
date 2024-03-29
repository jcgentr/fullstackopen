import { StyleSheet, View } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";

const styles = StyleSheet.create({
  errorText: {
    color: "#d73a4a",
    marginTop: 5,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  // Check if the field is touched and the error message is present
  const showError = meta.touched && meta.error;

  return (
    <>
      <View
        style={{
          margin: 10,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: showError ? "#d73a4a" : "#000",
          borderRadius: 5,
        }}
      >
        <TextInput
          onChangeText={(value) => helpers.setValue(value)}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          error={showError}
          {...props}
        />
      </View>
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
