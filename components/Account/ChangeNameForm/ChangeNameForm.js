import { Box, Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updateMeApi } from '../../../api/user';
import { LoadingButton } from '@mui/lab';

const Changenameform = ({ user, logout , setReloadUser}) => {
  
	const [loading, setLoading] = useState(false);

	const formik = useFormik({
		initialValues: initialValues(user.name, user.lastname),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			setLoading(true);
			const response = await updateMeApi(user.id, formData, logout);
			if (!response) {
				toast.error('Error al actualizar el nombre');
			} else {
        setReloadUser(true);
				toast.success('Nombre actualizado');
			}
			setLoading(false);
		},
	});

	return (
		<div className='change-name-form'>
			<h4>Cambia tu nombre y apellidos</h4>
			<Box component='form' sx={{ flexGrow: 1 }} onSubmit={formik.handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<TextField
							label='Tu nuevo nombre'
							variant='outlined'
							name='name'
							value={formik.values.name}
							onChange={formik.handleChange}
							error={formik.errors.name}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							label='Tu nuevo apellido'
							variant='outlined'
							name='lastname'
							value={formik.values.lastname}
							onChange={formik.handleChange}
							error={formik.errors.lastname}
						/>
					</Grid>
					<Grid item xs={4}>
						<LoadingButton
							loading={loading}
							variant='contained'
							type='submit'
							className='submit'>
							Actualizar
						</LoadingButton>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
};

function initialValues(name, lastname) {
	return {
		name: name || '',
		lastname: lastname || '',
	};
}

function validationSchema() {
	return {
		name: Yup.string().required(true),
		lastname: Yup.string().required(true),
	};
}

export default Changenameform;
