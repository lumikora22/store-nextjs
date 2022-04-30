import {
	Button,
	Card,
	CardActions,
	CardMedia,
	Typography,
} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { map } from 'lodash';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

const ListCameras = ({ cameras }) => {
	console.log(cameras);
	return (
		<div className='cameras'>
			<h2>Cámaras</h2>
			<hr />
			<div className='list-cameras'>
				{map(cameras, (camera) => (
					<Camera camera={camera} />
				))}
			</div>
		</div>
	);
};

function Camera({ camera }) {
	console.log(camera);
	return (
		<Card sx={{ maxWidth: 345, maxHeight: 510, m:1 }}>
			<CardMedia
				component='img'
				height='40%'
				image={camera.poster.url}
				alt={camera.title}
			/>
			<CardContent sx={{ height: 200 }}>
				<Typography gutterBottom variant='h5' component='div'>
					{camera.title}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{camera.summary}
          ${camera.price}
				</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: 'space-around' }}>
				<Button size='small' variant='contained'>
					Agregar <LocalGroceryStoreIcon />
				</Button>
				<Button size='small'>Ver más</Button>
				<Button size='small'>
					<FavoriteBorderIcon />
				</Button>
			</CardActions>
		</Card>
	);
}

export default ListCameras;
