import React, { useEffect, useState } from 'react';

import { Breadcrumbs, Button } from '@mui/material';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { isFavoriteApi , addFavoriteApi, deleteFavoriteApi} from '../../../api/favorite';
import { emphasize, styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useAuth from '../../../hooks/useAuth';
import {size} from 'lodash';
import { toast } from 'react-toastify';
import useCart from '../../../hooks/useCart';


const Headerproduct = ({ product }) => {
	const StyledBreadcrumb = styled(Chip)(({ theme }) => {
		const backgroundColor =
			theme.palette.mode === 'light'
				? theme.palette.grey[100]
				: theme.palette.grey[800];
		return {
			backgroundColor,
			height: theme.spacing(3),
			color: theme.palette.text.primary,
			fontWeight: theme.typography.fontWeightRegular,
			'&:hover, &:focus': {
				backgroundColor: emphasize(backgroundColor, 0.06),
			},
			'&:active': {
				boxShadow: theme.shadows[1],
				backgroundColor: emphasize(backgroundColor, 0.12),
			},
		};
	});

	function handleClick(event) {
		event.preventDefault();
		console.info('You clicked a breadcrumb.');
	}
	return (
		<>
			{product && (
				<div className='header-product'>
					<Breadcrumbs>
						<StyledBreadcrumb
							component='a'
							href='/'
							label='Home'
							icon={<HomeIcon fontSize='small' />}
						/>
						<StyledBreadcrumb
							component='a'
							href={`/articles/${product.platform.url}`}
							label={product.platform.title}
						/>
						{/* <StyledBreadcrumb
							label='Accessories'
							deleteIcon={<ExpandMoreIcon />}
							onDelete={handleClick}
						/> */}
					</Breadcrumbs>
					<div className='product-container'>
						<div className='img-container'>
							<SwiperContain product={product} />
						</div>
						<div className='info-container'>
							<Info product={product} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Headerproduct;

function SwiperContain({ product }) {
	return (
		<div className='img-box'>
			<img src={product.poster.url} alt='' />
			<div className='extra-box'>
				{product.screenshots.map((image) => (
					<img src={image.url} alt='' key={image._id} />
				))}
			</div>
		</div>
	);
}

function Info({ product }) {
	const [isFavorites, setIsFavorites] = useState(false);
	const [realoadFavorite, setRealoadFavorite] = useState(false);
	const { auth, logout } = useAuth();
	const {addProductCart} = useCart();

	useAuth();
	useEffect(() => {
		(async () => {
			if(auth){
				const response = await isFavoriteApi(auth.idUser, product._id, logout);
			
				if (size(response) > 0) setIsFavorites(true);
				else setIsFavorites(false);
				
			}
			
		})();
		setRealoadFavorite(false);
	}, [product, realoadFavorite]);

	const addFavorite = async() => {
		if(isFavorites){
			if(auth){
				const response = await deleteFavoriteApi(auth.idUser, product._id, logout);
				setRealoadFavorite(true);
			}
		}else{
			if(auth){
				const response = await addFavoriteApi(auth.idUser, product.id, logout);
				setRealoadFavorite(true);
				toast.success('Producto agregado a favoritos');
			}else{
				toast.warning('Debes iniciar sesión')
			}
		}
		
	}
	return (
		<div className='info-box'>
			<h1>{product.title}</h1>

			<p>{product.summary}</p>
			<div className='price-container'>
				<p className='desacount'>
					{product.price.toLocaleString('es-MX', {
						style: 'currency',
						currency: 'MXN',
						minimumFractionDigits: 2,
					})}
				</p>
				<p className='price'>
					{' '}
					{product.price.toLocaleString('es-MX', {
						style: 'currency',
						currency: 'MXN',
						minimumFractionDigits: 2,
					})}
				</p>
			</div>

			<Button variant='contained' className='btn-buy'>
				Comprar ahora
			</Button>
			<Button variant='outlined' className='btn-basket' onClick={()=>addProductCart(product.url)}>
				Agregar al carrito
			</Button>
			<Button className='btn-favorite' onClick={addFavorite}>
			{isFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
			</Button>

			<p className='extra-data'>Publicado: {product.releaseDate}</p>
		</div>
	);
}
