import React from 'react';
import firebase from 'firebase/app';
import { Button, Icon, Header } from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';

import { Props } from 'containers/MyPage';

const MyPage: React.FC<Props> = props => {
  const signInWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    provider.setCustomParameters({ force_login: true });

    const { currentUser } = firebase.auth();
    if (currentUser) {
      currentUser
        .linkWithPopup(provider)
        .then(function(result) {
          console.log(result);
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
  return (
    <>
      <Header>MyPage</Header>
      <Button color='twitter' onClick={signInWithTwitter}>
        <Icon name='twitter' /> Sign in with Twitter
      </Button>
    </>
  );
};

export default MyPage;
