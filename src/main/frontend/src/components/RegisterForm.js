import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Alert, Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {register} from "../reduxService";
import {connect} from "react-redux";

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
        event.preventDefault();
        this.setState({loading: true});
        const {history} = this.props;
        this.props.register(this.state.item.username, this.state.item.password)
            .then(() => {
                history.push("/login");
                window.location.reload();
            })
            .catch(() => {
                this.setState({
                    loading: false,
                })
            });
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
        const {message} = this.props;

        return (
            <Container>
                <h1>Регистрация</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">Имя</Label>
                        <Input type='text'
                               name="username" id="username" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Пароль</Label>
                        <Input type="text" name="password" id="password" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit" className="me-3">Отправить</Button>
                        <Button color="secondary" tag={Link} to="/">Отмена</Button>
                    </FormGroup>
                    {message && (
                        <Alert>
                            {message}
                        </Alert>
                    )}
                </Form>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    const { message } = state.message;
    return {
        message
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (username, password) =>  dispatch(register(username, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);