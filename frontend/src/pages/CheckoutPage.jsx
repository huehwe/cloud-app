import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    VStack,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
    const [isVerifying, setIsVerifying] = useState(false);
    const [otp, setOtp] = useState('');
    const { user } = useAuth();
    const { cartItems } = useCart();
    const toast = useToast();

    const handleSendOTP = async () => {
        try {
            const response = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user.email })
            });

            if (response.ok) {
                setIsVerifying(true);
                toast({
                    title: 'OTP Sent',
                    description: 'Please check your email for the verification code',
                    status: 'success'
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error'
            });
        }
    };

    const handleCheckout = async () => {
        if (!user.isEmailVerified) {
            handleSendOTP();
            return;
        }

        // Proceed with checkout
    };

    return (
        <Container maxW="container.md" py={8}>
            <VStack spacing={4}>
                {/* Checkout form */}
                <Button
                    colorScheme="blue"
                    w="full"
                    onClick={handleCheckout}
                >
                    {user.isEmailVerified ? 'Complete Checkout' : 'Verify Email to Checkout'}
                </Button>
            </VStack>

            <Modal isOpen={isVerifying} onClose={() => setIsVerifying(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Email Verification</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <Button colorScheme="blue" onClick={handleVerifyOTP}>
                                Verify OTP
                            </Button>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    );
};