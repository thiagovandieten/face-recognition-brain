import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn) {
        return (
            <nav>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign out</p>
            </nav>
        )
    } else {
        return (
            <nav>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign in</p>
                <p onClick={() => onRouteChange('register')} className="f3 link dim black underline pa3 pointer">Sign up</p>
            </nav>
        )
    }
    
}

export default Navigation;