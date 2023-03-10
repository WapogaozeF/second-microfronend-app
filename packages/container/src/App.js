import React, { lazy, Suspense, useEffect, useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Progress from "./components/Progress";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import { createBrowserHistory } from "history";

const DashboardLazy = lazy(() => import('./components/DashboardApp')); 
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn]);

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to="/" />}
                                <DashboardLazy />
                            </Route>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
};