import fetch from 'node-fetch';
import { encode } from 'base-64';
import chalk from 'chalk';

const client = mozaik => {

  return {

    version(params){

      mozaik.logger.info(chalk.yellow(`[monitoring] calling monitoring.version`));

      return fetch(`${params.url}/instances/${params.instance}`,{
        method : 'GET',
        headers : {
          'Authorization' : 'Basic ' + encode(`${process.env.MONITORING_USERNAME}:${process.env.MONITORING_PASSWORD}`),
          'Accept' : "application/json"
        }
      })
      .then(res => res.json())
      .then(json => {

        let number = null;

        if('project' in json.info){
          number = json.info.project.version
        } else {
          number = json.info.build.version
        }

        return {
        status : json.statusInfo.status,
        number : number,
        url : json.registration.serviceUrl}
      })
    },

    operational(params){

      mozaik.logger.info(chalk.yellow(`[monitoring] calling monitoring.operational`));

      return fetch(params.url, {
        method: 'GET'
      })
      .then(res => {
        if((res.status === 200) || (res.status === 401)){
          return {status : "up"}
        } else {
          return {status : "down"}
        }
      })
    },
    
  }
}

export default client;