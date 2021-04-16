import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';


class Operational extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status : null
        }
        
    }

    getApiRequest() {
        let { name , url } = this.props;

        return {
            id:     `monitoring.operational.${name}`,
            params: {
                name : name,
                url : url
            }
        };
    }

    onApiData(status) {
        console.log(status)
        this.setState({
            status : status
        });
    }

    render() {

      const { name } = this.props;
      const { status } = this.state;


        return (
            <div>
                {name} + {status} 
            </div>
        );
    }
}

Operational.displayName = 'Operational';


reactMixin(Operational.prototype, ListenerMixin);
reactMixin(Operational.prototype, Mozaik.Mixin.ApiConsumer);

export default Operational;
