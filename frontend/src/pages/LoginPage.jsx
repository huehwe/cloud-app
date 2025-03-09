import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    Text,
    useToast,
    useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const toast = useToast();
    const { login } = useAuth();
    const bg = useColorModeValue("white", "gray.800");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.user, data.token);
                toast({
                    title: "Login Successful",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                navigate("/");
            } else {
                throw new Error(data.message || "Login failed");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            w="full"
            h="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={useColorModeValue('gray.50', 'gray.900')}
        >
            <Box
                p={8}
                maxWidth="400px"
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
                bg={bg}
            >
                <VStack spacing={6} align="flex-start" w="full">
                    <VStack spacing={2} align="center" w="full">
                        <Heading size="xl">Đăng nhập</Heading>
                        <Text color={useColorModeValue('gray.600', 'gray.400')}>
                            Vui lòng đăng nhập để tiếp tục
                        </Text>
                    </VStack>

                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <VStack spacing={5}>
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    size="lg"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Mật khẩu</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    size="lg"
                                />
                            </FormControl>

                            <Button
                                type="submit"
                                colorScheme="blue"
                                width="full"
                                size="lg"
                                isLoading={isLoading}
                                _hover={{
                                    bg: 'blue.500',
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'lg',
                                }}
                                transition="all 0.2s"
                            >
                                Đăng nhập
                            </Button>
                        </VStack>
                    </form>

                    <VStack spacing={2} align="center" w="full" pt={4}>
                        <Text color={useColorModeValue('gray.600', 'gray.400')}>
                            Chưa có tài khoản?{' '}
                            <Link
                                as={RouterLink}
                                to="/register"
                                color="blue.500"
                                fontWeight="semibold"
                                _hover={{
                                    textDecoration: 'underline',
                                    color: 'blue.600'
                                }}
                            >
                                Đăng ký ngay
                            </Link>
                        </Text>
                    </VStack>
                </VStack>
            </Box>
        </Box>
    );
};



export default LoginPage;