import './App.css';
import { useEffect, useState } from 'react';
import Login from './Login';

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		supabase.auth.getUser().then(({ data: { user } }) => {
			setUser(user);
		});
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
