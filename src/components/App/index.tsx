import React from 'react';
import { Container, Image, Menu, Button, Icon, Header, Grid } from 'semantic-ui-react';

import { Props } from '../../containers/App';

import './primary.css';
import logo_header from './logo_header.png';
import logo from './logo.png';

const App: React.FC<Props> = props => {
  return (
    <div>
      <Menu fixed='top' color='yellow' inverted>
        <Menu.Item as='a' header fitted>
          <Image size='small' src={logo_header} />
        </Menu.Item>
      </Menu>

      <Container text style={{ paddingTop: '3em' }}>
        <Image src={logo} />

        <Grid container verticalAlign='middle'>
          <Grid.Row stretched>
            <Grid.Column width='8'>
              <Header>あなたのコミットを共有しませんか？</Header>
              <p>Commitlyはあなたの書いたコードを言語別に集計して共有するためのサービスです</p>
            </Grid.Column>
            <Grid.Column width='8'>
              <a className='twitter-timeline' data-height='400' href='https://twitter.com/commitly_jp' />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Button color='black'>
          <Icon name='github' /> Sign in with GitHub
        </Button>
      </Container>
    </div>
  );
};

export default App;
