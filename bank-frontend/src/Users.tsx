import { useEffect, useState } from "react";
import "./Users.css";

export interface UserModel {
	id: string;
	name: string;
	username: string;
	role: string;
}

async function fetchUsers() {
	const response = await fetch("http://localhost:8000/users");
	if (!response.ok) {
		throw new Error(`HTTP Error: $(response.status)`);
	}

	console.log(response);

	return response.json();
}

function Users() {
	const [users, setUsers] = useState<UserModel[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchUsers()
			.then((data) => setUsers(data.users))
			.catch(setError)
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <p>Loading users...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<div className="users">
			<h1>Users</h1>

			<div className="user-list">
				{users.map((user) => (
					<div className="user-row" key={user.id}>
						<div className="user-info">
							<div className="avatar">{user.name.charAt(0).toUpperCase()}</div>

							<div>
								<div className="user-name">{user.name}</div>
								<div className="username">@{user.username}</div>
							</div>
						</div>

						<div className="user-role">{user.role}</div>

						<div className="user-id">{user.id}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Users;
