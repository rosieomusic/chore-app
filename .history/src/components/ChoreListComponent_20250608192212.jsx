import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import styles from './ChoreListStyles.module.css';
export default function ChoreListComponent() {
	const [chores, setChores] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchChores = async () => {
			const { data: choresData, error: choresError } = await supabase
				.from('chores')
				.select('*')
				.order('exp_date', { ascending: true });

			const { data: assignments, error: assignmentError } = await supabase
				.from('user_chores')
				.select('chore_id, user_id, profiles ( avatar, name )');

			if (choresError || assignmentError) {
				console.error('Error fetching chores or assignments');
				return;
			}

			// Combine assignee info
			const choresWithAssignee = choresData.map((chore) => {
				const assignment = assignments.find(
					(a) => a.chore_id === chore.chore_id
				);
				console.log('Chores with assignments:', chores);
				return { ...chore, assignedUser: assignment?.profiles || null };
			});

			setChores(choresWithAssignee);
			setLoading(false);
		};

		fetchChores();
	}, []);

	if (loading) return <p>Loading chores...</p>;
	if (!chores.length) return <p>No chores found.</p>;

	const calculateDaysLeft = (expDate) => {
		const today = new Date();
		const date = new Date(expDate);
		const diff = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
		return diff >= 0 ? `${diff} days` : 'Overdue';
	};

	return (
		<div className={styles.container}>
			<table
				style={{ borderCollapse: 'collapse', width: '100%', minWidth: '600px' }}
			>
				<thead>
					<tr>
						<th style={th}>Chore</th>
						<th style={th}>Category</th>
						<th style={th}>Due In</th>
						<th style={th}>Completed</th>
						<th style={th}>Assigned To</th>
					</tr>
				</thead>
				<tbody>
					{chores.map((chore) => (
						<tr key={chore.chore_id}>
							<td style={td}>{chore.name}</td>
							<td style={td}>{chore.category || '—'}</td>
							<td style={td}>{calculateDaysLeft(chore.exp_date)}</td>
							<td style={td}>{chore.completed ? '✅' : '❌'}</td>
							<td style={td}>
								{chore.assignedUser ? chore.assignedUser.name : <span></span>}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

const th = {
	borderBottom: '2px solid #ccc',
	textAlign: 'left',
	padding: '8px',
};

const td = {
	borderBottom: '1px solid #eee',
	padding: '8px',
};
