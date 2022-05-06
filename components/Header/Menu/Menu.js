import { Box, Button, createTheme, Stack } from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { useState, useEffect } from 'react';
import { getMeApi } from '../../../api/user';
import { getPlatformApi } from '../../../api/platform';
import BasicModal from '../../Modal/BasicModal/BasicModal';
import Auth from '../../Auth/Auth';
import useAuth from '../../../hooks/useAuth';
import Link from 'next/link';
import { map } from 'lodash';
import useCart from '../../../hooks/useCart';

import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const MenuWeb = () => {
	const [platforms, setPlatforms] = useState([]);
	const [open, setOpen] = useState(false);
	const [titleModal, setTitleModal] = useState('Iniciar Sesión');
	const [user, setUser] = useState(undefined);

	const { logout, auth } = useAuth();

	useEffect(() => {
		(async () => {
			const user = await getMeApi(logout);
			setUser(user);
		})();
	}, [auth]);

	useEffect(() => {
		(async () => {
			const platforms = await getPlatformApi();
			setPlatforms(platforms);
		})();
	}, []);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const theme = createTheme({
		status: {
			danger: '#e53e3e',
		},
		palette: {
			primary: {
				main: '#0971f1',
				darker: '#053e85',
			},
			neutral: {
				main: '#fff',
				contrastText: '#fff',
			},
		},
	});
	return (
		<div className='menu'>
			<div className='menu-plataforma'>
				<MenuPlataforma platforms={platforms} />
			</div>
			<div className='menu-usuario'>
				{user !== undefined && (
					<MenuUsuario
						showModal={handleClickOpen}
						user={user}
						logout={logout}
					/>
				)}
			</div>
			<BasicModal open={open} handleClose={handleClose} title={titleModal}>
				<Auth handleClose={handleClose} setTitleModal={setTitleModal} />
			</BasicModal>
		</div>
	);
};

const preventDefault = (event) => event.preventDefault();

function MenuPlataforma({ platforms }) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				color: 'white',
				justifyContent: 'center',
				typography: 'body1',
				'& > :not(style) + :not(style)': {
					ml: 2,
				},
			}}
			className='box-links'
			onClick={preventDefault}>
			{map(platforms, (platform) => (
				<Link
					href={`/articles/${platform.url}`}
					key={platform._id}
					underline='none'>
					<a>{platform.title}</a>
				</Link>
			))}
		</Box>
	);
}

function MenuUsuario({ showModal, user, logout }) {
	const { productsCart } = useCart();

	return (
		<div className='menu-user-container'>
			{user ? (
				<>
					<Link href='/orders'>
						<a>
							<LocalShippingIcon />
							Mis Pedidos
						</a>
					</Link>
					<Link href='/wishlist'>
						<a>
							<FavoriteBorderIcon />
							Wishlist
						</a>
					</Link>
					<Link href='/account'>
						<a>
							<PersonIcon />
							{user.name} {user.lastname}
						</a>
					</Link>
					<Link href='/cart'>
						<a>
							<Badge color='secondary' badgeContent={productsCart}>
								<ShoppingCartIcon />
							</Badge>
						</a>
					</Link>
					<LogoutIcon onClick={logout} />
				</>
			) : (
				<div onClick={showModal} className='login-button'>
					<AccountCircleOutlinedIcon />
					<p>Mi Cuenta</p>
				</div>
			)}
		</div>
	);
}

export default MenuWeb;
