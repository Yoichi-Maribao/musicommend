import React, { useContext, useState } from 'react';
import { AuthContext } from 'App';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardHeader, Paper } from '@mui/material';
import { TextField, Button } from '@mui/material';
import { makeStyles, Theme } from '@material-ui/core/styles';
import client from 'lib/api/client';
import { PostMusic } from 'interfaces/index';
import NoImage from 'images/no_image.jpg';

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: 'none',
  },
  alignCenter: {
    textAlign: 'center',
  },
  image: {
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    boxShadow: '0 1px 1px 0 rgba(0,0,0,0.5)',
  },
}));

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const { currentUser } = useContext(AuthContext);

  const postMusic = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let params: PostMusic = {
      user_id: currentUser!.id,
      title: title,
      body: body,
    };

    try {
      const res = await client.post(
        'http://localhost:3001/api/v1/musics',
        params
      );
      console.log(res);
      if (res.status === 200) {
        navigate(`/musics/${res.data.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid item md={4}>
      <Paper className={classes.alignCenter}>
        <img src={NoImage} alt="プロフィール画像" className={classes.image} />
        <h3>{currentUser?.name}</h3>
        <p>
          {currentUser?.introduction
            ? currentUser?.introduction
            : '自己紹介文が登録されていません'}
        </p>
      </Paper>
      <form noValidate autoComplete="off">
        <Card>
          <CardHeader className={classes.alignCenter} title="新規投稿" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="タイトル"
              value={title}
              margin="dense"
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="本文"
              value={body}
              margin="dense"
              onChange={(event) => setBody(event.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="success"
              disabled={!title || !body ? true : false}
              className={classes.submitBtn}
              onClick={postMusic}
            >
              投稿する
            </Button>
          </CardContent>
        </Card>
      </form>
    </Grid>
  );
};

export default Sidebar;
