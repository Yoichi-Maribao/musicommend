import React, { useContext, useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
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
import ProfileImage from '../../layouts/ProfileImage';
import NoImage from 'images/no_image.jpg';
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

interface Image {
  data: string | ArrayBuffer | null;
  filename: string;
}

const EditUser: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const params = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [image, setImage] = useState<Image>({ data: '', filename: '' });
  const [previewImageUrl, setPreviewImageUrl] = useState<string>(NoImage);
  const apiUrl = 'http://localhost:3001';

  const fetchUser = async (id: string) => {
    client
      .get(`/users/${id}/edit`)
      .then((res) => {
        setName(res.data.user.name);
        setIntroduction(res.data.user.introduction);
        if (res.data.image) {
          setImage(res.data.image);
          setPreviewImageUrl(apiUrl + res.data.image);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      user: {
        name: name,
        introduction: introduction,
        image: image,
      },
    };

    console.log(`Updating with following data: ${data}`);
    try {
      const res = await client.patch(`/users/${params.id}`, data);
      if (res.status === 200) {
        console.log('Successfully updated User!');
        navigate(`/users/${params.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const processImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const imageFile = event.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);

      const reader = new FileReader();

      reader.onload = () => {
        setImage({
          data: reader.result,
          filename: imageFile ? imageFile.name : 'unknownfile',
        });
      };
      reader.readAsDataURL(imageFile);
      setPreviewImageUrl(imageUrl);
    }
  };

  useEffect(() => {
    fetchUser(params.id!);
    console.log(name);
  }, []);

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
            <CardContent style={{ textAlign: 'center' }}>
              {/* <CardMedia
                component="img"
                image={previewImageUrl}
                alt="プロフィール画像"
                sx={{ width: 100, margin: 'auto' }}
              /> */}
              <ProfileImage image={previewImageUrl} />
              <UploadButton
                name="image"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  processImage(event)
                }
              >
                プロフィール画像
              </UploadButton>
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
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="success"
                disabled={!name ? true : false}
                onClick={updateUser}
              >
                更新
              </Button>
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
