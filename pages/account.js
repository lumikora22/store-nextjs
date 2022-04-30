import BasicLayout from '../layouts/BasicLayout';
import { useRouter } from 'next/router';
import { getMeApi } from '../api/user';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Changenameform from '../components/Account/ChangeNameForm/ChangeNameForm';
import ChangeEmailForm from '../components/Account/ChangeEmailForm';
import ChangePasswordForm from '../components/Account/ChangePasswordForm/ChangePasswordForm';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BasicModal from '../components/Modal/BasicModal/BasicModal';
import AdressForm from '../components/Account/AdressForm/AdressForm';
import ListAddress from '../components/Account/ListAddress';

const Account = () => {
	const { auth, logout, setReloadUser } = useAuth();
	const [user, setUser] = useState(undefined);
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const response = await getMeApi(logout);
			setUser(response || null);
		})();
	}, [auth]);

	if (user === undefined) return null;
	if (!auth && !user) {
		router.replace('/');
		return null;
	}

	return (
		<BasicLayout className='account'>
			<Configuracion
				user={user}
				logout={logout}
				setReloadUser={setReloadUser}
			/>
			<Adresses />
		</BasicLayout>
	);
};

function Configuracion({ user, logout, setReloadUser }) {
	return (
		<div className='account__configuration'>
			<div className='title'>Configuración</div>
			<div className='data'>
				<Changenameform
					logout={logout}
					user={user}
					setReloadUser={setReloadUser}
				/>
				<ChangeEmailForm
					logout={logout}
					user={user}
					setReloadUser={setReloadUser}
				/>
				<ChangePasswordForm logout={logout} user={user} />
			</div>
		</div>
	);
}

function Adresses() {
	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTitleModal] = useState('');
	const [formModal, setFormModal] = useState(null);
	const [reloadAddresses, setReloadAddresses] = useState(false);

	const openModal = (title, address) => {
		setTitleModal(title);
		setFormModal(
			<AdressForm

				setShowModal={setShowModal}
				setReloadAddresses={setReloadAddresses}
				newAddress={address? false: true}
				address={address || null}
			/>
		);
		setShowModal(true);
	};

	const handleClose = () => {
		setShowModal(false);
	};

	return (
		<div className='account__adresses'>
			<div className='title'>
				Direcciones
				<AddBoxIcon onClick={() => openModal('Nueva dirección', null)} />
			</div>
			<div className='data'>
				<ListAddress
					reloadAddresses={reloadAddresses}
					setReloadAddresses={setReloadAddresses}
					openModal={openModal}></ListAddress>
			</div>

			<BasicModal open={showModal} handleClose={handleClose} title={titleModal}>
				{formModal}
			</BasicModal>
		</div>
	);
}

export default Account;
