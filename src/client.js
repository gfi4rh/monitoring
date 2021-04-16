import fetch from 'node-fetch';
import { encode } from 'base-64';
import chalk from 'chalk';

const client = mozaik => {

  return {

    versions(params){

      mozaik.logger.info(chalk.yellow(`[monitoring] calling monitoring.versions`));

      return fetch(`${params.url}/monitoring4rh/applications/${params.project}/actuator/info`,{
        method : 'GET',
        headers : {
          'Authorization' : 'Basic ' + encode(`${process.env.MONITORING_USERNAME}:${process.env.MONITORING_PASSWORD}`),
          'Accept' : "application/json"
        }
      })
      .then(res => res.json())
      .then(json => json.map(x => {
        return {
          name : JSON.parse(x.body).tags.environment,
          version : JSON.parse(x.body).build.version
        }
        }))
    },
    
  }
}

export default client;