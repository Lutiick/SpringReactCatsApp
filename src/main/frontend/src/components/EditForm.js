import React, {Component} from "react";
import axios from "axios";
import {Link, withRouter} from "react-router-dom";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";

class EditForm extends Component {
    emptyItem = {
        description: '',
        image: null
    }

    constructor(props) {
        super(props);
        this.state = {
            item:this.emptyItem
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'create') {
            let cat;
            await axios.get(`/api/cats/${this.props.match.params.id}`)
                .then(response => {
                    if (response.status === 200) {
                        cat = response.data
                    } else {
                        cat = this.state.item;
                    }
                });
            this.setState({item: cat});
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        const URL = `/api/cats/${item.id ? item.id : "create"}`;
        const formData = new FormData();
        Object.entries(item).forEach(([key, value]) => formData.append(key, value));
        await axios.request({
            method: item.id ? "PATCH" : "POST",
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': localStorage.getItem("access_token")
            },
            url: URL,
            data: formData
        }).then(response => console.log(response));
        this.props.history.push('/');
    }

    handleFile(event) {
        const target = event.target;
        const file = target.files[0] ? target.files[0] : null;
        const name = target.name
        let item = {...this.state.item}
        item[name] = file;
        this.setState({item})
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    render () {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Изменить' : 'Добавить котика'}</h2>;

        return (
            <Container>
                <h1>{title}</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="description">Описание</Label>
                        <Input type='textarea' rows='5' value={item.description || ""}
                               name="description" id="description" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">Картинка</Label>
                        <Input type="file" name="image" id="image" onChange={this.handleFile}/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit" className="me-3">Save</Button>
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>

                </Form>
            </Container>
        )
    }
}

export default withRouter(EditForm);