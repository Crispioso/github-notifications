import {h, Component} from 'preact';
import UnreadCount from './UnreadCount.jsx';

class Header extends Component {
    render() {
        return (
            <header className="header mdl-layout__header mdl-layout__header--waterfall">
                <div className="mdl-layout__header-row">
                    <h1 className="title">Github notifications</h1>
                    <div className="mdl-layout-spacer"></div>
                    <UnreadCount/>
                </div>
            </header>
        )
    }
}

export default Header