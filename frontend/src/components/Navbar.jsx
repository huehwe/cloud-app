import { Box, Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const navigate = useNavigate();
	const { cartItems } = useCart();
	const { isAuthenticated, logout } = useAuth();

	const handleLogout = () => {
		logout();
		navigate('/');
		toast({
			title: 'Đăng xuất thành công',
			status: 'success',
			duration: 2000,
			isClosable: true,
		});
	};

	return (
		<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>ShopIt! 🛒</Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>
					<Link to={"/create"}>
						<Button>
							<PlusSquareIcon fontSize={20} />
						</Button>
					</Link>
					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
					</Button>
					<Link to="/cart">
						<Button
							variant="ghost"
							position="relative"
						>
							Giỏ hàng
							{cartItems.length > 0 && (
								<Box
									position="absolute"
									top="-2px"
									right="-2px"
									px={2}
									py={1}
									borderRadius="full"
									bg="red.500"
									color="white"
									fontSize="xs"
								>
									{cartItems.length}
								</Box>
							)}
						</Button>
					</Link>
					{isAuthenticated ? (
						<Button
							leftIcon={<FaSignOutAlt />}
							colorScheme="red"
							onClick={handleLogout}
						>
							Đăng xuất
						</Button>
					) : (
						<Button
							leftIcon={<FaSignInAlt />}
							colorScheme="blue"
							onClick={() => navigate('/login')}
						>
							Đăng nhập
						</Button>
					)}

				</HStack>
			</Flex>
		</Container>
	);
};

export default Navbar;