import fetch from 'node-fetch';
import { encode } from 'base-64';

const client = mozaik => {

  return {

    versions(params){

      return fetch(`${params.url}/monitoring4rh/applications/${project}/actuator/info`,{
        method : 'GET',
        headers : {
          Accept : "application/json"
        }
      }).then(res => res.json())
    },
    
  }
}

export default client;