import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client/react'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000'
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
