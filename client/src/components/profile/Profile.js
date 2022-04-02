import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../spinner/Spinner";
import { getProfileById } from "../../actions/profile";
import Navbar from "../navbar/Navbar";
import "./Profile.css";
import { Link, useParams } from "react-router-dom";

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  console.log("params", id);
  return (
    <Fragment>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="container">
            <Link to="/profiles" className="btn btn-light">
              Back To Profiles
            </Link>
            {console.log("AUTH:", auth)}
            {console.log("PROFILE:", profile)}
            {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile?.user._id ? (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            ) : null}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);