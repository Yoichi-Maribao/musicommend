import React, { useContext, useState } from 'react';
import { AuthContext } from 'App';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardHeader } from '@mui/material';
import { TextField, Button } from '@mui/material';
import { makeStyles, Theme } from '@material-ui/core/styles';
import client from 'lib/api/client';
import { PostMusic } from 'interfaces/index';

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: 'none',
  },
  alignCenter: {
    textAlign: 'center',
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

    let params = {
      user_id: currentUser?.id,
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
    <Grid item md={4} justifyContent="center">
      <div className="userInfo">
        <span>{currentUser?.name}</span>
      </div>
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
