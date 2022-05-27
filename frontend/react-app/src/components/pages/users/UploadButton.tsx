import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    display: 'none',
  },
}));

type Props = {
  name: string;
  onChange: any;
  children: React.ReactNode;
};

export const UploadButton: React.VFC<Props> = (props) => {
  const classes = useStyles();
  const { name, onChange } = props;
  return (
    <label htmlFor={`upload-button-${name}`}>
      <input
        type="file"
        accept="image/*"
        className={classes.input}
        id={`upload-button-${name}`}
        name={name}
        multiple
        onChange={onChange}
      />
      <Button
        variant="contained"
        component="span"
        {...props}
        sx={{ margin: 2 }}
      >
        {props.children}
      </Button>
    </label>
  );
};

export default UploadButton;
