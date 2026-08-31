import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Accounts.css";

type Account = {
	id: string;
	user_id: string;
	type: "checking" | "savings";
	balance: string;
};

function Accounts() {
	const [cookies] = useCookies(["user_id", "role"]);

	const [accounts, setAccounts] = useState<Account[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchAccounts() {
			try {
				let url: string;

				if (cookies.role === "admin") {
					url = "http://localhost:8000/accounts";
				} else {
					url = `http://localhost:8000/users/${cookies.user_id}/accounts`;
				}

				const response = await fetch(url);

				if (!response.ok) {
					throw new Error(`HTTP Error: ${response.status}`);
				}

				const data = await response.json();

				setAccounts(data.accounts);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError("An unknown error occurred");
				}
			} finally {
				setLoading(false);
			}
		}

		if (cookies.user_id) {
			fetchAccounts();
		}
	}, [cookies.user_id, cookies.role]);

	function formatBalance(balance: string) {
		return Number(balance).toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
	}

	if (loading) {
		return (
			<main className="accounts-page">
				<p className="accounts-status">Loading accounts...</p>
			</main>
		);
	}

	if (error) {
		return (
			<main className="accounts-page">
				<p className="accounts-error">Error: {error}</p>
			</main>
		);
	}

	return (
		<main className="accounts-page">
			<div className="accounts-container">
				<div className="accounts-header">
					<div>
						<p className="eyebrow">Banking</p>
						<h1>Your Accounts</h1>
						<p className="subtitle">View your checking and savings accounts.</p>
					</div>

					<Link to="/" className="primary-button">
						Dashboard
					</Link>
				</div>

				{accounts.length === 0 ? (
					<div className="empty-accounts">
						<div className="empty-icon">+</div>
						<h2>No accounts</h2>
						<p>You don't have any accounts yet.</p>
					</div>
				) : (
					<div className="account-list">
						{accounts.map((account) => (
							<div className="account-row" key={account.id}>
								<div className={`account-icon ${account.type}`}>
									{account.type === "checking" ? "C" : "S"}
								</div>

								<div className="account-info">
									<span className="account-name">
										{account.type.charAt(0).toUpperCase() +
											account.type.slice(1)}
									</span>

									<span className="account-number">
										Account ending in {account.id.slice(-4)}
									</span>
								</div>

								<div className="account-balance">
									<span>Balance</span>
									<strong>{formatBalance(account.balance)}</strong>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</main>
	);
}

export default Accounts;
