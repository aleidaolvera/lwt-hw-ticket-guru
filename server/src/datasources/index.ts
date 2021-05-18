import { DataSources as DataSourcesType } from 'apollo-server-core/dist/graphqlOptions'
import TicketGuruAPI from './ticketGuruAPI'

export interface IDataSources {
  ticketGuruService: TicketGuruAPI
}

const dataSources = (): DataSourcesType<IDataSources> => {
  return {
    ticketGuruService: new TicketGuruAPI()
  }
}

export default dataSources
