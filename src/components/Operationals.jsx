import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import Operational                     from "./Operational.jsx"


class Operationals extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { environment } = this.props;
        
        return (
            <div>
                <div className="widget__header">
                    <span>
                        <span className="widget__header__subject">{this.props.title}</span>
                    </span>
                </div>
                <div className="widget__body">
                    <div className="operational__container">
                        {environment.map(x => <Operational name={x.name} url={x.url}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

Operationals.displayName = 'Operationals';


reactMixin(Operationals.prototype, ListenerMixin);
reactMixin(Operationals.prototype, Mozaik.Mixin.ApiConsumer);

export default Operationals;
