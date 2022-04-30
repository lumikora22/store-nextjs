import { Box, Grid, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updateEmailApi } from '../../../api/user';
import { LoadingButton } from '@mui/lab';

const ChangeEmailForm = ({ user, logout, setReloadUser }) => {
	const [loading, setLoading] = useState(false);

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			setLoading(true);
			const response = await updateEmailApi(user.id, formData.email, logout);
			console.log(response);
			if (!response) {
				toast.error('Error al actualizar el email');
			} else if (response?.statusCode === 400) {
				toast.error('Email ya en uso');
			} else {
				setReloadUser(true);
				formik.handleReset();
				toast.success('Email actualizado');
			}
			setLoading(false);
		},
	});
	return (
		<div className='change-email-form'>
			<h4>
				Cambia tu e-mail <span>(Tu e-mail actual: {user.email})</span>{' '}
			</h4>
			<Box component='form' sx={{ flexGrow: 1 }} onSubmit={formik.handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<TextField
							label='Tu nuevo email'
							variant='outlined'
							name='email'
							value={formik.values.email}
							onChange={formik.handleChange}
							error={formik.errors.email}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							label='Confirma tu email'
							variant='outlined'
							name='repeatEmail'
							value={formik.values.repeatEmail}
							onChange={formik.handleChange}
							error={formik.errors.repeatEmail}
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

function initialValues() {
	return {
		email: '',
		repeatEmail: '',
	};
}

function validationSchema() {
	return {
		email: Yup.string()
			.email()
			.required(true)
			.oneOf([Yup.ref('repeatEmail')], true),
		repeatEmail: Yup.string()
			.email()
			.required(true)
			.oneOf([Yup.ref('email')], true),
	};
}

export default ChangeEmailForm;
