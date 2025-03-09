import {
    Box,
    Button,
    Container,
    Heading,
    HStack,
    Image,
    Text,
    VStack,
    useColorModeValue,
    useToast,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { formatVNDPrice } from '../utils/formatters';

const CartPage = () => {
    const { cartItems, total, clearCart } = useCart();
    const { isAuthenticated, user, token } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const bg = useColorModeValue('white', 'gray.800');
    const cartTotal = total || cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);


    const handleCheckout = async () => {
        if (!isAuthenticated || !user) {
            toast({
                title: 'Vui lòng đăng nhập',
                description: 'Bạn cần đăng nhập trước khi thanh toán',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            navigate('/login');
            return;
        }

        // Now we can safely check isEmailVerified
        if (!user.isEmailVerified) {
            toast({
                title: 'Email verification required',
                description: 'Please verify your email before checkout',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    items: cartItems,
                    totalAmount: cartTotal // Use cartTotal instead of total
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Checkout failed');
            }

            clearCart();
            toast({
                title: 'Order Success',
                description: 'Your order has been placed successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate('/orders');
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <Container maxW="container.xl" py={8}>
                <Box p={8} bg={bg} borderRadius="lg" shadow="md">
                    <VStack spacing={4} align="stretch">
                        <Heading size="lg">Giỏ hàng</Heading>
                        <Text>Giỏ hàng của bạn đang trống</Text>
                        <Button
                            colorScheme="blue"
                            onClick={() => navigate('/')}
                        >
                            Quay lại mua sắm
                        </Button>
                    </VStack>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxW="container.xl" py={8}>
            <Box p={8} bg={bg} borderRadius="lg" shadow="md">
                <VStack spacing={6} align="stretch">
                    <Heading size="lg">Giỏ hàng của bạn</Heading>

                    {cartItems.map((item) => (
                        <Box
                            key={item._id}
                            p={4}
                            borderWidth="1px"
                            borderRadius="lg"
                            bg={useColorModeValue('white', 'gray.700')}
                        >
                            <HStack spacing={4} align="center">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    boxSize="100px"
                                    objectFit="cover"
                                    borderRadius="md"
                                />

                                <VStack flex="1" align="start" spacing={1}>
                                    <Heading size="md">{item.name}</Heading>
                                    <Text color="blue.500" fontWeight="bold">
                                        {formatVNDPrice(item.price)}
                                    </Text>
                                </VStack>

                                <NumberInput
                                    size="md"
                                    maxW={24}
                                    min={1}
                                    max={99}
                                    value={item.quantity}
                                    onChange={(value) => updateQuantity(item._id, parseInt(value))}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>

                                <Text fontWeight="bold">
                                    {formatVNDPrice((item.price * item.quantity).toFixed(2))}
                                </Text>

                                <Button
                                    colorScheme="red"
                                    onClick={() => removeFromCart(item._id)}
                                >
                                    Xóa
                                </Button>
                            </HStack>
                        </Box>
                    ))}

                    <Box pt={6} borderTopWidth="1px">
                        <HStack justify="space-between" mb={4}>
                            <Heading size="lg">Tổng tiền:</Heading>
                            <Heading size="lg" color="blue.500">
                                {formatVNDPrice(cartTotal.toFixed(2))}
                            </Heading>
                        </HStack>

                        <HStack spacing={4}>
                            <Button
                                colorScheme="blue"
                                size="lg"
                                flex="1"
                                onClick={handleCheckout}
                                isLoading={isLoading}
                            >
                                Thanh toán
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => navigate('/')}
                            >
                                Quay lại mua sắm
                            </Button>
                        </HStack>
                    </Box>
                </VStack>
            </Box>
        </Container>
    );
};

export default CartPage;