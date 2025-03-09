import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatVNDPrice } from '../utils/formatters';

import {
  Box,
  Container,
  Image,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  useToast,
  Spinner,
  useColorModeValue
} from '@chakra-ui/react';

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleAddToCart = () => {
    try {
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });

      toast({
        title: 'Thành công',
        description: `Đã thêm ${product.name} vào giỏ hàng`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể thêm vào giỏ hàng',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, toast]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container maxW="container.md" py={8}>
        <Text>Sản phẩm không tồn tại</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <Box
        p={6}
        bg={bgColor}
        boxShadow="lg"
        borderRadius="lg"
      >
        <VStack spacing={6} align="stretch">
          <Image
            src={product.image}
            alt={product.name}
            borderRadius="md"
            objectFit="cover"
            maxH="400px"
            w="full"
          />

          <VStack align="stretch" spacing={3}>
            <Heading size="lg">{product.name}</Heading>
            <Text fontSize="2xl" fontWeight="bold" color="blue.500">
              {formatVNDPrice(product.price)}
            </Text>

            <HStack spacing={4}>
              <Button colorScheme="blue" size="lg"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ
              </Button>
              <Button colorScheme="gray" size="lg"
                onClick={handleGoBack}>
                Quay lại
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </Container>
  );
};

export default ProductDetailsPage;