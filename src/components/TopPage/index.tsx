import React from 'react';
import { Image, Button, Icon, Header, Grid, Segment, Label } from 'semantic-ui-react';
import firebase from 'firebase/app';
import { toast } from 'react-semantic-toasts';
import styled from 'styled-components';

import { Props } from 'containers/TopPage';
import { path } from 'routes';
import logo from 'images/logo.png';

class TopPage extends React.Component<Props> {
  componentDidMount() {
    // @ts-ignore
    window.twttr.ready(function(twttr) {
      twttr.widgets.load();
    });
  }

  signInWithGitHub = () => {
    const { history } = this.props;
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
        history.push(path.mypage);
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

  render() {
    return (
      <>
        <Segment vertical>
          <Image src={logo} />
        </Segment>

        <Segment vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width='8'>
                <Header>あなたのコミットを共有しませんか？</Header>
                <p>Commitlyはあなたの書いたコードをプログラミング言語別に集計してシェアするためのサービスです</p>
              </Grid.Column>
              <Grid.Column width='8'>
                <a
                  className='twitter-timeline'
                  data-height='400'
                  href='https://twitter.com/commitly_jp'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Tweets by commitly_jp
                </a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment vertical textAlign='center' padded='very'>
          <Header>あなたのコミットもシェアしてみませんか？</Header>

          <AlignMiddle>
            <Button color='black' onClick={this.signInWithGitHub}>
              <Icon name='github' /> Sign in with GitHub
            </Button>
            <Label pointing='left' size='big' color='blue'>
              Join Now!!
            </Label>
          </AlignMiddle>
        </Segment>
      </>
    );
  }
}

const AlignMiddle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default TopPage;
