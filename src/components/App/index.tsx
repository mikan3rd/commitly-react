import React from 'react';
import firebase from 'firebase/app';
import { Container, Image, Menu, Dropdown, Dimmer, Loader } from 'semantic-ui-react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import styled from 'styled-components';

import { Props } from '../../containers/App';

import './overrides.css';
import logo_header from '../../images/logo_header.png';

const App = (props: Props) => {
  const handleLogIn = () => {
    const { chengeAuthChecked } = props;
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('user');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        console.log(result);
        toast({
          type: 'success',
          title: 'ログインしました！',
          time: 4000,
        });
        // TODO: MyPageに遷移させる
        // props.history.push(path.mypage);
        chengeAuthChecked(true);
      })
      .catch(function(error) {
        console.error(error);
        toast({
          type: 'error',
          title: 'ログインに失敗しました...',
          description: error.message,
          time: 8000,
        });
      });
  };

  const handleLogOut = () => {
    const { chengeAuthChecked } = props;
    firebase
      .auth()
      .signOut()
      .then(function() {
        chengeAuthChecked(false);
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  const {
    appState: { isLoading, authChecked },
    children,
  } = props;
  const { currentUser } = firebase.auth();
  const hasCurrentUser = authChecked && currentUser;
  return (
    <>
      <div>
        <Menu fixed='top' color='yellow' inverted>
          <Menu.Item as='a' header fitted>
            <Image size='small' src={logo_header} />
          </Menu.Item>

          <Menu.Menu position='right'>
            <Dropdown text='メニュー' simple item>
              <Dropdown.Menu>
                {hasCurrentUser ? (
                  <Dropdown.Item text='ログアウト' icon='sign-out' onClick={handleLogOut} />
                ) : (
                  <Dropdown.Item text='ログイン' icon='sign-in' onClick={handleLogIn} />
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>

        <MainContainer text>{children}</MainContainer>
      </div>

      <Dimmer active={isLoading} inverted>
        <Loader>Loading</Loader>
      </Dimmer>

      <SemanticToastContainer position='top-center' />
    </>
  );
};

const MainContainer = styled(Container)`
  &&& {
    padding-top: 3em;
  }
`;

export default App;
