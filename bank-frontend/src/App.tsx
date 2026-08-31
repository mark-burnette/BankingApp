import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./App.css";

import Users from "./Users";
import Home from "./Home";
import Login from "./Login";
import Accounts from "./Accounts";

function App() {
	return (
		<CookiesProvider defaultSetOptions={{ path: "/" }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/users/:id?" element={<Users />} />
					<Route path="/accounts" element={<Accounts />} />
				</Routes>
			</BrowserRouter>
		</CookiesProvider>
	);
}

export default App;
