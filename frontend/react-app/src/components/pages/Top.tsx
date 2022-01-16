import React from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  alignCenter: {
    textAlign: 'center',
  },
}));

const Top = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item md={12} className={classes.alignCenter}>
        <h1>
          ようこそ<strong>Musicommend</strong>へ！
        </h1>
      </Grid>
      <Grid item md={12} className={classes.alignCenter}>
        <p>
          <strong>Musicommend</strong>では聞いた曲の印象を投稿することで
        </p>
        <p>初めてその曲を聞いた時の印象を記録することができます。</p>
      </Grid>
    </>
  );
};

export default Top;
