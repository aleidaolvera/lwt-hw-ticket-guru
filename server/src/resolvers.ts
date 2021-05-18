import { UserInputError } from 'apollo-server'
import { ApolloError } from 'apollo-server-errors'
import { Context, CustomerArgs } from './types'

const resolvers = {
  Query: {
    customers: (_: any, args: any, { dataSources }: Context) => {
      try {
        return dataSources.ticketGuruService.getAllCustomers()
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    customerById: (
      _: any,
      { id }: { id: number },
      { dataSources }: Context
    ) => {
      try {
        /* Error Checking */
        if (!id)
          throw new UserInputError(
            '[Query Error] customerById must include id argument.'
          )
        return dataSources.ticketGuruService.getCustomerById(id)
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    customersById: (
      _: any,
      { ids }: { ids: Array<number> },
      { dataSources }: Context
    ) => {
      try {
        /* Error Checking */
        if (!ids)
          throw new UserInputError(
            '[Query Error] customersById must include customerIds argument.'
          )
        return dataSources.ticketGuruService.getCustomersByIds(ids)
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    shows: (_: any, args: any, { dataSources }: Context) => {
      try {
        return dataSources.ticketGuruService.getAllShows()
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    showById: (_: any, { id }: { id: number }, { dataSources }: Context) => {
      try {
        /* Error Checking */
        if (!id)
          throw new UserInputError(
            '[Query Error] showById must include id argument.'
          )
        return dataSources.ticketGuruService.getShowById(id)
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    venues: (_: any, args: any, { dataSources }: Context) => {
      try {
        return dataSources.ticketGuruService.getAllVenues()
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    venueById: (_: any, { id }: { id: number }, { dataSources }: Context) => {
      try {
        /* Error Checking */
        if (!id)
          throw new UserInputError(
            '[Query Error] venueById must include id argument.'
          )
        return dataSources.ticketGuruService.getVenueById(id)
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    performances: (_: any, args: any, { dataSources }: Context) => {
      try {
        return dataSources.ticketGuruService.getAllPerformances()
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    performancesByShowId: (
      _: any,
      { id }: { id: number },
      { dataSources }: Context
    ) => {
      try {
        /* Error Checking */
        if (!id)
          throw new UserInputError(
            '[Query Error] performancesByShowId must include id argument.'
          )
        return dataSources.ticketGuruService.getPerformancesByShowId(id)
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    performanceById: (
      _: any,
      { id }: { id: number },
      { dataSources }: Context
    ) => {
      try {
        /* Error Checking */
        if (!id)
          throw new UserInputError(
            '[Query Error] performancesById must include id argument.'
          )
        return dataSources.ticketGuruService.getPerformanceById(id)
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    seatsAvailableByPerformanceId: (
      _: any,
      { id }: { id: number },
      { dataSources }: Context
    ) => {
      try {
        /* Error Checking */
        if (!id)
          throw new UserInputError(
            '[Query Error] seatsByPerformanceId must include id argument.'
          )
        return dataSources.ticketGuruService.getAvailableSeatsByPerformanceId(
          id
        )
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    seatsAvailableByLevelAndPerformanceId: (
      _: any,
      { levelId, performanceId }: { levelId: number; performanceId: number },
      { dataSources }: Context
    ) => {
      try {
        /* Error Checking */
        if (!levelId && !performanceId)
          throw new UserInputError(
            '[Query Error] seatsAvailableByLevelAndPerformanceId must include levelId and performanceId argument.'
          )
        return dataSources.ticketGuruService.getAvailableSeatsByLevelAndPerformanceId(
          levelId,
          performanceId
        )
      } catch (error) {
        throw new ApolloError(error)
      }
    }
  }
}

export default resolvers
