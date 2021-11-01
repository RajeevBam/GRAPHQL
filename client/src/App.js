import Header from './components/Header'
import TaskList from './components/TaskList' 
import GetTask from './components/GetTask';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from,
  gql
} from "@apollo/client";
import {onError} from '@apollo/client/link/error';
const errorLink= onError(({
  graphqlErrors, networkErrors
})=>{
  if (graphqlErrors){
    graphqlErrors.map(({ message, location, path })=>{
      alert(`Graphql error ${message}`)
    });
  }
});
const link = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:1000/graphql'})
])
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})

function App() {
  return <ApolloProvider client={client}>
       <div className='container'>
      <Header tittle='Heading'/>
       <TaskList/>
      <GetTask/>
    </div>
  );
  </ApolloProvider>
 
}
           
export default App;