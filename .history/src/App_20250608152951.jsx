import './App.css';
import { useEffect, useState } from 'react';
import Login from './Login';

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		supabase.auth.getUser().then(({ data: { user } }) => {
			setUser(user);
		});

		const { data: listener } = supabase.auth.onAuthStateChange;
	});

	return (
		<>
			<div>
				<h1>Chore App</h1>
			</div>
		</>
	);
}

export default App;
