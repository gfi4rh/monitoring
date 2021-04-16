import React, { Component, PropTypes, version } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
/*import classNames                      from 'classnames'
import d3                              from 'd3/d3'
import moment                          from 'moment'
import timezone                        from 'moment-timezone'*/


class Versions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            versions : null
        }
        
    }

    getApiRequest() {
        let { url, project } = this.props;

        return {
            id:     `monitoring.versions.${project}`,
            params: {
                project : project,
                url : url
            }
        };
    }

    onApiData(versions) {
        this.setState({
            versions : versions
        });
    }

    render() {

        var { pillar, environment } = this.props;
        const { versions } = this.state;

        let node = null;

        if(versions) {

            node = (
                <table className="version__table">
                    <tr>{pillar.map(x => <th>{x}</th>)}</tr>
                    {environment.map(x => 
                    <tr>
                        {x.map((e,i) => i === 0 ? <th>{e}</th> : <td className="version__cell">{versions.find(f => f.name === e) ? versions.find(f => f.name === e).version : "Non disponible"}</td>)}
                    </tr>)}
                </table>
            );
        }


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

Versions.propTypes = {
    board:  PropTypes.number.isRequired
};

reactMixin(Versions.prototype, ListenerMixin);
reactMixin(Versions.prototype, Mozaik.Mixin.ApiConsumer);

export default Versions;
