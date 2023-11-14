import { View, Image } from "react-native";
import { CustomButton, CustomButton2 } from "../components/CustomButton";
import { Videos } from "../components/Video";
import { useNavigation } from "@react-navigation/native";
import { NotAvailable } from "../components/NotAvailable";
export const LandingPage = () => {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: "fixed", zIndex: 1, width: "100%", flex: 2 }}>
        <View style={{ backgroundColor: "rgba(111, 61, 50, 225)", flex: 1 }}></View>
        <Image
          source={{
            uri: "https://images.squarespace-cdn.com/content/v1/64495541db5e417884e63a58/248cad55-71ec-45d5-b735-09416ff33674/3a_Horizontal_Gray+WM_4c.png",
          }}
          style={{ width: "100%", height: "100%", position: "absolute", zIndex: 9999 }}
        />
      </View>
      <Videos />
      <View style={{ position: "fixed", bottom: 0, width: "100%", flex: 4 }}>
        <View style={{ backgroundColor: "rgb(210, 210, 210)", flex: 1 }}>
          <View style={{ padding: 15 }}>
            <CustomButton color="#a24029" text="ORDER NOW" onPress={() => navigation.navigate("Menu & Order")} />
          </View>
          <View style={{ padding: 15 }}>
            <CustomButton2 text="JOIN WAITLIST" onPress={NotAvailable} color="#a24029" borderColor="#a24029" />
          </View>
        </View>
      </View>
    </View>
  );
};
