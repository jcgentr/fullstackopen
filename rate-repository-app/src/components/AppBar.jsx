import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";

import Text from "./Text";
import theme from "../theme";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.background.secondary,
    color: theme.colors.textSecondary,
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_ME);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text
            color="textSecondary"
            fontSize="subheading"
            style={{ margin: 15 }}
          >
            Repositories
          </Text>
        </Link>
        {data?.me === null ? (
          <Link to="/signin">
            <Text
              color="textSecondary"
              fontSize="subheading"
              style={{ margin: 15 }}
            >
              Sign In
            </Text>
          </Link>
        ) : (
          <Link to="/signout">
            <Text
              color="textSecondary"
              fontSize="subheading"
              style={{ margin: 15 }}
            >
              Sign Out
            </Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
