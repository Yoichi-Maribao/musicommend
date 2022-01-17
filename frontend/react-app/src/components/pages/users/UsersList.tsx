import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from 'App';
import { Link } from 'react-router-dom';

import Sidebar from 'components/layouts/Sidebar';
import NoImage from 'images/no_image.jpg';
import { makeStyles, Theme } from '@material-ui/core/styles';
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
import client from 'lib/api/client';
import { User } from 'interfaces';

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    boxShadow: '0 1px 1px 0 rgba(0,0,0,0.5)',
  },
}));

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();

  const fetchUsers = () => {
    client
      .get('/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, [setUsers]);
  return (
    <>
      <Sidebar user={currentUser!} />
      <Grid item md={8}>
        <h1>Users</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>ユーザー名</TableCell>
                <TableCell>自己紹介文</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, key) => {
                return (
                  <TableRow
                    key={key}
                    component={Link}
                    to={`/users/${user.id}`}
                    hover={true}
                  >
                    <TableCell>
                      <img
                        src={user.image ? user.image : NoImage}
                        alt="プロフィール画像"
                        className={classes.image}
                      />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      {user.introduction
                        ? user.introduction
                        : '自己紹介文が登録されていません'}
                    </TableCell>
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

export default UsersList;
