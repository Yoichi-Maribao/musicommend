import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import client from 'lib/api/client';
import { Music, User } from 'interfaces/index';

import Sidebar from 'components/layouts/Sidebar';

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const UserPage: React.FC = () => {
  const params = useParams();
  const initialState: User = {
    id: null,
    uid: '',
    provider: '',
    email: '',
    name: '',
    introduction: '',
    image: '',
    allowPasswordChange: true,
    created_at: null,
    updated_at: null,
  };

  const [user, setUser] = useState(initialState);
  const [musics, setMusics] = useState<Music[]>([]);

  const fetchMusicsAndUser = () => {
    client
      .get(`/users/${params.id}`)
      .then((res) => {
        console.log(res.data.musics);
        setMusics(res.data.musics);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    fetchMusicsAndUser();
  }, []);

  return (
    <>
      <Sidebar user={user} />
      <Grid item md={8}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>タイトル</TableCell>
                <TableCell>本文</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {musics.map((music, key) => {
                return (
                  <TableRow
                    key={key}
                    component={Link}
                    to={`/musics/${music.id}`}
                    hover={true}
                  >
                    <TableCell>{music.title}</TableCell>
                    <TableCell>{music.body}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default UserPage;
