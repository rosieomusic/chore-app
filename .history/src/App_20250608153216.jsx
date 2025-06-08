// src/App.js
import { useEffect, useState } from 'react';
import supabase from './supabaseClient';
import Login from './Login';

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		supabase.auth.getUser().then(({ data: { user } }) => {
			setUser(user);
		});

		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setUser(session?.user ?? null);
			}
		);

		return () => listener?.subscription.unsubscribe();
	}, []);

	const handleLogout = async () => {
		await supabase.auth.signOut();
	};

	if (!user) return <Login onLogin={setUser} />;

	return (
		<div style={{ padding: 20 }}>
			<h1>Welcome, {user.email}</h1>
			<button onClick={handleLogout}>Log Out</button>
		</div>
	);
}

export default App;
