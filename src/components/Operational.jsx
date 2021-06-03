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

    onApiData(data) {
        this.setState({
            status : data.status
        });
    }

    render() {

        const { name } = this.props;
        const { status } = this.state;


        let className = "operational__dot"

        if(status) {
            className += ` operational__${status}`
        }

        return <div className="operational__cell operational__center">
            <div className="operational__name operational__center">{name}</div>
            <div className={className}></div>
        </div>
    }
}

Operational.displayName = 'Operational';


reactMixin(Operational.prototype, ListenerMixin);
reactMixin(Operational.prototype, Mozaik.Mixin.ApiConsumer);

export default Operational;
