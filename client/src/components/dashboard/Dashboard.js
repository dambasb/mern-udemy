import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Navbar from "../navbar/Navbar";
import "./Dashboard.css";

const Dashboard = ({ getCurrentProfile, auth, profile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">Dashboard</div>
    </div>
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
