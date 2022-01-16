import Sidebar from 'components/layouts/Sidebar';
import { useParams, Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import client from 'lib/api/client';
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import CommonDialog from 'lib/api/CommonDialog';

const MusicPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const initialState = {
    id: null,
    user_id: null,
    body: '',
    title: '',
  };

  const [open, setOpen] = useState<boolean>(false);
  const [music, setMusic] = useState(initialState);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchMusic = (id: string) => {
    client
      .get(`/musics/${id}`)
      .then((res) => {
        setMusic(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const destroyMusic = () => {
    client
      .delete(`/musics/${params.id}`)
      .then((res) => {
        navigate('/musics');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMusic(params.id!);
  }, [params.id]);

  return (
    <>
      <Sidebar />
      <Grid item md={8}>
        <h1>Music</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>タイトル</TableCell>
                <TableCell>本文</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{music.title}</TableCell>
                <TableCell>{music.body}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/musics/${params.id}/edit`}
                    color="success"
                  >
                    編集
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={handleOpen}>
                    削除
                  </Button>
                  <CommonDialog
                    msg={'削除しますか？'}
                    isOpen={open}
                    doYes={destroyMusic}
                    doNo={() => {
                      handleClose();
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default MusicPage;
