import { h, Component } from 'preact';
import { connect } from 'preact-redux';

class UnreadCount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            unreadCount: props.unreadCount
        };
    }

    shouldComponentUpdate(nextProps) {
        this.setState({unreadCount: nextProps.unreadCount})
    }

    componentDidUpdate() {
        const element = document.getElementById('unread-count');
        element.setAttribute('data-badge', this.state.unreadCount);
    }

    render() {
        return <div id="unread-count" className="material-icons mdl-badge mdl-badge--overlap">mail_outline</div>
    }
}

function mapStateToProps(state) {
    return {
        unreadCount: state.unreadCount
    }
}

export default connect(mapStateToProps)(UnreadCount)