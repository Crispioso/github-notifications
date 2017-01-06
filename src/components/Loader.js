import Inferno from 'inferno';
import Component from 'inferno-component'

class Loader extends Component {
    render() {
        return <div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
    }
}

export default Loader