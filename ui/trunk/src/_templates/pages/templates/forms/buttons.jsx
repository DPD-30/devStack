import React from 'react';
import { Container, Button } from 'reactstrap';

const Example = (props) => {
  return (
    <Container>
      <Button color="primary">primary</Button>{' '}
      <Button color="secondary">secondary</Button>{' '}
      <Button color="success">success</Button>{' '}
      <Button color="info">info</Button>{' '}
      <Button color="warning">warning</Button>{' '}
      <Button color="danger">danger</Button>{' '}
      <Button color="link">link</Button>
    </Container>
  );
}

export default Example;