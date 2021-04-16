import React, { Component, PropTypes } from 'react'
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
        console.log(versions)
        this.setState({
            versions : null
        });
    }

    render() {

        return (
            <div>
                <div className="widget__header">
                    <span>
                        <span className="widget__header__subject">{this.props.title}</span>
                    </span>
                </div>
                <div className="widget__body">
                    <div>
                        ICI TABLEAU
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
