import { Container } from '@mui/material';
import MenuWeb from './Menu/Menu';
import TopBar from './TopBar';

const Header = () => {
	return (
		<div className='header'>
			<TopBar />
			<Container maxWidth='lg'>
				<MenuWeb />
			</Container>
		</div>
	);
};

export default Header;
