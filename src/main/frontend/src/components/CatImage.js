import React, {Component} from "react";
import placeholder from "../img/placeholder.jpg";

class CatImage extends Component {

    constructor(props) {
        super(props);
    }

    makeSource() {
        if (this.props.image) {
            return "data:image/png;base64," + this.props.image;
        } else {
            return placeholder;
        }

    }
    render () {
        return (<img className={`img-fluid ${this.props.className}`} src={this.makeSource()} alt="cat"/>)
    }
}

export default CatImage;