import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';


const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const { addToCart } = useCart();


	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");
	const toast = useToast();

	const { deleteProduct, updateProduct } = useProductStore();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Sản phẩm cập nhật thành công",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleAddToCart = () => {
		try {
			addToCart(product);
		} catch (error) {
			toast({
				title: "Error",
				description: "Không thể thêm sản phẩm vào giỏ hàng",
				status: "error",
				duration: 2000,
				isClosable: true,
			});
		}
	};


	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					{product.price}đ
				</Text>


				<VStack spacing={2}>
					<HStack spacing={2} w="full">
						<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
						<IconButton
							icon={<DeleteIcon />}
							onClick={() => handleDeleteProduct(product._id)}
							colorScheme='red'
						/>
					</HStack>
					<Button
						colorScheme="blue"
						w="full"
						onClick={handleAddToCart}

					>
						Thêm vào giỏ hàng
					</Button>
					<Button
						as={RouterLink}
						to={`/product/${product._id}`}
						colorScheme="blue"
						variant="outline"
						size="md"
						w="full"
					>
						Xem chi tiết sản phẩm
					</Button>
				</VStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Cập nhật sản phẩm</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Tên'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder='Giá'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								placeholder='URL hình ảnh'
								name='image'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Cập nhật
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Hủy
						</Button>
					</ModalFooter>

				</ModalContent>
			</Modal>
		</Box>
	);
};
export default ProductCard;
