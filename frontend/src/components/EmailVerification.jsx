import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    VStack,
    PinInput,
    PinInputField,
    Button,
    Text,
    useToast,
    HStack
} from '@chakra-ui/react';

const EmailVerification = ({ isOpen, onClose, email }) => {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleVerify = async () => {
        if (!otp || otp.length !== 6) {
            toast({
                title: 'Error',
                description: 'Please enter a valid 6-digit OTP',
                status: 'error',
                duration: 3000,
                isClosable: true
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, otp })
            });

            const data = await response.json();
            console.log('Verification response:', data);

            if (response.ok) {
                toast({
                    title: 'Success',
                    description: data.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true
                });
                onClose();
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            const response = await fetch('/api/auth/resend-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                toast({
                    title: 'Thành công',
                    description: 'Mã OTP mới đã được gửi đến email của bạn',
                    status: 'success',
                    duration: 3000,
                    isClosable: true
                });
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            toast({
                title: 'Lỗi',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Verify Your Email</ModalHeader>
                <ModalBody pb={6}>
                    <VStack spacing={4}>
                        <Text>Enter the verification code sent to {email}</Text>
                        <HStack>
                            <PinInput otp value={otp} onChange={setOtp}>
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </HStack>
                        <Button
                            colorScheme="blue"
                            onClick={handleVerify}
                            isLoading={isLoading}
                            width="full"
                        >
                            Verify
                        </Button>
                        <Button variant="link" onClick={handleResend}>
                            Gửi lại mã
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EmailVerification;