import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import Version                         from './Version.jsx'


class Versions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            versions : null,
            error : null
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
        if('message' in versions){
            this.setState({
                error : "L'adresse de l'hôte monitoring est inaccessible"
            })
        } else {
            this.setState({
                versions : versions
            });
        }
    }

    render() {

        var { pillar, environment, url } = this.props;
        pillar.unshift("")
        const { versions, error } = this.state;

        let node = null;

        if(versions) {
            node = (
                <table className="version__table">
                    <tr>{pillar.map(x => <th>{x}</th>)}</tr>
                    {environment.map(x => 
                    <tr>
                        {x.map((e,i) => i === 0 ? 
                            <th>{e}</th> : 
                            <Version url={url} instance={versions.find(f => f.name === e) && versions.find(f => f.name === e).instance}/>
                        )}
                    </tr>)}
                </table>
            );
        } else {
            if(error){
                node = (<div className="version__error">{error}</div>)
            }
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

reactMixin(Versions.prototype, ListenerMixin);
reactMixin(Versions.prototype, Mozaik.Mixin.ApiConsumer);

export default Versions;
