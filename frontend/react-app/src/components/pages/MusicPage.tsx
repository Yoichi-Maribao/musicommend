import Sidebar from 'components/layouts/Sidebar';
import { useParams, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import client from 'lib/api/client';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const MusicPage: React.FC = () => {
  const params = useParams<{ id: string }>();

  const initialState = {
    id: null,
    user_id: null,
    body: '',
    title: '',
  };

  const [music, setMusic] = useState(initialState);

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
                  <Link to={`/musics/${params.id}/edit`}>編集</Link>
                </TableCell>
                <TableCell>削除</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default MusicPage;
