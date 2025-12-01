import Header from "./components/Header";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";



const cache = new InMemoryCache({
  typePolicies:{
    Query: {
      fields:{
        clients:{
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})

const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql"
});

const client = new ApolloClient({
   link: httpLink, 
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;