import React from 'react';

class Signin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            checkError: false
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onSubmitClick = () => {
        fetch('https://fast-tor-49371.herokuapp.com/signin/',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.id) {
                this.props.loadUser(data);
                this.props.changeRoute('home');
            }
            else{
                this.setState({ checkError: true });
            }
        })
    }

    render() {
        const { changeRoute } = this.props;
        return(
            <article className="br3 ba white b--white-90 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
                <main className="pa4 white">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        {
                            this.state.checkError === true
                            ? <p className='f5 underline calisto' style={{color: "#0EE7E7"}}>Wrong Email or Password..</p>
                            : <span></span>
                        }
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                onChange= { this.onEmailChange }
                                className="pa2 input-reset ba b--white-90 bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"    
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                onChange={ this.onPasswordChange }
                                className="b pa2 input-reset ba b--white-90 bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                            />
                        </div>
                        </fieldset>
                        <div>
                            <input 
                                onClick= { this.onSubmitClick }
                                className="b ph2 pv2 input-reset ba b--transparent bg-transparent br3 white-90 grow pointer f4 dib garamond" 
                                style={{backgroundColor: '#E63946'}}
                                type="submit" 
                                value="Sign in" 
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p 
                                onClick={() => changeRoute('register')}
                                className="f6 link dim white db pointer">
                                Register
                            </p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;