import AppRoutes from "./AppRoutes";
import { useEffect } from "react";
import {useAuth} from "../features/auth/hooks/useAuth.js";

const App = () => {
	const auth = useAuth();

	// Get user info when then app starts
	useEffect(() => {
		auth.handleGetMe();
	}, []);

	return <AppRoutes />
}

export default App;