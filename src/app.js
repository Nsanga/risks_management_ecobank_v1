import React, { useEffect, useState } from 'react'
import 'assets/css/App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import { connect } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { isAuth } from 'helper/isAuth';

const App = ({ userAuth }) => {
    const authenticated = isAuth();

    return (
        <BrowserRouter>
            <Toaster position="bottom-center" reverseOrder={false} />
            {authenticated ? (
                <Switch>
                    <Route exact path="/admin/dashboard" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/events" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/settings" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/reports" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/system" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/integration" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/configuration" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/logout" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/event" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/action" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/control" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/actions" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/tenant-settings" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/key-risk-indicator" render={(props) => <AdminLayout {...props} />} />
                    <Route exact path="/admin/kri-search-result" render={(props) => <AdminLayout {...props} />} />

                    <Redirect from='/' to='/admin/dashboard' />
                </Switch>
            ) : (
                <Switch>
                    <Route exact path="/auth/login" render={(props) => <AuthLayout {...props} />} />
                    <Redirect to="/auth/login" />
                </Switch>
            )}
        </BrowserRouter>
    )
}

const mapStateToProps = ({ LoginReducer }) => ({
    userAuth: LoginReducer.userAuth,
    loading: LoginReducer.loading,
    error: LoginReducer.error,
});

export default connect(mapStateToProps)(App);
