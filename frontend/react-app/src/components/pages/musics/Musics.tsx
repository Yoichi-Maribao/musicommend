import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from 'App';
import { Link } from 'react-router-dom';
import {
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Music } from 'interfaces';
import Sidebar from 'components/layouts/Sidebar';
import client from 'lib/api/client';

const Musics: React.FC = () => {
  const [musics, setMusics] = useState<Music[]>([]);
  const { currentUser } = useContext(AuthContext);

  const getMusics = () => {
    client
      .get('musics')
      .then((res) => {
        setMusics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMusics();
  }, []);

  return (
    <>
      <Sidebar user={currentUser!} />
      <Grid item md={8}>
        <h1>Musics</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>タイトル</TableCell>
                <TableCell>本文</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {musics.map((val, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell>
                      <Link to={`/musics/${val.id}`}>{val.title}</Link>
                    </TableCell>
                    <TableCell>{val.body}</TableCell>
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

export default Musics;
