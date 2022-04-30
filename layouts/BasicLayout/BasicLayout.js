import Container from '@mui/material/Container';
import Header from '../../components/Header';
import classNames from 'classnames';

const BasicLayout = ({ children, className }) => {
	const test = true;
	return (
		<div className={classNames('basic-layout',{
			[className]: className
		})}>
			<Header />
			<Container maxWidth='lg' className='content'>
				{children}
			</Container>
		</div>
	);
};

export default BasicLayout;
