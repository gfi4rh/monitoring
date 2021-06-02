import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';

class Version extends Component {
  constructor(props){
    super(props)
    this.state = {
      version : null
    }
  }

  getApiRequest() {
    let { url, instance } = this.props;

    return {
        id:     `monitoring.version.${instance}`,
        params: {
            instance : instance,
            url : url
        }
    };
}

onApiData(version) {
    this.setState({
        version : version
    });
}

render() {

  let node = "Non disponible"
  let className = "version__cell"

  const { version } = this.state

  if(version){
    node = version.number
    className += version.status === 'UP' ? " version__up" : " version__down"
  } else {
    className += " version__down"
  }

  return (<td className={className}>
    {node}
  </td>)
}


}

Version.displayName = 'Version';

reactMixin(Version.prototype, ListenerMixin);
reactMixin(Version.prototype, Mozaik.Mixin.ApiConsumer);

export default Version;