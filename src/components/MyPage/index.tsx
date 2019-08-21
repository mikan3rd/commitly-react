import React from 'react';
import firebase from 'firebase/app';
import { Button, Icon, Header, Segment, Label } from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';
import styled from 'styled-components';

import { Props } from 'containers/MyPage';

const TwitterProviderId = 'twitter.com';

const MyPage: React.FC<Props> = props => {
  const signInWithTwitter = () => {
    const { chengeAuthChecked, updateTwitterUser } = props;
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

  const unlinkTwitter = () => {
    const { chengeAuthChecked, deleteTwitterUser } = props;
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

  const {
    appState: { loginUser },
  } = props;

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
          <Icon name='twitter' />
          <Header.Content>Twitter連携</Header.Content>
        </Header>

        {twitterUserData ? (
          <>
            <Label
              as='a'
              image
              size='big'
              href={`https://twitter.com/${loginUser.twitter_screen_name}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={twitterUserData.photoURL || undefined} alt={twitterUserData.displayName || undefined} />@
              {loginUser.twitter_screen_name}
            </Label>
            <Text>解除するとTwitter関連のサービスが使用できなくなります</Text>
            <Button color='red' size='tiny' onClick={unlinkTwitter}>
              <Icon name='twitter' /> Cancel Twitter Connect
            </Button>
          </>
        ) : (
          <>
            <p>サービスの利用にはTwitter連携が必要です</p>
            <Button color='twitter' onClick={signInWithTwitter}>
              <Icon name='twitter' /> Sign in with Twitter
            </Button>
          </>
        )}
      </Segment>
    </>
  );
};

const Text = styled.p`
  margin-top: 1em;
`;

export default MyPage;
