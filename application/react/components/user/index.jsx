import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from 'actions/user';

import 'stylesheets/user';

export class User extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.actions.load('user');
  }
  render() {
    if (this.props.user.hasOwnProperty('data')) {
      const user = this.props.user.data.viewer;
      const years = ((+new Date() - +new Date(user.createdAt)) / 86400000) / 365;

      return (
        <section id="user">
          <p>{user.login} aka {user.name}</p>
          <img src={user.avatarUrl} />
          <p>Member for {years} years</p>
        </section>
      )
    } else {
      return null;
    }
  }
}

User.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    user: state.user.data
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);
