import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginApi, resetPasswordApi } from '../../../api/user';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';

const LoginForm = ({ showRegisterForm, handleClose }) => {
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();

	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			setLoading(true);
			const response = await loginApi(formData);

			if (response.data?.jwt) {
				//Guardar el token para
				login(response.data.jwt);

				toast.info('Usuario logueado con éxito');
				handleClose();
			} else {
				toast.error('El usuario o la contraseña es incorrecta');
			}
			setLoading(false);
		},
	});

	const resetPassword = async () => {
		formik.setErrors({});

		const validateEmail = Yup.string().email().required(true);

		if (!validateEmail.isValidSync(formik.values.identifier)) {
			formik.setErrors({ identifier: true });
		} else {
			
			resetPasswordApi(formik.values.identifier);
			
		}
		console.log(formik.values.identifier);
	};

	return (
		<div>
			<div className='register-form'>
				<Box
					component='form'
					sx={{
						'& > :not(style)': { m: 1, width: '100%' },
					}}
					onSubmit={formik.handleSubmit}
					noValidate
					autoComplete='off'>
					<TextField
						label='Correo Electrónico'
						variant='outlined'
						name='identifier'
						onChange={formik.handleChange}
						error={formik.errors.identifier ? true : false}
					/>

					<TextField
						label='Contraseña'
						variant='outlined'
						name='password'
						type='password'
						onChange={formik.handleChange}
						error={formik.errors.password ? true : false}
					/>
					<LoadingButton loading={loading} variant='contained' type='submit'>
						Entrar
					</LoadingButton>
					<Button onClick={showRegisterForm} variant='outlined'>
						Registrarse
					</Button>
					<Button variant='text' onClick={resetPassword}>
						¿Olvidaste tu contraseña?
					</Button>
				</Box>
			</div>
		</div>
	);
};

function initialValues() {
	return {
		identifier: '',

		password: '',
	};
}

function validationSchema() {
	return {
		identifier: Yup.string().email(true).required(true),

		password: Yup.string().required(true),
	};
}

export default LoginForm;
