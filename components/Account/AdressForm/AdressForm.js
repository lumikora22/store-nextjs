import { LoadingButton } from '@mui/lab';
import { Box, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import useAuth from '../../../hooks/useAuth';
import { createAddressApi, updateAddressApi } from '../../../api/adress';
import { toast } from 'react-toastify';

const AdressForm = ({
	setShowModal,
	setReloadAddresses,
	newAddress,
	address,
}) => {
	const [loading, setLoading] = useState(false);
	const { auth, logout } = useAuth();

	const formik = useFormik({
		initialValues: initialValues(address),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			// createAdress(formData, logout);
			if (newAddress) {
				createAdress(formData, logout);
			} else {
				updateAddress(formData, logout);
			}
		},
	});

	const createAdress = async (formData, logout) => {
		setLoading(true);
		const formDataTemp = {
			...formData,
			users_permissions_user: auth.idUser,
		};
		const response = await createAddressApi(formDataTemp, logout);
		if (!response) {
			toast.warning('Error al crear la dirección');
			setLoading(false);
		} else {
			formik.resetForm();
			setReloadAddresses(true);
			setLoading(false);
			setShowModal(false);
			toast.success('Dirección creada correctamente');
		}
	};

	const updateAddress = async (formData, logout) => {
		setLoading(true);
		const formDataTemp = {
			...formData,
			users_permissions_user: auth.idUser,
		};
		const response = updateAddressApi(address._id, formDataTemp, logout);

		if(!response){
			toast.warning('Error al actualizar la dirección');
			setLoading(false);
		}else{
			formik.resetForm();
			setReloadAddresses(true);
			setLoading(false);
			setShowModal(false);
		}
	};
	return (
		<div className='add-adress-form'>
			<Box component='form' sx={{ width: 1 }} onSubmit={formik.handleSubmit}>
				<Grid container>
					<Grid item xs={12} sx={{ pb: 2 }}>
						<TextField
							sx={{ width: 1 }}
							label='Titulo de la dirección'
							variant='outlined'
							name='title'
							onChange={formik.handleChange}
							value={formik.values.title}
							error={formik.errors.title}
						/>
					</Grid>
					<Grid container sx={{ pb: 2 }}>
						<Grid item xs={6}>
							<TextField
								sx={{ width: 0.9 }}
								label='Nombre y apellidos'
								variant='outlined'
								name='name'
								onChange={formik.handleChange}
								value={formik.values.name}
								error={formik.errors.name}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								sx={{ float: 'right', width: 0.9 }}
								label='Dirección '
								variant='outlined'
								name='adress'
								onChange={formik.handleChange}
								value={formik.values.adress}
								error={formik.errors.adress}
							/>
						</Grid>
					</Grid>
					<Grid container sx={{ pb: 2 }}>
						<Grid item xs={6}>
							<TextField
								sx={{ width: 0.9 }}
								label='Ciudad'
								variant='outlined'
								name='city'
								onChange={formik.handleChange}
								value={formik.values.city}
								error={formik.errors.city}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								sx={{ float: 'right', width: 0.9 }}
								label='Estado/Provincia/Región '
								variant='outlined'
								name='state'
								onChange={formik.handleChange}
								value={formik.values.state}
								error={formik.errors.state}
							/>
						</Grid>
					</Grid>
					<Grid container sx={{ pb: 2 }}>
						<Grid item xs={6}>
							<TextField
								sx={{ width: 0.9 }}
								label='Codigo postal'
								variant='outlined'
								name='postalCode'
								onChange={formik.handleChange}
								value={formik.values.postalCode}
								error={formik.errors.postalCode}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								sx={{ float: 'right', width: 0.9 }}
								label='Número de Teléfono '
								variant='outlined'
								type='number'
								name='phone'
								onChange={formik.handleChange}
								value={formik.values.phone}
								error={formik.errors.phone}
							/>
						</Grid>
					</Grid>

					<LoadingButton loading={loading} type='submit' variant='contained'>
						{newAddress ? 'Crear Dirección' : 'Actualizar dirección'}
					</LoadingButton>
				</Grid>
			</Box>
		</div>
	);
};

function initialValues(address) {
	return {
		title: address?.title || '',
		name: address?.name || '',
		adress: address?.adress || '',
		city: address?.city || '',
		state: address?.state || '',
		postalCode: address?.postalCode || '',
		phone: address?.phone || ''
	};
}

function validationSchema() {
	return {
		title: Yup.string().required(true),
		name: Yup.string().required(true),
		adress: Yup.string().required(true),
		city: Yup.string().required(true),
		state: Yup.string().required(true),
		postalCode: Yup.string().required(true),
		phone: Yup.string().required(true),
	};
}

export default AdressForm;
