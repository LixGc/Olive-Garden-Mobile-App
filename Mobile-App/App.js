import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { StackNTabNavigation } from "./src/navigation/StackNTabNavigation";

const client = new ApolloClient({
  // uri: "https://olivegarden-app.flixy.online/",
  uri: "https://8080-2001-448a-1021-6d5b-8ddb-9ee1-8d9f-6215.ngrok-free.app/",
  cache: new InMemoryCache(),
});
export default function App() {
  return (
    <ApolloProvider client={client}>
      <StackNTabNavigation />
    </ApolloProvider>
  );
}
