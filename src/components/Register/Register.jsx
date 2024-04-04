const Register = ({onRouteChange}) => {
    return (
        <article className="br3 bw2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5 mw6 pa3">
            <form action="sign-up_submit" method="get" acceptCharset="utf-8">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="name">Name</label>
                        <input className="br2 b--black-80 pa2 input-reset ba bg-transparent w-100 measure" type="text" name="name" id="name" />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                        <input className="br2 b--black-80 pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address" id="email-address"/>
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
                        <input className="br2 b--black-80 b pa2 input-reset ba bg-transparent" type="password" name="password" id="password"/>
                    </div>
                </fieldset>
                <div className="mt3"><input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" onClick={() => onRouteChange('signin')} value="Sign Up"/></div>
            </form>
        </article>
    );
}

export default Register;