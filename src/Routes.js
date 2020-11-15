import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/home';
import SignIn from './components/SignIn/SignIn';

const Routes = (props) => {

    return (
        // <Layout>
        <Switch>
            <Route {...props} path="/" exact component={Home} />
            <Route path="/sign-in" exact component={SignIn} />
        </Switch>
        // </Layout>

    )

}

export default Routes;