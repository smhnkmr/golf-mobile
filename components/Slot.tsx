import { StyleSheet, Text, View, Pressable } from "react-native";

interface Props {
  title: string;
  actual: string;
  total: string;
  players: number;
  onSlotClick: () => void;
}

export default function Slot({
  title,
  actual,
  total,
  players,
  onSlotClick,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onSlotClick}>
        <View style={styles.layout}>
          <Text style={styles.title}>{title}</Text>
          {/* <Text style={styles.balance}>
            ${actual.toFixed(2)}/${total.toFixed(2)}
          </Text> */}
          <Text style={styles.player}>{players} Players</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  layout: {},
  title: {
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#1ab394",
    padding: 5,
    fontWeight: "bold",
  },
  balance: {
    textAlign: "center",
  },
  player: {
    textAlign: "center",
    padding: 10,
  },
});
