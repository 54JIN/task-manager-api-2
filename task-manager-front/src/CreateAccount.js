import React, {Component, useState} from 'react'
import axios from 'axios'

class CreateAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            userName: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    clickHandler = async () => {
        try {
            console.log(process.env.REACT_APP_LINK)
            // console.log(process.env.REACT_APP_LINK)
          const response = await axios.post(`/api/users`, {
            name: this.state.name,
            email: this.state.userName,
            password: this.state.password
            // name: "freddy",
            // email: "freddy@example.com",
            // password: "Computer098"
          });
          
          console.log('response')
          console.log(response.data)
          window.localStorage.setItem("token", JSON.stringify(response.data.token))
        } catch (e) {
          console.log(e.data)
        } 
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    render() {
        const { name, userName, password } = this.state
        return(
            <div className='LogIn'>
                <div className='Header'>
                    <h1>Task.Manager</h1>
                    <h1>92° Sunny</h1>
                </div>
                <div className='LogIn-Form'>
                    <h1>Create Account</h1>
                    <input type="text" placeholder="name" value={name} name='name' onChange={this.handleChange}/>
                    <input type="text" placeholder="Username" value={userName} name='userName' onChange={this.handleChange}/>
                    <input type="text" placeholder="Password" value={password} name='password' onChange={this.handleChange}/>
                    <button onClick={this.clickHandler}>Enter</button>
                </div>
            </div>
        )
    }
}

export default CreateAccount