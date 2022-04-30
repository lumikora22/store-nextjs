import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState, useEffect } from 'react';
import { getAddressesApi, deleteAddressApi } from '../../../api/adress';
import useAuth from '../../../hooks/useAuth';
import { map, size } from 'lodash';

const Listaddress = ({ reloadAddresses, setReloadAddresses, openModal }) => {
	const [addresses, setAddresses] = useState(null);
	const { auth, logout } = useAuth();

	useEffect(() => {
		(async () => {
			const response = await getAddressesApi(auth.idUser, logout);

			setAddresses(response);
			setReloadAddresses(false);
		})();
	}, [reloadAddresses]);

	if (!addresses) return null;

	return (
		<div className='list-address'>
			{size(addresses) === 0 ? (
				<h3>No hay direcciones creadas</h3>
			) : (
				<Grid container>
					{map(addresses, (address, __index) => (
						<Grid key={__index} item sx={{ width: 0.3, p: 2, m: 1 }}>
							<Address
								address={address}
								logout={logout}
								setReloadAddresses={setReloadAddresses}
								openModal={openModal}
							/>
						</Grid>
					))}
				</Grid>
			)}
		</div>
	);
};

function Address({ address, logout, setReloadAddresses, openModal }) {
	const [loading, setLoading] = useState(false);

	const deleteAddress = async () => {
		setLoading(true);
		const response = await deleteAddressApi(address.id, logout);
		if (response) setReloadAddresses(true);
		setLoading(false);
	};

	return (
		<div className='address'>
			<p>{address.title}</p>
			<p>{address.name}</p>
			<p>{address.adress}</p>
			<p>
				{address.state}, {address.city} {address.postalCode}
			</p>
			<p>{address.phone}</p>

			<div className='actions'>
				<LoadingButton
					variant='contained'
					onClick={() => openModal(`Editar: ${address.title}`, address)}>
					Editar
				</LoadingButton>
				<LoadingButton
					loading={loading}
					variant='outlined'
					onClick={deleteAddress}>
					Eliminar
				</LoadingButton>
			</div>
		</div>
	);
}
export default Listaddress;
