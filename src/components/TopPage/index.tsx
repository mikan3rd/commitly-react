import React from 'react';
import { Image, Button, Icon, Header, Grid } from 'semantic-ui-react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { toast } from 'react-semantic-toasts';

import { Props } from '../../containers/TopPage';
import { path } from '../../routes';

import logo from '../App/logo.png';

const TopPage: React.FC<Props> = props => {
  const signInWithGitHub = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('user');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        console.log(result);
        toast({
          type: 'success',
          icon: 'github',
          title: 'GitHub連携に成功しました！',
          time: 4000,
        });
        props.history.push(path.mypage);
      })
      .catch(function(error) {
        console.error(error);
        toast({
          type: 'error',
          icon: 'github',
          title: 'GitHub連携に失敗しました...',
          description: error.message,
          time: 8000,
        });
      });
  };

  return (
    <>
      <Image src={logo} />

      <Grid container verticalAlign='middle'>
        <Grid.Row stretched>
          <Grid.Column width='8'>
            <Header>あなたのコミットを共有しませんか？</Header>
            <p>Commitlyはあなたの書いたコードをプログラミング言語別に集計して共有するためのサービスです</p>
          </Grid.Column>
          <Grid.Column width='8'>
            <a className='twitter-timeline' data-height='400' href='https://twitter.com/commitly_jp'>
              Tweets by commitly_jp
            </a>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Button color='black' onClick={signInWithGitHub}>
        <Icon name='github' /> Sign in with GitHub
      </Button>
    </>
  );
};

export default TopPage;