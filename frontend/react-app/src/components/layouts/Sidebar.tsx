import React, { useContext, useState } from 'react';
import { AuthContext } from 'App';
import { User } from 'interfaces/index';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardHeader } from '@mui/material';
import { TextField, Button } from '@mui/material';
import { makeStyles, Theme } from '@material-ui/core/styles';
// import client from 'lib/api/client';
import axios from 'axios';
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

const Sidebar: React.FC = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [user, setUser] = useState<User[]>([]);
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let params: PostMusic = {
      title: title,
      body: body,
    };

    try {
      const res = await axios.post(
        'http://localhost:3001/api/v1/musics/',
        params
      );
      console.log(res);

      if (res.status === 200) {
        //ここに遷移先を書く
        navigate('musics');
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
              label="Title"
              value={title}
              margin="dense"
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Body"
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
              onClick={() => handleSubmit}
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
