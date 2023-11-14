import { Text, TouchableOpacity } from "react-native";
export const CustomButton = ({ text, onPress }) => (
    <TouchableOpacity
      style={{
        height: 60,
        backgroundColor: "#a24029",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <Text style={{color: "white", fontSize: 24,fontWeight: "bold" }}>{text}</Text>
    </TouchableOpacity>
  );
  export const CustomButton2 = ({ text, onPress, borderColor }) => (
    <TouchableOpacity
      style={{
        height: 60,
        backgroundColor: "transparent", // Transparent background
        borderWidth: 1, // Border width
        borderColor: borderColor, // Border color
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <Text style={{ color: borderColor, fontSize: 24, fontWeight: "bold" }}>{text}</Text>
    </TouchableOpacity>
  );

  export const MenuButton = ({onPress}) => {
    return(
      <TouchableOpacity
      style={{
        backgroundColor: '#a24029',
        padding: 10,
        borderRadius: 5,
        width: 80,
        margin: 10,
        alignSelf: "flex-end"
      }}
      onPress={onPress}
    >
      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold',textAlign: "center" }}>
        ADD
      </Text>
    </TouchableOpacity>
    )
  }