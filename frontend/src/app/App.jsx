import AppRoutes from "./AppRoutes";
import {useAuth} from "../features/auth/hooks/useAuth.js";
import { useEffect } from "react";

const App = () => {
	const auth = useAuth();

	useEffect(() => {
		auth.handleGetMe();
	}, []);

	return <AppRoutes />
}

export default App;