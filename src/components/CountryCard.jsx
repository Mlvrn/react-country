import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CountryCard = ({ data, style }) => {
  const navigate = useNavigate();

  const handleCardClick = (country) => {
    navigate(`/details/${country?.cca3}`, { state: country });
  };

  return (
    <>
      {data.map((country, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card className={style.card} onClick={() => handleCardClick(country)}>
            <CardMedia
              image={country?.flags.png}
              component="img"
              alt="Country flag"
              height="150"
            />
            <CardContent>
              <Typography variant="h5" component="h5">
                {country?.name.common}
              </Typography>
              <p>
                <Typography
                  variant="body1"
                  component="span"
                  className={style.info}
                >
                  Population:{' '}
                </Typography>
                <Typography variant="body1" component="span">
                  {country?.population.toLocaleString()}
                </Typography>
              </p>
              <p>
                <Typography
                  variant="body1"
                  component="span"
                  className={style.info}
                >
                  Region:{' '}
                </Typography>
                <Typography variant="body1" component="span">
                  {country?.region}
                </Typography>
              </p>
              <p>
                <Typography
                  variant="body1"
                  component="span"
                  className={style.info}
                >
                  Capital:{' '}
                </Typography>
                <Typography variant="body1" component="span">
                  {country?.capital}
                </Typography>
              </p>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default CountryCard;
