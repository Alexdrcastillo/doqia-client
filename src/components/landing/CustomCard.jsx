import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function CustomCard({ description, image }) {
  return (
    <Card sx={{ maxWidth: 265, height: "320px", backgroundColor: "#F6F6F6", color: "#45586E", margin: "5vh", zIndex: "1"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="260"
          image={image}
        />  
        <CardContent>
          <Typography variant="body2">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
