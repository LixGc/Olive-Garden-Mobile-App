import { gql } from "@apollo/client";

export const GET_MENUS = gql`
  query Query {
    getMenus {
      name
      price
      id
      imgUrl
      Category {
        name
      }
    }
  }
`;

export const GET_MENU_BY_ID = gql`
  query GetMenuById($getMenuByIdId: ID!) {
    getMenuById(id: $getMenuByIdId) {
      Category {
        name
      }
      Ingredients {
        name
      }
      createdAt
      description
      imgUrl
      mongoUser {
        username
      }
      name
      price
      mongoUserId
    }
  }
`;
