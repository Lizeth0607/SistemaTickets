import React, { useEffect } from 'react';
import { Route, useLocation, withRouter } from 'react-router-dom';
import App from './App';
import { Login } from './pages/Login';
import { Error } from './pages/Error';
import { NotFound } from './pages/NotFound';
import { Access } from './pages/Access';

const AppWrapper = () => {

    let location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location]);

    switch (location.pathname) {
        case '/App':
            return <Route path="/App" component={App} />
        case '/error':
            return <Route path="/error" component={Error} />
        case '/notfound':
            return <Route path="/notfound" component={NotFound} />
        case '/access':
            return <Route path="/access" component={Access} />
        default:
            return <Login/>;
    }
}

export default withRouter(AppWrapper);
