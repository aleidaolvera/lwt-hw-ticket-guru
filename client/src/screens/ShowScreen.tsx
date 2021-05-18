import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { gql, useQuery } from '@apollo/client'
import { Link, RouteComponentProps } from 'react-router-dom'

export const performanceData = gql`
  fragment PerformanceData on Performance {
    __typename
    id
    showTime
    seatsAvailable
  }
`

export const venueData = gql`
  fragment VenueData on Venue {
    __typename
    name
    description
    address
  }
`

export const levelData = gql`
  fragment LevelData on Level {
    __typename
    id
    name
    numRows
    seatsPerRow
    seatsAvailable
    price
    venueId
  }
`

export const seatData = gql`
  fragment SeatData on Seat {
    __typename
    id
    performanceId
    levelId
    reservationId
    row
    seatNumber
  }
`

export const getShowPerformances = gql`
  query GetShowPerformances($id: ID!) {
    performancesByShowId(id: $id) {
      ...PerformanceData
      levels {
        ...LevelData
      }
      seats {
        ...SeatData
      }
    }
  }
  ${levelData}
  ${performanceData}
  ${seatData}
`

export const showData = gql`
  fragment ShowData on Show {
    __typename
    id
    name
    description
    url
    venue {
      ...VenueData
    }
  }
  ${venueData}
`

export const getShowData = gql`
  query GetShowData($id: ID!) {
    showById(id: $id) {
      ...ShowData
    }
  }
  ${showData}
`

export const ShowScreen = ({
  match
}: RouteComponentProps<{ showId?: string }>) => {
  const {
    params: { showId }
  } = match

  const {
    loading: loadingShowData,
    error: errorShowData,
    data: showData
  } = useQuery(getShowData, {
    variables: {
      id: showId
    }
  })
  const {
    loading: loadingPerformanceData,
    error: errorPerformanceData,
    data: performanceData
  } = useQuery(getShowPerformances, {
    variables: {
      id: showId
    }
  })

  if (loadingShowData || loadingPerformanceData)
    return <h1>Loading Show Feed...</h1>
  if (errorShowData || errorPerformanceData || !showData || !performanceData)
    return <h1>Error Loading Show Feed</h1>

  const { showById: show } = showData
  const { performancesByShowId: performances } = performanceData

  return (
    <>
      <Container className="pt-2">
        <Row>
          <h1>
            <a href={show.url}>{show.name} </a>{' '}
            <small className="text-muted"> at {show.venue.name}</small>
          </h1>
          <div>
            <b>About the Band:</b> {show.description}
            <br />
            <b>About the Venue:</b> {show.venue.description}
          </div>
        </Row>
        <Row>
          <h2>Upcoming Performances</h2>
        </Row>
        {performances &&
          performances.map((performance: any) => {
            let showTime = new Date(performance.showTime).toLocaleDateString(
              'en-US',
              {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }
            )
            return (
              <Card key={performance.id} className="mb-2">
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <Card.Title as="h5">{showTime}</Card.Title>
                    </Col>
                    <Col md={4}>
                      Tickets Remaining: {performance.seatsAvailable}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Card.Text>
                        <ListGroup horizontal>
                          {performance.levels &&
                            performance.levels.map((level: any) => {
                              return (
                                <ListGroup.Item
                                  action
                                  as={Link}
                                  to={`/performance/${performance.id}/${level.id}`}
                                  key={level.id}
                                >
                                  <Row>
                                    <Col>{level.name}</Col>
                                  </Row>
                                  <Row>
                                    <Col>{level.seatsAvailable} Available</Col>
                                  </Row>
                                </ListGroup.Item>
                              )
                            })}
                        </ListGroup>
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )
          })}
      </Container>
    </>
  )
}
