import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrdersPage from "./pages/OrdersPage";

function App() {
	return (
		<Box minH={"100vh"} bg={useColorModeValue("blue.100", "blue.900")}>
			<Navbar />
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/create' element={<CreatePage />} />
				<Route path="/product/:id" element={<ProductDetailsPage />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/order-confirmation" element={<OrderConfirmation />} />
				<Route path="/orders" element={<OrdersPage />} />
				<Route path="*" element={<div>Page not found</div>} />
			</Routes>
		</Box>
	);
}

export default App;
