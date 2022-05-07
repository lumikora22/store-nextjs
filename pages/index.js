import BasicLayout from '../layouts/BasicLayout';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useEffect, useState } from 'react';
import { getPlatformApi } from '../api/platform';
import { map } from 'lodash';
import Link from 'next/link';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MenuIcon from '@mui/icons-material/Menu';
import ListProductos from '../components/ListProductos/ListProductos';
import { getProdcutApi } from '../api/productos';

export default function Home() {
	const [platforms, setPlatforms] = useState(null);
	const [products, setProducts] = useState(null);

	useEffect(() => {
		(async () => {
			const platforms = await getPlatformApi();
			setPlatforms(platforms);
			const products = await getProdcutApi(10);
			console.log(products);
			setProducts(products);
		})();
	}, []);
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,

		autoplay: true,
		variableWidth: true,
	};
	return (
		<BasicLayout>
			<div className='main-page'>
				<Box sx={{ width: '100%', maxWidth: 290, bgcolor: 'background.paper' }}>
					<nav aria-label='main mailbox folders'>
						<List>
							<ListItem
								disablePadding
								sx={{ background: '#363636', color: 'white' }}>
								<ListItemButton>
									<ListItemIcon>
										<MenuIcon sx={{ background: '#363636', color: 'white' }} />
									</ListItemIcon>
									<ListItemText primary='Categorias' />
								</ListItemButton>
							</ListItem>
							{map(platforms, (platform) => (
								<Link
									href={`/articles/${platform.url}`}
									key={platform._id}
									underline='none'>
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemIcon>
												<LocalOfferIcon />
											</ListItemIcon>
											<ListItemText primary={platform.title} />
										</ListItemButton>
									</ListItem>
								</Link>
							))}
						</List>
					</nav>
					<Divider />
					<nav aria-label='secondary mailbox folders'>
						<List>
							<ListItem disablePadding>
								<ListItemButton component='a' href='/wishlist'>
									<ListItemText primary='Wishlist' />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton component='a' href='/account'>
									<ListItemText primary='Perfil' />
								</ListItemButton>
							</ListItem>
						</List>
					</nav>
					<Divider />
					<br />
					<br />
					<div className='img-container'>
						<img
							src='https://thrstore.s3.amazonaws.com/1_8b741157f2.png'
							alt=''
						/>
					</div>
					<Divider />
					<br />
					<br />
					<div className='img-container'>
						<img
							src='https://thrstore.s3.us-east-2.amazonaws.com/9_df6351c142.jpg'
							alt=''
						/>
					</div>
					<Divider />
					<br />
					<br />
					<div className='img-container'>
						<img
							src='https://thrstore.s3.us-east-2.amazonaws.com/4_0f22721c01.jpg'
							alt=''
						/>
					</div>
					<Divider />
					<br />
					<br />
					<div className='img-container'>
						<img
							src='https://thrstore.s3.us-east-2.amazonaws.com/i_211da8dbdd.jpg'
							alt=''
						/>
					</div>
					<Divider />
					<br />
					<br />
					<div className='img-container'>
						<img
							src='https://thrstore.s3.us-east-2.amazonaws.com/4_0f22721c01.jpg'
							alt=''
						/>
					</div>
				</Box>
				<div className='poster-container'>
					<div className='poster-container-img'>
						<img
							src='https://thrstore.s3.us-east-2.amazonaws.com/3_bc1d1fbdc7.jpg'
							alt=''
						/>
					</div>
					<div className='products-list'>
						<ListProductos productos={products} />
					</div>
				</div>
				{/* <Slider {...settings} className='slider-contain'>
					<div>
						<img src='https://thrstore.s3.us-east-2.amazonaws.com/camara2_024fa9096a.jpg' />
					</div>
					<div>
						<img src='https://thrstore.s3.us-east-2.amazonaws.com/gamer1_c041e49de4.jpg' />
					</div>
					<div>
						<img src='https://thrstore.s3.us-east-2.amazonaws.com/laptop2_fdb248bed5.jpg' />
					</div>
					<div>
						<img src='https://thrstore.s3.us-east-2.amazonaws.com/276142776_1299802363861832_5248237789331440514_n_632c5d2536.jpg' />
					</div>
				</Slider> */}
			</div>
		</BasicLayout>
	);
}
