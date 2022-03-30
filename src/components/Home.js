import React, { Fragment } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import { mdiCube } from "@mdi/js";

const Home = () => (
  <Fragment>
    <HelmetProvider>
      <Helmet>
        <title>Exam App - Home</title>
      </Helmet>
    </HelmetProvider>
    <div id="home">
      <section>
        <div  className="cube">
          <span>
            <Icon path={mdiCube} size={2} spin />
          </span>
        </div>
        <h1>Exam App</h1>

        <div className="play-button-container">
          <ul>
            <li>
              <Link className="play-button" to="/play/instructions">Start</Link>
            </li>
          </ul>
        </div>
        <div className="auth-container">
          <Link to="/login" className="auth-btns" id="login-btn">Login</Link>
          <Link to="/signup" className="auth-btns" id="signup-btn">Sign Up</Link>
        </div>
      </section>
    </div>
  </Fragment>
);

export default Home;
