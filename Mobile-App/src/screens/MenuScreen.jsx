import { FlatList, Text, View } from "react-native"
import { MenuCard } from "../components/MenuCard"
import { useQuery} from "@apollo/client"
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { GET_MENUS } from "../query";

export const MenuScreen = () => {
  const {data,loading,error} = useQuery(GET_MENUS)

  if(loading){
    return(
      <Loading/>
    )
  }
  if(error){
    return(
      <Error/>
    )
  }
  const menus = data.getMenus
    return(
        <View style={{marginTop: 10}}>
            <Text style={{textAlign: "center", fontSize: 30, fontWeight: "bold", paddingBottom: 5, color: "brown", fontFamily: "serif"}}>Our Menu</Text>
            <FlatList
                  data={menus}
                  renderItem={({item}) => {
                    return <MenuCard menu={item}/>
                  }}
                  keyExtractor={(item) => item.id}
                  style={{marginBottom: 50,marginTop: 30}}
                  numColumns={2}>
            </FlatList>
        </View>
    )
}