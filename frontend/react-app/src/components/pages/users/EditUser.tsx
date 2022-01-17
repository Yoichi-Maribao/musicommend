import React, { useContext, useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { AuthContext } from 'App';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  TextField,
} from '@mui/material';
import { makeStyles, Theme } from '@material-ui/core/styles';
import UploadButton from './UploadButton';

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
  width: {
    width: '60px',
  },
}));

const EditUser: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const params = useParams();
  const classes = useStyles();
  const [name, setName] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [image, setImage] = useState<object>({});
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');

  const fetchUser = (id: string) => {
    client
      .get(`/users/${id}/edit`)
      .then((res) => {
        setName(res.data.name);
        setIntroduction(res.data.introduction);
        setImage(res.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const processImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const imageFile = event.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setPreviewImageUrl(imageUrl);

      const { name, files } = event.target;
      setImage({ ...image, [name]: files[0] });
      event.target.value = '';
    }
  };

  useEffect(() => {
    fetchUser(params.id!);
  }, [params.id]);

  if (
    currentUser !== null &&
    currentUser !== undefined &&
    currentUser.id! === Number(params.id)
  ) {
    return (
      <>
        <form noValidate autoComplete="off">
          <Card>
            <CardHeader
              className={classes.alignCenter}
              title="アカウント情報変更"
            />
            <CardContent>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="ユーザー名"
                value={name}
                margin="dense"
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                label="自己紹介文"
                value={introduction}
                margin="dense"
                onChange={(event) => setIntroduction(event.target.value)}
              />
              <UploadButton
                name="image"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  processImage(event)
                }
              >
                プロフィール画像
              </UploadButton>
              {image && (
                <CardMedia
                  component="img"
                  image={previewImageUrl}
                  alt="プロフィール画像"
                  sx={{ width: 60 }}
                />
              )}
            </CardContent>
          </Card>
        </form>
      </>
    );
  } else {
    return <Navigate to={`/users/${currentUser!.id}`} />;
  }
};

export default EditUser;
