import { Button } from '@mui/material';
import { map } from 'lodash';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Link from 'next/link';
import useCart from '../../hooks/useCart';

const ListProductos = ({ productos, currentPlatform }) => {
	return (
		<div className='cameras'>
			{currentPlatform ? <h2>{currentPlatform[0].title}</h2> : null}
			<hr />
			<div className='list-cameras'>
				{map(productos, (producto) => (
					<div className='camera-item' key={producto.id}>
						<Producto producto={producto} />
					</div>
				))}
			</div>
		</div>
	);
};

function Producto({ producto }) {
	const {addProductCart} = useCart();
	return (
		<div className='camera-card'>
			<div className='img-camera-card'>
				<img src={producto.poster.url} alt='' />
			</div>
			<div className='content-camera-card'>
				<h3>{producto.title}</h3>
				<p>{producto.summary}</p>
			</div>
			<div className='price-container'>
				<p>
					{producto.price.toLocaleString('es-MX', {
						style: 'currency',
						currency: 'MXN',
						minimumFractionDigits: 2,
					})}
				</p>
				<p>
					{producto.price.toLocaleString('es-MX', {
						style: 'currency',
						currency: 'MXN',
						minimumFractionDigits: 2,
					})}
				</p>
			</div>
			<div className='actions-card'>
				<Button
					size='small'
					variant='contained'
					onClick={()=>addProductCart(producto.url)}>
					Agregar <LocalGroceryStoreIcon />
				</Button>
				<Link href={`/${producto.url}`}>
					<a className='link-more'>
						<Button size='small'>Ver más</Button>
					</a>
				</Link>

				{/* 
        <Button size="small">
          <FavoriteBorderIcon />
        </Button> */}
			</div>
		</div>
	);
}

export default ListProductos;
