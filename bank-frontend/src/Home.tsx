function Home() {
	return (
		<div className="home">
			<header className="topbar">
				<div className="brand">
					<span className="brand-mark">B</span>
					<span>Banking App</span>
				</div>

				<nav>
					<a href="/">Overview</a>
					<a href="/accounts">Accounts</a>
					<a href="/transactions">Transactions</a>
				</nav>

				<div className="profile">
					<div className="avatar">JD</div>
					<span>John Doe</span>
					<span className="chevron">⌄</span>
				</div>
			</header>

			<main className="dashboard">
				<div className="welcome">
					<div>
						<p className="eyebrow">Wednesday, August 26</p>
						<h1>Good afternoon, John.</h1>
						<p className="subtitle">
							Here's what's happening with your money today.
						</p>
					</div>

					<button className="primary-button">+ Transfer money</button>
				</div>

				<section className="balance-grid">
					<div className="balance-card">
						<div className="card-header">
							<span>Total balance</span>
							<span className="more">•••</span>
						</div>

						<div className="total-balance">$24,680.42</div>

						<div className="balance-change">
							<span>↑ 4.8%</span>
							<span>this month</span>
						</div>
					</div>

					<div className="account-card">
						<div className="account-icon checking">C</div>

						<div className="account-info">
							<span className="account-name">Checking</span>
							<span className="account-number">•••• 4821</span>
						</div>

						<strong>$8,420.18</strong>
					</div>

					<div className="account-card">
						<div className="account-icon savings">S</div>

						<div className="account-info">
							<span className="account-name">Savings</span>
							<span className="account-number">•••• 9137</span>
						</div>

						<strong>$16,260.24</strong>
					</div>
				</section>

				<div className="content-grid">
					<section className="panel transactions">
						<div className="panel-header">
							<div>
								<h2>Recent transactions</h2>
								<p>Your latest account activity</p>
							</div>

							<a href="/transactions">View all</a>
						</div>

						<Transaction
							icon="☕"
							name="Sunrise Coffee"
							date="Today, 9:42 AM"
							amount="-$6.85"
						/>

						<Transaction
							icon="↗"
							name="Direct deposit"
							date="Today, 8:00 AM"
							amount="+$2,450.00"
							positive
						/>

						<Transaction
							icon="🛒"
							name="Green Market"
							date="Yesterday, 6:18 PM"
							amount="-$84.27"
						/>

						<Transaction
							icon="▶"
							name="StreamFlix"
							date="Aug 24, 2026"
							amount="-$14.99"
						/>

						<Transaction
							icon="↗"
							name="Transfer from savings"
							date="Aug 23, 2026"
							amount="+$500.00"
							positive
						/>
					</section>

					<aside className="side-column">
						<section className="panel quick-actions">
							<h2>Quick actions</h2>

							<button>
								<span className="action-icon">↗</span>
								Send money
								<span>›</span>
							</button>

							<button>
								<span className="action-icon">↓</span>
								Deposit check
								<span>›</span>
							</button>

							<button>
								<span className="action-icon">▣</span>
								Pay a bill
								<span>›</span>
							</button>
						</section>

						<section className="tip-card">
							<span className="tip-icon">✦</span>
							<h3>You're doing great</h3>
							<p>
								You've increased your savings by 12% over the last three months.
							</p>
							<a href="/insights">View your insights →</a>
						</section>
					</aside>
				</div>
			</main>
		</div>
	);
}

function Transaction({
	icon,
	name,
	date,
	amount,
	positive,
}: {
	icon: string;
	name: string;
	date: string;
	amount: string;
	positive?: boolean;
}) {
	return (
		<div className="transaction">
			<div className="transaction-icon">{icon}</div>

			<div className="transaction-details">
				<strong>{name}</strong>
				<span>{date}</span>
			</div>

			<strong className={positive ? "positive" : ""}>{amount}</strong>
		</div>
	);
}

export default Home;
