import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Button from '../../components/Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70%;
`;

const Message = styled.h2`
  font-size: 32px;
  font-weight: 600;
  padding: 30px 0px;
  align-self: center;
`;

const NotFound = () => (
  <Wrapper>
    <Helmet>
      <title>Empty</title>
    </Helmet>
    <Message>Please search user</Message>
  </Wrapper>
);

export default NotFound;
