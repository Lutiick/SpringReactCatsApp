import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from "react";
import CatImage from "./CatImage";
import {Alert, Button, ButtonGroup, Container, Row} from "reactstrap";
import axios from "axios";
import {Link, withRouter} from "react-router-dom";
import {fetchCats} from "../service/cat/catAction";
import {connect} from "react-redux";


class CatGallery extends Component {


    constructor(props) {
        super(props);
        this.state = {
            cats: []
        };

        this.deleteCat = this.deleteCat.bind(this);
    }

    componentDidMount() {
        this.props.fetchCats();
    }

    deleteCat(id) {
        const URL = `/api/cats/${id}`;
        axios.delete(URL).then((response) => {
            if (response.status === 200) {
                let updatedCats = [...this.state.cats].filter(cat => cat.id !== id);
                this.setState({cats: updatedCats})
            }
        });
    }

    render() {
        const catsData = this.props.catsData;
        const cats = catsData.cats;


        return (
            <Container>
                <Row>
                    <h2 className="col-12">Котики </h2>
                    <Button color="success" className="mb-4" tag={Link} to={"/cats/edit/create"}>Добавить котика</Button>
                    {catsData.error ?
                        <Alert>
                            {catsData.error}
                        </Alert>
                        : null
                    }
                    {cats.map(cat =>
                        <div key={cat.id} className="col-3">
                            <CatImage className="mb-2" image={cat.image} />
                            <div className="mb-2">{cat.description}</div>
                            <ButtonGroup>
                                <Button className="me-2" color="primary" tag={Link} to={`/cats/edit/${cat.id}`}>Изменить</Button>
                                <Button color="danger" onClick={() => this.deleteCat(cat.id)}>Удалить</Button>
                            </ButtonGroup>
                        </div>
                    )}
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        catsData: state.cat,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCats: () => dispatch(fetchCats()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CatGallery);
