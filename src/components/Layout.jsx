import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { updateFilter } from '../shared/actions';

import Filters from './Filters.jsx'
import Header from './Header.jsx';

class Layout extends Component {
    render() {
        const childName = this.props.children.props.component.WrappedComponent.name;
        if (childName !== "Notifications") {
            this.props.dispatch(updateFilter(''));
        }

        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
                <Header/>
                <Filters/>
                <main className="main mdl-layout__content mdl-color--grey-100">
                    <div className="page-content">
                        {this.props.children}
                    </div>
                </main>
            </div>
        )
    }
}

export default connect()(Layout);
