import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { getAddressesApi } from '../../../api/adress';
import Link from 'next/link';
import { size } from 'lodash';
import classNames from 'classnames';

function AddressShipping({ setAddress }) {
	const [addresses, setAddresses] = useState(null);
	const [addressSelection, setAddressSelection] = useState(null);
	const { auth, logout } = useAuth();

	useEffect(() => {
		(async () => {
			const response = await getAddressesApi(auth.idUser, logout);
			
			setAddresses(response || []);
		})();
	}, []);
  
	return (
		<div className='address-shipping'>
			<div className='title'>Dirección de envió</div>
			<div className='data'>
				{size(addresses) === 0 ? (
					<h3>
						No tiene direcciones agregadas.
						<Link href='/account'>
							<a>Añadir tu primera dirección.</a>
						</Link>
					</h3>
				) : (
					<div className='addresses-container'>
						<div className='card-address'>
            
							{addresses?.map((address) => (
								<div className='address-item' key={address.id}>
									<Addresses
										address={address}
										setAddressSelection={setAddressSelection}
										addressSelection={addressSelection}
										setAddress={setAddress}
									/>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

function Addresses({
	address,
	setAddressSelection,
	addressSelection,
	setAddress,
}) {
  console.log(address);
	const changeAddress = () => {
		setAddressSelection(address.id);
    setAddress(address);
	};
	return (
		<div className={classNames('address-item-title', { active: addressSelection === address.id })} onClick={changeAddress}>
			<h3>{address?.title}</h3>
			<p>{address?.name}</p>
			<p>{address?.adress}</p>
			<p>
				{address?.city}, {address?.state}
			</p>

			<p>{address?.postalCode}</p>
			<p>{address?.phone}</p>
		</div>
	);
}

export default AddressShipping;
