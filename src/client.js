import fetch from 'node-fetch';
import { encode } from 'base-64';

const client = mozaik => {

  return {

    sprint( board ) {

      return fetch(`https://delivery.gfi.fr/jira/rest/agile/1.0/board/${board.board}/sprint`, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + encode(`${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}`),
          'Accept': 'application/json'
        }
      })
    }
    
  }
}

export default client;