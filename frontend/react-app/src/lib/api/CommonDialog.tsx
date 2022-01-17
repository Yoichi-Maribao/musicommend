import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';

const CommonDialog: React.FC<{
  msg: any;
  isOpen: any;
  doYes: any;
  doNo: any;
}> = ({ msg, isOpen, doYes, doNo }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  return (
    <div>
      <Dialog
        open={isOpen}
        keepMounted
        onClose={() => doNo()}
        aria-labelledby="common-dialog-title"
        aria-describedby="common-dialog-description"
      >
        <DialogContent>{msg}</DialogContent>
        <DialogActions>
          <Button onClick={() => doYes()} variant="contained">
            はい
          </Button>
          <Button onClick={() => doNo()} variant="outlined">
            いいえ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommonDialog;
