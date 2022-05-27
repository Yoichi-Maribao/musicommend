import { makeStyles } from '@material-ui/core/styles';
import NoImage from 'images/no_image.jpg';

const useStyles = makeStyles(() => ({
  image: {
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    boxShadow: '0 1px 1px 0 rgba(0,0,0,0.5)',
  },
}));

const ProfileImage = ({ image }: { image?: string }) => {
  const classes = useStyles();
  return (
    <div>
      <img src={image} alt="プロフィール画像" className={classes.image} />
    </div>
  );
};

export default ProfileImage;
