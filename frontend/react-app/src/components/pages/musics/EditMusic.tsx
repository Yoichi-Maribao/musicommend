import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from '@mui/material';
import { makeStyles, Theme } from '@material-ui/core/styles';

import client from 'lib/api/client';

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

const EditMusic: React.FC = () => {
  const classes = useStyles();
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const fetchMusic = (id: string) => {
    client
      .get(`/musics/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setBody(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateMusic = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let data = {
      title: title,
      body: body,
    };

    try {
      const res = await client.patch(`/musics/${params.id}`, data);
      if (res.status === 200) {
        console.log('Successfully updated Music!');
        navigate(`/musics/${params.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMusic(params.id!);
  }, []);
  return (
    <>
      <form noValidate autoComplete="off">
        <Card>
          <CardHeader className={classes.alignCenter} title="投稿編集" />
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
              onClick={updateMusic}
            >
              更新する
            </Button>
          </CardContent>
        </Card>
      </form>
    </>
  );
};

export default EditMusic;
