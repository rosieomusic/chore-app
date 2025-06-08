// src/App.js
import { useEffect, useState } from 'react';
import supabase from './supabaseClient';
import Login from './Login';
import ChoreListComponent from './components/ChoreListComponent';

function App() {
	const [user, setUser] = useState(null);
	const [profile, setProfile] = useState(null);

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

	useEffect(() => {
		const fetchProfile = async () => {
			if (!user) return;

			const { data, error } = await supabase
				.from('profiles')
				.select('name, avatar')
				.eq('user_id', user.id)
				.single();

			if (error) console.error('Error fetching profile:', error);
			else setProfile(data);
		};

		fetchProfile();
	}, [user]);

	const handleLogout = async () => {
		await supabase.auth.signOut();
	};

	if (!user) return <Login onLogin={setUser} />;

	return (
		<div id='app-container'>
			<div>
				<h1>Welcome, {profile?.name || 'loading...'}</h1>
				{profile?.avatar && (
					<img
						src={profile.avatar}
						alt='avatar'
						style={{ width: 100, height: 100, borderRadius: '50%' }}
					/>
				)}

				<ChoreListComponent />
				<button onClick={handleLogout}>Log Out</button>
			</div>
			<main></main>
		</div>
	);
}

export default App;
