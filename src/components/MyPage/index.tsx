import React from 'react';
import firebase from 'firebase/app';
import { Button, Icon, Header, Segment, Label, List as SemanticList, Accordion } from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';
import styled from 'styled-components';
import { List } from 'immutable';

import { Props } from 'containers/MyPage';

const TwitterProviderId = 'twitter.com';

type State = {
  githubActiveIndexes: List<number>;
};

class MyPage extends React.Component<Props, State> {
  readonly state: State = {
    githubActiveIndexes: List(),
  };

  componentDidMount() {
    // const { updateGithubRepositories } = this.props;
    // updateGithubRepositories();
  }

  signInWithTwitter = () => {
    const { chengeAuthChecked, updateTwitterUser } = this.props;
    const provider = new firebase.auth.TwitterAuthProvider();
    provider.setCustomParameters({ force_login: true });

    const { currentUser } = firebase.auth();
    if (currentUser) {
      currentUser
        .linkWithPopup(provider)
        .then(result => {
          const { additionalUserInfo } = result;
          console.log(additionalUserInfo);
          chengeAuthChecked(false);
          updateTwitterUser(result);
          toast({
            type: 'success',
            icon: 'twitter',
            title: 'Twitter連携に成功しました！',
            time: 4000,
          });
        })
        .catch(error => {
          console.error(error);
          toast({
            type: 'error',
            icon: 'twitter',
            title: 'Twitter連携に失敗しました...',
            description: error.message,
            time: 8000,
          });
        });
    }
  };

  unlinkTwitter = () => {
    const { chengeAuthChecked, deleteTwitterUser } = this.props;
    const { currentUser } = firebase.auth();
    if (currentUser) {
      currentUser
        .unlink(TwitterProviderId)
        .then(function() {
          chengeAuthChecked(false);
          deleteTwitterUser();
          toast({
            type: 'success',
            icon: 'twitter',
            title: 'Twitterの解除に成功しました！',
            time: 4000,
          });
        })
        .catch(function(error) {
          console.error(error);
          toast({
            type: 'error',
            icon: 'twitter',
            title: 'Twitterの解除に失敗しました...',
            description: error.message,
            time: 8000,
          });
        });
    }
  };

  handleClickGithubAccordion = (index: number) => {
    let { githubActiveIndexes } = this.state;
    const targetIndex = githubActiveIndexes.findIndex(i => i === index);
    if (targetIndex > -1) {
      githubActiveIndexes = githubActiveIndexes.delete(targetIndex);
    } else {
      githubActiveIndexes = githubActiveIndexes.push(index);
    }
    this.setState({ githubActiveIndexes });
  };

  render() {
    const {
      appState: {
        loginUser: { twitter_screen_name, installed_repositories },
      },
    } = this.props;

    const { githubActiveIndexes } = this.state;

    let twitterUserData;

    const { currentUser } = firebase.auth();
    if (currentUser) {
      const { providerData } = currentUser;
      twitterUserData = providerData.find(d => d && d.providerId === TwitterProviderId);
    }
    return (
      <>
        <Segment vertical>
          <Header as='h1' size='medium'>
            アカウント設定
          </Header>
        </Segment>

        <Segment vertical>
          <Header as='h2' size='small'>
            <Icon name='github' />
            <Header.Content>GitHub連携</Header.Content>
          </Header>

          {!installed_repositories && <p>連携中のリポジトリがありません</p>}
          <p>
            コミットを計測するには<strong>GitHub App</strong>のインストールが必要です
          </p>
          <Button
            as='a'
            color='black'
            href='https://github.com/apps/commitly'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Icon name='github' /> Go to GitHub App
          </Button>

          <Text>連携中のリポジトリ</Text>
          {installed_repositories &&
            installed_repositories.map((repoGroup: any, index: number) => {
              const { name, repositories } = repoGroup;
              const active = githubActiveIndexes.includes(index);
              return (
                <Accordion key={index} fluid styled exclusive={false}>
                  <Accordion.Title index={index} active={active} onClick={() => this.handleClickGithubAccordion(index)}>
                    <Icon name='dropdown' />
                    {name}
                  </Accordion.Title>
                  <Accordion.Content active={active}>
                    <SemanticList>
                      {repositories.map((repo: any, subIndex: number) => {
                        return (
                          <SemanticList.Item key={subIndex}>
                            <Icon name='github alternate' />
                            <SemanticList.Content>
                              <SemanticList.Header>{repo.name}</SemanticList.Header>
                            </SemanticList.Content>
                          </SemanticList.Item>
                        );
                      })}
                    </SemanticList>
                  </Accordion.Content>
                </Accordion>
              );
            })}
        </Segment>

        <Segment vertical>
          <Header as='h2' size='small'>
            <Icon name='twitter' />
            <Header.Content>Twitter連携</Header.Content>
          </Header>

          {twitterUserData ? (
            <>
              <Label image size='big'>
                <img src={twitterUserData.photoURL || undefined} alt={twitterUserData.displayName || undefined} />@
                {twitter_screen_name}
              </Label>
              <Text>解除するとTwitter関連のサービスが使用できなくなります</Text>
              <Button color='red' size='tiny' onClick={this.unlinkTwitter}>
                <Icon name='twitter' /> Cancel Twitter Connect
              </Button>
            </>
          ) : (
            <>
              <p>サービスの利用にはTwitter連携が必要です</p>
              <Button color='twitter' onClick={this.signInWithTwitter}>
                <Icon name='twitter' /> Sign in with Twitter
              </Button>
            </>
          )}
        </Segment>
      </>
    );
  }
}

const Text = styled.p`
  margin-top: 1em;
`;

export default MyPage;
