import TicketGuruAPI from './datasources/ticketGuruAPI'

export interface IDataSources {
  ticketGuruService: TicketGuruAPI
}

export interface Context {
  dataSources: IDataSources
}

export interface CustomerArgs {
  id?: number
  customerIds?: Array<number>
}

export interface Customer {
  id: number
  firstName: string
  lastName: string
  address: string
  email: string
}

export interface ShowResponse {
  id: number
  name: string
  description: string
  venueId: number
  performances?: PerformanceResponse
  url?: string
}

export interface Show {
  id: number
  name: string
  description: string
  venue: Venue
  url?: string
}

export interface Venue {
  id: number
  name: string
  description: string
  address: string
  url?: string
}

export interface PerformanceResponse {
  id: number
  showId: number
  showTime: string
  show?: Show
  levels?: Array<Level>
  seats?: Array<Seat>
}

export interface Performance {
  id: number
  showTime: string
  levels: Array<Level>
  show?: Show
  seats?: Array<Seat>
  seatsAvailable?: number
}

export interface Level {
  id: number
  venueId: number
  name: string
  price: number
  numRows: number
  seatsPerRow: number
  seatsAvailable: number
}

export interface Seat {
  id: number
  performanceId: number
  levelId: number
  reservationId: number
  row: number
  seatNumber: number
}
