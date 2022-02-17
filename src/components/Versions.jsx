import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import Version                         from './Version.jsx'


class Versions extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        var { pillar, environment, url } = this.props;


        let node = (
            <table className="version__table"> {/* traduction des pilliers en tables*/}
                <tr>{pillar.map(x => <th>{x}</th>)}</tr> 
                {environment.map(x => 
                <tr>
                    {x.map((e,i) => i === 0 ? 
                        <th>{e}</th> : 
                        <Version url={url} instance={e}/>
                    )}
                </tr>)}
            </table>
        );


        return (
            <div>
                <div className="widget__header">
                    <span>
                        <span className="widget__header__subject">{this.props.title}</span>
                    </span>
                </div>
                <div className="widget__body">
                    <div className="version__container">
                        {node}
                    </div>
                </div>
            </div>
        );
    }
}

Versions.displayName = 'Versions';


export default Versions;
