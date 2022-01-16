import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [musics, setMusics] = useState<Music[]>([]);
  const getMusics = async () => {
    client
      .get('musics')
      .then((res) => {
        setMusics(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          navigate('/signin');
        }
      });
  };

  useEffect(() => {
    getMusics();
  }, []);

  return (
    <>
      <Sidebar />
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
