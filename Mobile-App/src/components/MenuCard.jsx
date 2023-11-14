import { Pressable } from "react-native";
import { Card, Text } from "react-native-paper";
import { MenuButton } from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
import { NotAvailable } from "./NotAvailable";
export const MenuCard = ({menu}) => {
  const navigation = useNavigation()
  return (
        <Card style={{ width: "45%", marginBottom: 20, marginRight: "2%",marginLeft: "2%"}}>
        <Pressable onPress={() => navigation.navigate("Item details",{MenuId: menu.id})}>
          <Card.Cover source={{ uri: menu.imgUrl }} style={{ width: "100%", height: 150 }} />
          </Pressable>
          <Card.Content>
            <Text variant="titleMedium" style={{paddingBottom: 10}}>{menu.name}</Text>
            <Text variant="bodyMedium" style={{paddingBottom: 10}}>{menu.Category.name}</Text>
            <Text variant="bodyMedium" style={{fontWeight: "bold"}}>${menu.price}</Text>
          </Card.Content>
          <MenuButton onPress={NotAvailable}/>
        </Card>
  );
};
