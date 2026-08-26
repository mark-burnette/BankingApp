import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type UserModel } from "./Users";

async function fetchUser(id: string | undefined) {
	const response = await fetch(`http://localhost:8000/users/${id}`);

	if (!response.ok) {
		throw new Error(`HTTP Error: $(response.status)`);
	}

	return response.json();
}

function User() {
	const [user, setUser] = useState<UserModel | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const { id } = useParams<"id">();

	useEffect(() => {
		fetchUser(id)
			.then(setUser)
			.catch(setError)
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <p>Loading user...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<div>
			<h1>User</h1>
			<h2>{user?.id}</h2>
			{user?.name} {user?.username} {user?.role}
		</div>
	);
}

export default User;
