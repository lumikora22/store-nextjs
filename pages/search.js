import BasicLayout from '../layouts/BasicLayout';
import { useState, useEffect } from 'react';

const Search = () => {
	useEffect(() => {
		document.getElementById('search-input').focus();
	}, []);
	return (
		<BasicLayout className='search'>
			<h1>Seach</h1>
		</BasicLayout>
	);
};

export default Search;
