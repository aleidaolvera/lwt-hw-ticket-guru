import { RESTDataSource } from 'apollo-datasource-rest'
import {
  Customer,
  Performance,
  PerformanceResponse,
  Seat,
  Show,
  ShowResponse,
  Venue
} from '../types'

export default class TicketGuruAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL =
      'http://ec2-54-159-33-6.compute-1.amazonaws.com:5005/ticket-guru/api'
  }

  /* Customer Code */
  getAllCustomers = async (): Promise<Array<Customer>> =>
    await this.get('customers')

  getCustomerById = async (customerId: number): Promise<Customer> =>
    await this.get('customers/' + customerId.toString())

  getCustomersByIds = (customerIds: Array<number>): Promise<Array<Customer>> =>
    Promise.all(
      customerIds.map((customerId) => this.getCustomerById(customerId))
    )

  /* Show Code */
  getAllShows = async (): Promise<Array<Show>> => {
    const response = await this.get('shows', { include: 'performances' })
    return response.map((show: ShowResponse) => this.showReducer(show))
  }

  getShowById = async (showId: number): Promise<Show> =>
    await this.get('shows/' + showId.toString(), {
      include: 'performances'
    }).then((show: ShowResponse) => this.showReducer(show))

  showReducer = async (show: ShowResponse): Promise<Show> => {
    return this.getVenueById(show.venueId).then((venue: Venue) => {
      return {
        id: show.id,
        name: show.name,
        description: show.description,
        venue: venue,
        performances: show.performances,
        url: show.url || undefined
      }
    })
  }

  /* Venue Code */
  getAllVenues = async (): Promise<Array<Venue>> => await this.get('venues')

  getVenueById = async (venueId: number): Promise<Venue> =>
    await this.get('venues/' + venueId.toString())

  /* Performances Code */
  getAllPerformances = async (): Promise<Performance> =>
    await this.get('performances', { include: 'show' })

  getPerformanceById = async (performanceId: number): Promise<Performance> =>
    await this.get('performances/' + performanceId.toString(), {
      include: 'show'
    })

  getPerformancesByShowId = async (showId: number): Promise<Performance> => {
    const response = await this.get('performances/', {
      showId: showId,
      include: 'show'
    })
    return response.map((performance: PerformanceResponse) =>
      this.performanceReducer(performance)
    )
  }

  performanceReducer = async (
    performance: PerformanceResponse
  ): Promise<Performance> => {
    const show = await this.getShowById(performance.showId)
    const { levels, seats, seatsAvailable } =
      await this.getAvailableSeatsByPerformanceId(performance.id)
    return {
      id: performance.id,
      showTime: performance.showTime,
      levels: levels,
      show: show,
      seats: seats,
      seatsAvailable: seatsAvailable
    }
  }

  /* Seat Code */
  getAvailableSeatsByPerformanceId = async (
    performanceId: number
  ): Promise<Performance> => {
    return await this.get(
      'performances/' + performanceId.toString() + '/availability',
      {
        include: 'seats'
      }
    )
  }
  getAvailableSeatsByLevelAndPerformanceId = async (
    levelId: number,
    performanceId: number
  ): Promise<Array<Seat>> => {
    return await this.get(
      'performances/' + performanceId.toString() + '/availability',
      {
        levelId: levelId,
        include: 'seats'
      }
    )
  }
}
