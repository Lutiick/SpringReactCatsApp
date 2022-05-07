import React, {Component} from "react";
import axios from "axios";
import {Link, withRouter} from "react-router-dom";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";

class LoginForm extends Component {
    emptyItem = {
        "username": "",
        "password": ""
    }

    constructor(props) {
        super(props);
        this.state = {
            item:this.emptyItem
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
    }

    handleSubmit(event) {
        event.preventDefault()
        let {item} = this.state;
        const formData = new FormData();
        Object.entries(item).forEach(([key, value]) => formData.append(key, value));
        axios.post("http://localhost:8080/perform_login", formData, {withCredentials: true}).then(response => console.log(response));
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


        return (
            <Container>
                <h1>Логин</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">Описание</Label>
                        <Input type='text'
                               name="username" id="username" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Картинка</Label>
                        <Input type="text" name="password" id="password" onChange={this.handleChange}/>
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

export default withRouter(LoginForm);