import React from 'react';
import firebase from 'firebase/app';
import { Container, Image, Menu, Dropdown, Dimmer, Loader } from 'semantic-ui-react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { Props } from 'containers/App';
import { path } from 'routes';
import logo_header from 'images/logo_header.png';

class App extends React.Component<Props> {
  componentDidMount() {
    this.setFirebaseCurrentUser();
  }

  componentDidUpdate(prevProps: Props) {
    const {
      appState: { authChecked },
    } = this.props;
    if (prevProps.appState.authChecked && !authChecked) {
      console.log('HIT!');
      this.setFirebaseCurrentUser();
    }
  }

  setFirebaseCurrentUser = () => {
    const {
      appState: { authChecked },
      changeLoading,
      chengeAuthChecked,
    } = this.props;

    if (!authChecked) {
      const { currentUser } = firebase.auth();
      if (currentUser) {
        chengeAuthChecked(true);
      } else {
        changeLoading(true);
        firebase.auth().onAuthStateChanged(function(user) {
          chengeAuthChecked(true);
          changeLoading(false);
        });
      }
    }
  };

  handleLogIn = () => {
    const { chengeAuthChecked, moveTo, updateGitHubUser } = this.props;
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('user');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        updateGitHubUser(result);
        toast({
          type: 'success',
          title: 'ログインしました！',
          time: 4000,
        });
        moveTo(path.mypage);
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

  handleLogOut = () => {
    const { chengeAuthChecked } = this.props;
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

  render() {
    const {
      appState: { isLoading },
      moveTo,
      children,
    } = this.props;
    const { currentUser } = firebase.auth();
    return (
      <>
        <GlobalStyle />
        <div>
          <TopMenu fixed='top' inverted>
            <Menu.Item as='a' header fitted onClick={() => moveTo(path.topPage)}>
              <Image size='small' src={logo_header} />
            </Menu.Item>

            <Menu.Menu position='right'>
              <MenuDropdown text='メニュー' simple item>
                <Dropdown.Menu>
                  {currentUser ? (
                    <>
                      <Dropdown.Item text='マイページ' icon='user' onClick={() => moveTo(path.mypage)} />
                      <Dropdown.Item text='ログアウト' icon='sign-out' onClick={this.handleLogOut} />
                    </>
                  ) : (
                    <Dropdown.Item text='ログイン' icon='sign-in' onClick={this.handleLogIn} />
                  )}
                </Dropdown.Menu>
              </MenuDropdown>
            </Menu.Menu>
          </TopMenu>

          <MainContainer text>{children}</MainContainer>
        </div>

        <Dimmer active={isLoading} inverted>
          <Loader>Loading</Loader>
        </Dimmer>

        <SemanticToastContainer position='top-center' />
      </>
    );
  }
}

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body {
    background: #f7f7f7 !important;
  }
`;

const TopMenu = styled(Menu)`
  &&& {
    background-color: #fdd101 !important;
  }
`;

const MenuDropdown = styled(Dropdown)`
  &&& {
    color: black !important;
  }
`;

const MainContainer = styled(Container)`
  &&& {
    padding-top: 3em;
  }
`;

export default App;
