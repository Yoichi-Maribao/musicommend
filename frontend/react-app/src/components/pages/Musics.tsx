import { Music } from 'interfaces';
import client from 'lib/api/client';
import React, { useEffect, useState } from 'react';

const Musics: React.FC = () => {
  const [musics, setMusics] = useState<Music[]>([]);
  const getMusics = async () => {
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
                <td>{val.name}</td>
                <td>{val.body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Musics;
