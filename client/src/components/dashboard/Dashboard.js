import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Navbar from "../navbar/Navbar";
import Spinner from "../spinner/Spinner";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        {loading && profile === null ? (
          <Spinner />
        ) : (
          <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p>Welcome {user && user.name}</p>

            {profile !== null ? (
              <Fragment>
                <DashboardActions />
              </Fragment>
            ) : (
              <Fragment>
                <p>You have not setup a profile, please add some info.</p>
                <Link to="/create-profile">Create Profile</Link>
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Dashboard.prototype = {
  getCurrentProfile: PropTypes.func.isRequire,
  auth: PropTypes.func.isRequired,
  profile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
