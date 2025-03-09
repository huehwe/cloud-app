import { useEffect, useState } from 'react';
import {
    Container,
    Box,
    VStack,
    Heading,
    Text,
    useColorModeValue,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Badge,
    Spinner,
    Image,
    HStack,
    Divider
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { formatVNDPrice, formatDate } from '../utils/formatters';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { token, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const bg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'yellow';
            case 'completed': return 'green';
            case 'cancelled': return 'red';
            default: return 'gray';
        }
    };



    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders/my-orders', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [token, isAuthenticated, navigate]);
    if (isLoading) {
        return (
            <Container centerContent py={20}>
                <Spinner size="xl" />
            </Container>
        );
    }
    return (
        <Container maxW="container.xl" py={8}>
            <Box p={8} bg={bg} borderRadius="lg" shadow="md">
                <VStack spacing={6} align="stretch">
                    <Heading size="lg">Lịch sử đơn hàng</Heading>
                    {orders.length === 0 ? (
                        <Box textAlign="center" py={10}>
                            <Text fontSize="lg" color="gray.500">
                                Bạn chưa có đơn hàng nào
                            </Text>
                            <Button
                                mt={4}
                                colorScheme="blue"
                                onClick={() => navigate('/')}
                            >
                                Mua sắm ngay
                            </Button>
                        </Box>
                    ) : (
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Mã đơn hàng</Th>
                                    <Th>Ngày đặt</Th>
                                    <Th>Số lượng</Th>
                                    <Th isNumeric>Tổng tiền</Th>
                                    <Th>Trạng thái</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {orders.map((order) => (
                                    <Tr key={order._id} _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}>
                                        <Td fontWeight="medium">{order._id.slice(-8)}</Td>
                                        <Td>{formatDate(order.createdAt)}</Td>
                                        <Td>{order.items.length} sản phẩm</Td>
                                        <Td isNumeric fontWeight="bold" color="blue.500">
                                            {formatVNDPrice(order.totalAmount)}
                                        </Td>
                                        <Td>
                                            <Badge colorScheme={getStatusColor(order.status)}>
                                                {order.status}
                                            </Badge>
                                        </Td>
                                        <Td>
                                            <Button
                                                size="sm"
                                                onClick={() => setSelectedOrder(order)}
                                            >
                                                Chi tiết
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    )}
                </VStack>
            </Box>

            <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Chi tiết đơn hàng #{selectedOrder?._id.slice(-8)}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {selectedOrder && (
                            <VStack spacing={4} align="stretch">
                                <HStack justify="space-between">
                                    <Text color="gray.500">
                                        Ngày đặt: {formatDate(selectedOrder.createdAt)}
                                    </Text>
                                    <Badge colorScheme={getStatusColor(selectedOrder.status)}>
                                        {selectedOrder.status}
                                    </Badge>
                                </HStack>

                                <Divider />

                                {selectedOrder.items.map((item, index) => (
                                    <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
                                        <HStack spacing={4}>
                                            <Image
                                                src={item.product.image}
                                                alt={item.product.name}
                                                boxSize="80px"
                                                objectFit="cover"
                                                borderRadius="md"
                                            />
                                            <VStack align="start" flex="1">
                                                <Text fontWeight="bold">{item.product.name}</Text>
                                                <Text color="gray.500">
                                                    {formatVNDPrice(item.price)} x {item.quantity}
                                                </Text>
                                            </VStack>
                                            <Text fontWeight="bold">
                                                {formatVNDPrice(item.price * item.quantity)}
                                            </Text>
                                        </HStack>
                                    </Box>
                                ))}

                                <Divider />

                                <HStack justify="space-between" pt={2}>
                                    <Heading size="md">Tổng tiền</Heading>
                                    <Heading size="md" color="blue.500">
                                        {formatVNDPrice(selectedOrder.totalAmount)}
                                    </Heading>
                                </HStack>
                            </VStack>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default OrdersPage;