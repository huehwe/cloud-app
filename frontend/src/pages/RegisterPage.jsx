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
    Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailVerification from '../components/EmailVerification';

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isVerificationOpen, setIsVerificationOpen] = useState(false);
    const bg = useColorModeValue('white', 'gray.800');

    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsVerificationOpen(true);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            toast({
                title: 'Registration failed',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true
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
                        <Heading size="xl">Đăng ký</Heading>
                        <Text color={useColorModeValue('gray.600', 'gray.400')}>
                            Tạo tài khoản mới để tiếp tục
                        </Text>
                    </VStack>

                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <VStack spacing={5}>
                            <FormControl isRequired>
                                <FormLabel>Họ tên</FormLabel>
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Họ và tên của bạn"
                                    size="lg"
                                />
                            </FormControl>

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
                                Đăng ký
                            </Button>
                        </VStack>
                    </form>

                    <VStack spacing={2} align="center" w="full" pt={4}>
                        <Text color={useColorModeValue('gray.600', 'gray.400')}>
                            Đã có tài khoản?{' '}
                            <Link
                                as={RouterLink}
                                to="/login"
                                color="blue.500"
                                fontWeight="semibold"
                                _hover={{
                                    textDecoration: 'underline',
                                    color: 'blue.600'
                                }}
                            >
                                Đăng nhập
                            </Link>
                        </Text>
                    </VStack>
                </VStack>
            </Box>

            <EmailVerification
                isOpen={isVerificationOpen}
                onClose={() => setIsVerificationOpen(false)}
                email={email}
            />
        </Box>
    );
};
export default RegisterPage;