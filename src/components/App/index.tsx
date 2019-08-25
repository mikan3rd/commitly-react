import React from 'react';
import firebase from 'firebase/app';
import { Container, Image, Menu, Dropdown, Dimmer, Loader, Segment, Button, Card } from 'semantic-ui-react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { Props } from 'containers/App';
import { path } from 'routes';
import logo_header from 'images/logo_header.png';

const GithubProviderId = 'github.com';

class App extends React.Component<Props> {
  componentDidMount() {
    this.setFirebaseCurrentUser();
  }

  componentDidUpdate(prevProps: Props) {
    const {
      appState: { authChecked },
    } = this.props;
    if (prevProps.appState.authChecked && !authChecked) {
      this.setFirebaseCurrentUser();
    }
  }

  setFirebaseCurrentUser = () => {
    const {
      appState: { authChecked },
      setLoading,
      chengeAuthChecked,
      getLoginUser,
    } = this.props;

    if (!authChecked) {
      const { currentUser } = firebase.auth();
      if (currentUser) {
        getLoginUser();
        chengeAuthChecked(true);
      } else {
        setLoading(true);
        firebase.auth().onAuthStateChanged(user => {
          chengeAuthChecked(true);
          if (user) {
            getLoginUser();
          } else {
            setLoading(false);
          }
        });
      }
    }
  };

  handleLogIn = () => {
    const { moveTo, updateGitHubUser } = this.props;
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('user');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log('result', result);
        updateGitHubUser(result);
        toast({
          type: 'success',
          title: 'ログインしました！',
          time: 4000,
        });
        moveTo(path.mypage);
      })
      .catch(error => {
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
      .then(() => {
        chengeAuthChecked(false);
        toast({
          type: 'success',
          title: 'ログアウトしました！',
          time: 4000,
        });
      })
      .catch(error => {
        console.error(error);
        toast({
          type: 'error',
          title: 'ログアウトに失敗しました...',
          description: error.message,
          time: 8000,
        });
      });
  };

  render() {
    const {
      appState: { isLoading, loginUser },
      moveTo,
      children,
    } = this.props;

    let githubData;

    const { currentUser } = firebase.auth();
    if (currentUser) {
      const { providerData } = currentUser;
      githubData = providerData.find(d => d && d.providerId === GithubProviderId);
    }

    return (
      <>
        <GlobalStyle />
        <Wrapper>
          <TopMenu fixed='top' inverted>
            <Menu.Item as='a' header fitted onClick={() => moveTo(path.topPage)}>
              <Image size='small' src={logo_header} />
            </Menu.Item>

            <Menu.Menu position='right'>
              <MenuDropdown text='メニュー' simple item>
                <Dropdown.Menu>
                  {currentUser && loginUser ? (
                    <>
                      <MenuCard>
                        <Card.Content>
                          <MenuCardImage floated='right' size='mini' src={githubData && githubData.photoURL} />
                          <MenuCardHeader>{loginUser.github_user_name}</MenuCardHeader>
                          <MenuCardMeta>{githubData && githubData.email}</MenuCardMeta>
                        </Card.Content>
                      </MenuCard>
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

          <Footer as='footer' color='grey' inverted attached='bottom'>
            <FooterContainer>
              <Button
                circular
                color='twitter'
                icon='twitter'
                size='small'
                as='a'
                href='https://twitter.com/commitly_jp'
                target='_blank'
                rel='noopener noreferrer'
              />
              <Button
                circular
                color='black'
                icon='github'
                size='small'
                as='a'
                href='https://github.com/mikan3rd/commitly'
                target='_blank'
                rel='noopener noreferrer'
              />
            </FooterContainer>
          </Footer>
        </Wrapper>

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

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
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
    flex: 1;
    padding-top: 3em;
  }
`;

const MenuCard = styled(Card)`
  &&& {
    margin: 0;
    box-shadow: none;
    max-width: 250px;
    border-bottom: 1px solid rgba(34, 36, 38, 0.1);
    border-radius: 0;
  }
`;

const MenuCardImage = styled(Image)`
  &&& {
    margin-bottom: 0 !important;
  }
`;

const MenuCardHeader = styled(Card.Header)`
  &&& {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

const MenuCardMeta = styled(Card.Meta)`
  &&& {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

const Footer = styled(Segment)`
  &&& {
    background-color: #767676 !important;
    padding: 1em;
  }
`;

const FooterContainer = styled(Container)`
  &&& {
    > * {
      margin-right: 15px;
    }
  }
`;

export default App;
