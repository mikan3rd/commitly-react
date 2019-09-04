import React from 'react';
import styled from 'styled-components';

import { Props } from 'containers/Profile';

export default class Profile extends React.Component<Props> {
  componentDidMount() {
    const {
      match: {
        params: { username },
      },
      getUserInfo,
    } = this.props;
    getUserInfo(username);
  }

  render() {
    return <Wrapper>Profile</Wrapper>;
  }
}

const Wrapper = styled.div``;
