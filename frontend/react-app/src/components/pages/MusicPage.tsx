import Sidebar from 'components/layouts/Sidebar';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import client from 'lib/api/client';
import { Grid } from '@mui/material';

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
        <table>
          <thead>
            <tr>
              <th>タイトル</th>
              <th>本文</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{music.title}</td>
              <td>{music.body}</td>
            </tr>
          </tbody>
        </table>
      </Grid>
    </>
  );
};

export default MusicPage;
