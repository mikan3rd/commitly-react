import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import { SemanticToastContainer } from 'react-semantic-toasts';

import { Props } from '../../containers/App';

import './overrides.css';
import logo_header from '../../images/logo_header.png';

const App = (props: Props) => {
  const { children } = props;
  return (
    <>
      <div>
        <Menu fixed='top' color='yellow' inverted>
          <Menu.Item as='a' header fitted>
            <Image size='small' src={logo_header} />
          </Menu.Item>
        </Menu>

        <Container text style={{ paddingTop: '3em' }}>
          {children}
        </Container>
      </div>
      <SemanticToastContainer position='top-center' />
    </>
  );
};

export default App;
