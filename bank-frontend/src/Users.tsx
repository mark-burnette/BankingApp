import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Users.css";

interface UserModel {
	id: string;
	name: string;
	username: string;
	role: string;
}

interface UpdateUserModel {
	id: string;
	name?: string;
	username?: string;
	role?: string;
}

async function fetchUsers(id: string | undefined) {
	const response = await (id == undefined
		? fetch("http://localhost:8000/users")
		: fetch(`http://localhost:8000/users/${id}`));
	if (!response.ok) {
		throw new Error(`HTTP Error: ${response.status}`);
	}

	return response.json();
}

async function updateUser(id: string, newUser: UpdateUserModel) {
	const response = await fetch(`http://localhost:8000/users/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newUser),
	});

	if (!response.ok) {
		throw new Error(`HTTP Error: ${response.status}`);
	}

	return response.json();
}

async function deleteUser(id: string) {
	const response = await fetch(`http://localhost:8000/users/${id}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error(`HTTP Error: ${response.status}`);
	}
}

function Users() {
	const [users, setUsers] = useState<UserModel[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const { id } = useParams<"id">();

	function updateUserField(
		id: string,
		field: "name" | "username" | "role",
		value: string,
	) {
		setUsers((currentUsers) =>
			currentUsers.map((user) =>
				user.id === id ? { ...user, [field]: value } : user,
			),
		);
	}

	useEffect(() => {
		fetchUsers(id)
			.then((data) => {
				if (id === undefined) setUsers(data.users);
				else setUsers([data]);
			})
			.catch((error) => setError(error.message))
			.finally(() => setLoading(false));
	}, [id]);

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
								<input
									className="user-name"
									value={user.name}
									onChange={(e) =>
										updateUserField(user.id, "name", e.target.value)
									}
								/>
								<input
									className="user-username"
									value={user.username}
									onChange={(e) =>
										updateUserField(user.id, "username", e.target.value)
									}
								/>
							</div>
							<select
								className="user-role"
								value={user.role}
								onChange={(e) =>
									updateUserField(user.id, "role", e.target.value)
								}
							>
								<option value="customer">customer</option>
								<option value="admin">admin</option>
							</select>
							<div className="user-id">{user.id}</div>
						</div>

						<button
							className="update-button"
							onClick={() => updateUser(user.id, user)}
						>
							Update
						</button>

						<button
							className="delete-button"
							onClick={() =>
								deleteUser(user.id).then(() => {
									setUsers((currentUsers) =>
										currentUsers.filter(
											(currentUser) => currentUser.id !== user.id,
										),
									);
								})
							}
						>
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default Users;
