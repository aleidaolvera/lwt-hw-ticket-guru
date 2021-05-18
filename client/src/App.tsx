import React from 'react'
import { ShowsScreen } from './screens/ShowsScreen'
import { ShowScreen } from './screens/ShowScreen'
import { TicketScreen } from './screens/TicketScreen'
import { Metabar } from './components/Metabar'
import Container from 'react-bootstrap/esm/Container'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => (
  <Router>
    <Container fluid>
      <Metabar />
      <Switch>
        <Route exact path="/" component={ShowsScreen} />
        <Route path="/show/:showId" component={ShowScreen} />
        <Route
          path="/performance/:performanceId/:levelId"
          component={TicketScreen}
        />
      </Switch>
    </Container>
  </Router>
)

export default App
