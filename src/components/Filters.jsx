import { h, Component } from 'preact';

class Filters extends Component {
    render() {
        return (
            <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Filters</span>
                <nav className="mdl-navigation">
                    <a className="mdl-navigation__link" href="/">All (default)</a>
                </nav>
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
                    <i className="material-icons">add</i>
                </button>
            </div>
        )
    }
}

export default Filters