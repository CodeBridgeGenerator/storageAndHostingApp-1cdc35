import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleRateTablePage from "../components/app_components/RateTablePage/SingleRateTablePage";
import RateTableProjectLayoutPage from "../components/app_components/RateTablePage/RateTableProjectLayoutPage";
import SingleProjectsPage from "../components/app_components/ProjectsPage/SingleProjectsPage";
import ProjectProjectLayoutPage from "../components/app_components/ProjectsPage/ProjectProjectLayoutPage";
import SingleProjectgcpPage from "../components/app_components/ProjectgcpPage/SingleProjectgcpPage";
import ProjectgcpProjectLayoutPage from "../components/app_components/ProjectgcpPage/ProjectgcpProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
<Route path="/rateTable/:singleRateTableId" exact element={<SingleRateTablePage />} />
<Route path="/rateTable" exact element={<RateTableProjectLayoutPage />} />
<Route path="/projects/:singleProjectsId" exact element={<SingleProjectsPage />} />
<Route path="/projects" exact element={<ProjectProjectLayoutPage />} />
<Route path="/projectgcp/:singleProjectgcpId" exact element={<SingleProjectgcpPage />} />
<Route path="/projectgcp" exact element={<ProjectgcpProjectLayoutPage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
        </Routes>
    );
}

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
