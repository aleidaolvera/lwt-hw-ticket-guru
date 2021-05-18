import { Link, RouteComponentProps } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { gql, useQuery } from '@apollo/client'
import { levelData, performanceData, seatData } from './ShowScreen'
import { useState } from 'react'

export const getAvailableSeats = gql`
  query GetAvailableSeats($levelId: ID!, $performanceId: ID!) {
    seatsAvailableByLevelAndPerformanceId(
      levelId: $levelId
      performanceId: $performanceId
    ) {
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

interface Reservation {
  id: number
  reservationName: string
  reservationConfirmed: boolean
  customerId: number
}

export const TicketScreen = ({
  match
}: RouteComponentProps<{ performanceId?: string; levelId?: string }>) => {
  const [show, setShow] = useState<Boolean>(false)
  const [reservation, setReservation] = useState<Reservation>({
    id: 0,
    reservationName: '',
    reservationConfirmed: false,
    customerId: 0
  })
  /* Used for Rendering Modal */
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const {
    params: { performanceId, levelId }
  } = match

  const { loading, error, data } = useQuery(getAvailableSeats, {
    variables: {
      levelId: levelId,
      performanceId: performanceId
    }
  })

  if (loading) return <h1>Loading Ticket Selection Screen...</h1>
  if (error) return <h1>Error Loading Ticket Selection Screen.</h1>
  if (!data) return <h1>Oops! It looks like tickets are sold out.. :(</h1>
  const { seatsAvailableByLevelAndPerformanceId: seatData } = data
  const level = seatData.levels[0]
  const isSeatingAvailable = seatData.seats.length > 0 || false

  /* Helper Functions for Form Submission */
  const set = (name: any) => {
    return ({ target: { value } }: any) => {
      setReservation((oldValues) => ({ ...oldValues, [name]: value }))
    }
  }

  const findAndSetRegistrationId = (rawValue: string) => {
    let splitRegistration = rawValue.split(' ')
    console.log(splitRegistration)
  }

  /* Rendering Ticket Screen Form */
  return (
    <Container className="pt-2">
      {isSeatingAvailable ? (
        <>
          <Row>
            <h2>
              Reserving {level.name} Level Seating
              <br />
              <small className="text-muted">
                {' '}
                {level.seatsAvailable} Level {level.name} Seating Tickets
                Available
              </small>
            </h2>
          </Row>
          <Row>
            <Col>
              <h4>Available Seats</h4>
              <Form>
                <Form.Group>
                  <Form.Label>Reservation Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Reservation Name"
                    value={reservation.reservationName}
                    onChange={set('reservationName')}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Select a Ticket</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => findAndSetRegistrationId(e.target.value)}
                  >
                    {seatData.seats.map((seat: any) => {
                      return (
                        <option key={seat.id}>
                          Row: {seat.row} - Seat: {seat.seatNumber}
                        </option>
                      )
                    })}
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleShow} block>
                  Reserve Tickets
                </Button>
              </Form>
            </Col>
          </Row>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title> Confirm Ticket Registration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                You are about to reserve tickets for [show.name] for
                [level.name] level seating. You are confirming that you would
                like to reserve ticket at row [seat.row] seat number
                [seat.seatNumber]
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Go Back
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Confirm Registration
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <Row>
          <Col>
            <h3>
              Oops! It looks like all available tickets have been reserved.
            </h3>
            <Button as={Link} to={`/`} block variant="primary">
              Take me back home
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  )
}
