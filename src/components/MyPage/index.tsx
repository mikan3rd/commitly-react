import React from 'react';
import firebase from 'firebase/app';
import { Button, Icon, Header } from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';

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
        .then(function(result) {
          console.log(result);
          chengeAuthChecked(false);
          updateTwitterUser(result);
          toast({
            type: 'success',
            icon: 'twitter',
            title: 'Twitter連携に成功しました！',
            time: 4000,
          });
        })
        .catch(function(error) {
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
    const { chengeAuthChecked } = props;
    const { currentUser } = firebase.auth();
    if (currentUser) {
      currentUser
        .unlink(TwitterProviderId)
        .then(function() {
          chengeAuthChecked(false);
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

  let twitterUserData;
  const { currentUser } = firebase.auth();
  if (currentUser) {
    const { providerData } = currentUser;
    twitterUserData = providerData.find(d => d && d.providerId === TwitterProviderId);
  }
  console.log(twitterUserData);
  return (
    <>
      <Header>MyPage</Header>
      {twitterUserData ? (
        <Button color='twitter' onClick={unlinkTwitter}>
          <Icon name='twitter' /> Twitter Connected
        </Button>
      ) : (
        <Button color='twitter' onClick={signInWithTwitter}>
          <Icon name='twitter' /> Sign in with Twitter
        </Button>
      )}
    </>
  );
};

export default MyPage;
