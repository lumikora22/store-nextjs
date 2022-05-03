import Pagination from '@mui/material/Pagination';
import React from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

function Paginations({ totalProductos, page, limitPerPage }) {
	const totalPages = Math.ceil(totalProductos / limitPerPage);
	const router = useRouter();
	const urlParse = queryString.parseUrl(router.asPath);

	const handleChange = (event, page) => {
		urlParse.query.page = page;
		const url = queryString.stringifyUrl(urlParse);
		router.push(url);
	};
	return (
		<div className='pagination'>
			<Pagination
				onChange={(event, page) => handleChange(event, page)}
				page={page}
				count={totalPages}
				variant='outlined'
				color='primary'
				shape='rounded'
			/>
		</div>
	);
}

export default Paginations;
