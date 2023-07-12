import { View, Text, Image, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    padding: 10,
  },
  title: {
    color: "black",
    fontWeight: "bold",
  },
  lang: {
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
    padding: 8,
    borderRadius: 5,
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statsSubContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 7,
  },
  statsNum: {
    color: "black",
    fontWeight: "bold",
  },
  tinyLogo: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginRight: 10,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Image
          style={styles.tinyLogo}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />
        <View>
          <Text style={styles.title}>{item.fullName}</Text>
          <Text style={{ paddingBottom: 5, paddingTop: 3 }}>
            {item.description}
          </Text>
        </View>
      </View>
      <View style={styles.lang}>
        <Text style={{ color: "white" }}>{item.language}</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statsSubContainer}>
          <Text style={styles.statsNum}>{item.forksCount}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.statsSubContainer}>
          <Text style={styles.statsNum}>{item.stargazersCount}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.statsSubContainer}>
          <Text style={styles.statsNum}>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.statsSubContainer}>
          <Text style={styles.statsNum}>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;

/*
full name, description, language, number of forks, number of stars, rating average and number of reviews
*/
