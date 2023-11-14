import { Alert } from "react-native";
export const NotAvailable = () => {
    Alert.alert(
        'Oops',
        'Feature is not available yet.',
        [
          { text: 'OK', onPress: () => null },
        ],
        { cancelable: false }
      );
  };