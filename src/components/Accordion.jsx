import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';

class Accordion extends Component {
    constructor(props){
        super(props);

        this.state = {
            active: false,
            height: 0,
            DOMNode: ''
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({active: !this.state.active});
        this.toggleAccordionContent();
    }

    componentDidMount() {
        const accordion = document.getElementById('accordion-' + this.props.title);

        this.state.DOMNode = [...accordion.childNodes].find(child => {
            return child.classList.contains('accordion__content');
        });
        this.state.height = (this.state.DOMNode).clientHeight;
    }

    toggleAccordionContent() {
        const accordion = this.state.DOMNode;
        const height = accordion.clientHeight;
        const fps = 60;
        let animationReq;

        function animateOpen(currentHeight) {
            setTimeout(function() {
                console.log({currentHeight, height});
                if (currentHeight >= height) {
                    cancelAnimationFrame(animationReq);
                    return;
                }

                accordion.style.height += (parseInt(accordion.style.height)+10) + "px";
                animationReq = requestAnimationFrame(animateOpen);
            }, 1000 / fps);
        }

        function animateClose(currentHeight) {
            setTimeout(function() {
                requestAnimationFrame(animateClose);

                if (currentHeight) {

                }
            }, 1000 / fps);
        }

        if (this.state.active) {
            console.log('Open');


        } else {
            console.log('Closed');
            accordion.style.height = '0';
            accordion.style.position = 'initial';
            animateOpen(0);

        }
    }

    render() {
        return (
            <div className="accordion" id={"accordion-" + this.props.title}>
                <h3 className="accordion__title" ariaExpanded={this.state.active}>
                    <button onClick={this.handleClick}>{this.props.title}</button>
                </h3>
                {/*<div className="accordion__content-container">*/}
                    <div className="accordion__content" ariaHidden={!this.state.active}>
                        {this.props.content}
                    </div>
                {/*</div>*/}
            </div>
        )
    }
}

export default Accordion