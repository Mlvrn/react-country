import { ArrowBack } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ style }) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      className={style.button}
      onClick={() => navigate(-1)}
    >
      <ArrowBack />
      <Typography component="span">Back</Typography>
    </Button>
  );
};

export default BackButton;
