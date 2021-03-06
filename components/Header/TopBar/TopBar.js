import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const TopBar = () => {
	return (
		<div className='top-bar'>
			<div className='logo'>
				<Logo />
			</div>
			<div className='buscador'>
				<SearchInput />
			</div>
		</div>
	);
};

function Logo() {
	return (
		<Link href='/'>
			<a className='img-logo-container'>
				<img src='/image.png' />
			</a>
		</Link>
	);
}

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
})); 

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

function SearchInput() {
	const [searchStr, setSearchStr] = useState('');
	const [load, setLoad] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (load) {
			router.push(`/search?query=${searchStr}`);
		}
		setLoad(true);
	}, [searchStr]);

	
	
	
	return (
		<Search>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder='Search…'
				inputProps={{
					'aria-label': 'search',
					// 'value': router.query.query || '',
					onChange: (event) => {
						console.log(event.target.value)
						setSearchStr(event.target.value)
					},
					'id': 'search-input',
				}}
			/>
		</Search>
	);
}

export default TopBar;
