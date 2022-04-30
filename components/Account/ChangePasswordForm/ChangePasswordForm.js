import { Box, Grid, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updatePasswordApi } from '../../../api/user';
import { LoadingButton } from '@mui/lab';

const ChangePasswordForm = ({ user, logout }) => {
	const [loading, setLoading] = useState(false);

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			setLoading(true);
			const response = await updatePasswordApi(
				user.id,
				formData.password,
				logout
			);

			if (!response) {
				toast.error('Error al actualizar la contraseña');
			} else {
				toast.success('Contraseña actualizada');
				logout();
			}
			setLoading(false);
		},
	});
	return (
		<div className='change-email-form'>
			<h4>Cambia tu contraseña</h4>
			<Box component='form' sx={{ flexGrow: 1 }} onSubmit={formik.handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<TextField
							label='Tu nueva contraseña'
							variant='outlined'
							name='password'
							onChange={formik.handleChange}
							// error={formik.errors.password}
							value={formik.values.password}
							helperText={formik.errors.password ? formik.errors.password : ''}
							type='password'
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							label='Confirma tu contraseña'
							variant='outlined'
							name='repeatPassword'
							onChange={formik.handleChange}
							value={formik.values.repeatPassword}
							// error={formik.errors.repeatPassword}
							helperText={
								formik.errors.repeatPassword ? formik.errors.password : ''
							}
							type='password'
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
		password: '',
		repeatPassword: '',
	};
}

function validationSchema() {
	return {
		password: Yup.string()
			.required(true)
			.oneOf([Yup.ref('repeatPassword')], 'Las contraseñas no coinciden'),
		repeatPassword: Yup.string()
			.required(true)
			.oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
	};
}
export default ChangePasswordForm;
