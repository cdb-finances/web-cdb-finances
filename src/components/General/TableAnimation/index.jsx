import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const variants = ['h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1', 'h1'];

function TypographyDemo(props) {
  const { loading = false } = props;

  return (
    <div>
      {variants.map((variant, index) => (
        <Typography component="div" key={index} variant={variant}>
          {loading ? <Skeleton /> : variant}
        </Typography>
      ))}
    </div>
  );
}

TypographyDemo.propTypes = {
  loading: PropTypes.bool,
};

export default function TableAnimation() {
  return (
    <Grid container spacing={1} style={{ width: "calc(100% - 11rem)", marginTop: "10px" }}>
      <Grid item xs>
        <TypographyDemo loading />
      </Grid>
    </Grid>
  );
}
