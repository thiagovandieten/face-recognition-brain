import { useRef } from "react";

const SignIn = ({ onRouteChange }) => {
    const email = useRef('');
    const password = useRef('');

    const onEmailChange = (event) => {
        email.current = event.target.value;
    };

    const onPasswordChange = (event) => {
        password.current = event.target.value;
    };

    const onSubmitSignIn = (event) => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email.current,
                password: password.current
            })
        })
            .then((response) => {
                if (response.status === 200) {
                    onRouteChange('home')
                    return response.json();
                } else {
                    console.log('error logging in');
                    return new Error('error logging in')
                }
            })
            .then(console.log)
            .catch(console.log);
    };

    return (
        <div id="signIn" className="br3 bw2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5 mw6 pa3">
            <div className="measure center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={onEmailChange} className="br2 b--black-80 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={onPasswordChange} className="br2 b--black-80 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                    </div>
                </fieldset>
                <div className="">
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        type="submit"
                        onClick={onSubmitSignIn}
                        value="Sign in" />
                </div>
                <div className="lh-copy mt3">
                    <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;