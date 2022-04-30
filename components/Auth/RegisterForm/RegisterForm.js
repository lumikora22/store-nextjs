import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerApi } from '../../../api/user';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const RegisterForm = ({ showLoginForm }) => {
	const [loading, setLoading] = useState(false);
	const notify = () => toast('Wow so easy!');
	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object(validationSchema()),
		onSubmit: async (formData) => {
			setLoading(true);
			const response = await registerApi(formData);

			if (response.data?.jwt) {
				toast.info('Usuario creado con éxito');
				showLoginForm();
			} else {
				toast.error('Error al registrar usuario, intenelo más tarde');
			}
			setLoading(false);
		},
	});
	return (
		<div>
			<div className='login-form'>
				<Box
					component='form'
					sx={{
						'& > :not(style)': { m: 1, width: '100%' },
					}}
					onSubmit={formik.handleSubmit}
					noValidate
					autoComplete='off'>
					<TextField
						label='Nombre'
						variant='outlined'
						name='name'
						onChange={formik.handleChange}
						error={formik.errors.name ? true : false}
					/>
					<TextField
						label='Apellidos'
						variant='outlined'
						name='lastname'
						onChange={formik.handleChange}
						error={formik.errors.lastname ? true : false}
					/>
					<TextField
						label='Usuario'
						variant='outlined'
						name='username'
						onChange={formik.handleChange}
						error={formik.errors.username ? true : false}
					/>
					<TextField
						label='Correo Electrónico'
						variant='outlined'
						name='email'
						onChange={formik.handleChange}
						error={formik.errors.email ? true : false}
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
						Registrarse
					</LoadingButton>
					<Button onClick={showLoginForm} variant='outlined'>
						Iniciar Sesión
					</Button>
				</Box>
			</div>
		</div>
	);
};

function initialValues() {
	return {
		name: '',
		lastname: '',
		username: '',
		email: '',
		password: '',
	};
}

function validationSchema() {
	return {
		name: Yup.string().required(true),
		lastname: Yup.string().required(true),
		username: Yup.string().required(true),
		email: Yup.string().email(true).required(true),
		password: Yup.string().required(true),
	};
}

export default RegisterForm;
