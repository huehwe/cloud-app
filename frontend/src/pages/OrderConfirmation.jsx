import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack,
    useColorModeValue
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
    const bg = useColorModeValue('white', 'gray.800');

    return (
        <Container maxW="container.md" py={8}>
            <Box p={8} bg={bg} borderRadius="lg" shadow="md">
                <VStack spacing={4} align="stretch">
                    <Heading>Order Confirmed!</Heading>
                    <Text>Thank you for your purchase.</Text>
                    <Button as={Link} to="/" colorScheme="blue">
                        Continue Shopping
                    </Button>
                </VStack>
            </Box>
        </Container>
    );
};

export default OrderConfirmation;