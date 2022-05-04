import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from "react";
import CatImage from "./CatImage";
import {Button, ButtonGroup, Container, Row} from "reactstrap";
import axios from "axios";
import {Link, withRouter} from "react-router-dom";


class CatGallery extends Component {
  state = {
    cats: []
  };

  async componentDidMount() {
    let json;
    await axios.get('/api/cats').then(response => json = response.data);

    this.setState({cats: json});
    this.deleteCat = this.deleteCat.bind(this);
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
    const {cats} = this.state;
    return (
        <Container>
          <Row>
            <h2 className="col-12">Котики </h2>
            <Button color="success" className="mb-4" tag={Link} to={"/cats/edit/create"}>Добавить котика</Button>
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
export default withRouter(CatGallery);
