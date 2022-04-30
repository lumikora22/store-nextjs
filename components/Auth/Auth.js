import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = ({ handleClose, setTitleModal }) => {
	const [showLogin, setShowLogin] = useState(true);

	const showLoginForm = () => {
		setShowLogin(true);
		setTitleModal('Iniciar Sesión');
	};
	const showRegisterForm = () => {
		setShowLogin(false);
		setTitleModal('Crear nuevo usuario');
	};

	return showLogin ? (
		<LoginForm showRegisterForm={showRegisterForm} handleClose={handleClose} />
	) : (
		<RegisterForm showLoginForm={showLoginForm} />
	);
};

export default Auth;
