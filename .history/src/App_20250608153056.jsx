import './App.css';
import { useState } from 'react';
import supabase from './supabaseClient';

export default function Login({ onLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSigningUp, setIsSigningUp] = useState(false);
	const [error, setError] = useState(null);

	const handleAuth = async (e) => {
		e.preventDefault();
		setError(null);

		const { data, error } = isSigningUp
			? await supabase.auth.signUp({ email, password })
			: await supabase.auth.signInWithPassword({ email, password });

		if (error) setError(error.message);
		else onLogin(data.user);
	};

	return (
		<div style={{ padding: 20 }}>
			<h2>{isSigningUp ? 'Sign Up' : 'Log In'}</h2>
			<form onSubmit={handleAuth}>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<br />
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<br />
				<button type='submit'>
					{isSigningUp ? 'Create Account' : 'Login'}
				</button>
			</form>
			<p style={{ color: 'red' }}>{error}</p>
			<button onClick={() => setIsSigningUp(!isSigningUp)}>
				{isSigningUp
					? 'Already have an account? Log in'
					: 'Need an account? Sign up'}
			</button>
		</div>
	);
}
