import fetch from 'node-fetch';
import { encode } from 'base-64';
import chalk from 'chalk';

const client = mozaik => {

  return {

    version(params){

      mozaik.logger.info(chalk.yellow(`[monitoring] calling monitoring.version`));

      return fetch(`${params.url}/monitoring4rh/instances/${params.instance}`,{
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
      .then(json => json.filter(x => x.body))
      .then(data => data.map(x => {
        const body = JSON.parse(x.body)
        return {
          name : body.tags.environment,
          instance : x.instanceId
        }}))
      .catch(err => console.error(err))
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