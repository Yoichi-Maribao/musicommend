import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Grid } from '@mui/material';
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
        <table>
          <thead>
            <tr>
              <th>タイトル</th>
              <th>本文</th>
            </tr>
          </thead>
          <tbody>
            {musics.map((val, key) => {
              return (
                <tr key={key}>
                  <td>
                    <Link to={`/musics/${val.id}`}>{val.title}</Link>
                  </td>
                  <td>{val.body}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Grid>
    </>
  );
};

export default Musics;
