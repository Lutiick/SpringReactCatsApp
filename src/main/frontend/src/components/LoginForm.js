import React, {Component} from "react";
import {Link, withRouter, Redirect} from "react-router-dom";
import {Alert, Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {login} from "../reduxService/index"
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
        event.preventDefault()
        this.setState({loading: true});
        const {history} = this.props;
        console.log(this.props);
        this.props.login(this.state.item.username, this.state.item.password)
            .then(() => {
                history.push("/");
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
        const {isLoggedIn, message} = this.props;
        // if (isLoggedIn) {
        //     return <Redirect to={"/"} />
        // }


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
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) =>  dispatch(login(username, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);