import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Navigate, useRoutes } from 'react-router-dom';
import Login from '../views/auth/Login';
import CorporateRegister from '../views/auth/CorporateRegister';
import PageNotFound from '../views/pages/PageNotFound';
import DefaultLayout from '../layouts/DefaultLayout';
import Home from '../views/pages/CorporateHome';
import Requests from '../views/pages/Requests';
import EmailVerificationOtp from '../views/auth/EmailOtp';
import { useAppSelector } from '../app/store/store-hooks';
import OrgIdentifications from '../views/pages/OrgIdentifications';
import ApprovedRequests from '../views/pages/Users';
import CorporateIdentityShares from '../views/pages/CorporateIdentityShares';
import ProfileOverview from '../views/profile';
import { CorpIdentityShareDetails } from '../views/pages/CorpIdentityShareDetails';
import OrganizationIdentityRequestProcessing from '../views/pages/OrganizationIdentityRequestProcessing';
import OrganizationHome from '../views/pages/OrganizationHome';


const AppRouter = () => {
   const isAuthenticated = useAppSelector(state => state.AppStateReducer.isUserAuthenticated);


  <Router></Router>;
    const routes = useRoutes([
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <CorporateRegister />,
      },
      {
        path: "/auth/verify_otp",
        element: <EmailVerificationOtp />,
      },
      {
        path: "/auth/fff",
        element: <OrganizationHome />,
      },
      {
        path: "/",
        element: 
        isAuthenticated ? 
        <DefaultLayout /> 
        : <Navigate to="/auth/login" />
        ,
        children: [
          { element: <Navigate to="/" />},
          { path: "", element:  <Home/> },
          { path: "identity_requests", element:  <Requests/> },
          { path: "profile", element:  <ProfileOverview/> },
          { path: "org_identifications", element:  <OrgIdentifications/> },
          { path: "org_approved_identifications", element:  <ApprovedRequests/> },
          { path: "all_corporate_id_shares", element:  <CorporateIdentityShares/> },
          { path: "corporate_id_share/:id", element:  <CorpIdentityShareDetails/> },
          { path: "organization_identity_request_process/:id", element:  <OrganizationIdentityRequestProcessing/> },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        path: "/404",
        element: <PageNotFound />,
      }
    ]);

    return routes;
}

export default AppRouter
