import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { showData } from './ShowScreen'

export const getVenueData = gql`
  query GetVenueData {
    venue {
      __typename
      id
      name
      description
      address
      url
    }
  }
`

export const getShows = gql`
  query GetShowList {
    shows {
      ...ShowData
    }
  }
  ${showData}
`

export const ShowsScreen = () => {
  const { loading, error, data } = useQuery(getShows)
  if (loading) return <h1>Loading Show Feed...</h1>
  if (error || !data) return <h1>Error Loading Show Feed</h1>
  const { shows } = data

  return (
    <Container className="pt-2">
      {shows &&
        shows.map((show: any) => {
          return (
            <Card className="mb-2" key={show.id}>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <Card.Title>
                      <a href={show.url}>{show.name} </a>{' '}
                      <small className="text-muted">at {show.venue.name}</small>
                    </Card.Title>
                    <Card.Text>{show.description}</Card.Text>
                  </Col>
                  <Col md={4} className="my-auto pt-3 pt-md-0">
                    <Button
                      as={Link}
                      to={`/show/${show.id}`}
                      block={true}
                      variant="primary"
                    >
                      Upcoming Performances
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )
        })}
    </Container>
  )
}
