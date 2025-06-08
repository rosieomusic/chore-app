// src/ChoreList.jsx
import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

export default function ChoreListComponent() {
	const [chores, setChores] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchChores = async () => {
			const { data, error } = await supabase
				.from('chores')
				.select('*')
				.order('exp_date', { ascending: true });

			if (error) {
				console.error('Error fetching chores:', error.message);
			} else {
				setChores(data);
			}

			setLoading(false);
		};

		fetchChores();
	}, []);

	if (loading) return <p>Loading chores...</p>;
	if (!chores.length) return <p>No chores found.</p>;

	return (
		<ul>
			{chores.map((chore) => (
				<ul key={chore.chore_id}>
					<strong>{chore.name}</strong> — {chore.category || 'Uncategorized'}
					<br />
					Due: {new Date(chore.exp_date).toLocaleDateString()}
					<br />
					Completed: {chore.completed ? '✅' : '❌'}
				</ul>
			))}
		</ul>
	);
}
