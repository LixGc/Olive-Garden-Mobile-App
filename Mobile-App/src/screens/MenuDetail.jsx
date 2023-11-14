import { useQuery } from '@apollo/client';
import {Card, Text} from 'react-native-paper';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { GET_MENU_BY_ID } from '../query';



export const MenuDetail = ({route}) => {
  const {MenuId} = route.params
  const {data, loading, error} = useQuery(GET_MENU_BY_ID, {
    variables: {
      getMenuByIdId: MenuId
    }
  })
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
  const menu = data.getMenuById
  const menuIngredients = menu.Ingredients.map((ingredient) => ingredient.name).join(" ,")
    return(
        <Card>
        <Card.Cover source={{ uri: menu.imgUrl }} />
        <Card.Content>
          <Text variant="titleLarge" style={{fontWeight: "bold", paddingBottom: 10,paddingTop: 20}}>{menu.name}</Text>
          <Text variant="bodyMedium" style={{paddingBottom: 10}}>{menu.Category.name}</Text>
          <Text variant="bodyMedium" style={{fontWeight: "bold",paddingBottom: 20}}>${menu.price}</Text>
          <Text variant="bodyMedium" style={{paddingBottom: 35}}>{menu.description}</Text>
          <Text variant="bodyMedium" style={{paddingBottom: 35}}>Ingredients: {menuIngredients}</Text>
          <Text variant="bodyMedium" style={{paddingBottom: 10}}>Created By: {menu.mongoUser.username}</Text>
          <Text variant="bodyMedium" style={{paddingBottom: 10}}>Created At: {menu.createdAt}</Text>
        </Card.Content>
      </Card>
    )
}