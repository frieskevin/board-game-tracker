import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Home from '../src/pages/Home';
import Dashboard from '../src/pages/Dashboard';
import CommentList from '../src/components/CommentList';
import SingleGame from './pages/SingleGame';
import Profile from '../src/pages/Profile';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
            path="/game/:id"
            element={<SingleGame />}
          />
          <Route path="/profile/:username" element={<Profile />} />

          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/game/:id" element={<CommentList />} />
        </Routes>
        <Footer />
      </Router>


    </ApolloProvider>
  );
}

export default App;
