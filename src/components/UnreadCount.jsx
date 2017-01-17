import Inferno from 'inferno';
import Component from 'inferno-component'
import { connect } from 'inferno-redux';

class UnreadCount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            unreadCount: props.unreadCount
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({unreadCount: nextProps.unreadCount})
    }

    render() {
        return <div id="unread-count" data-badge={this.state.unreadCount} className="material-icons mdl-badge mdl-badge--overlap">mail_outline</div>
    }
}

function mapStateToProps(state) {
    return {
        unreadCount: state.unreadCount
    }
}

export default connect(mapStateToProps)(UnreadCount)