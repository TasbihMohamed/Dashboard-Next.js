'use client';
import { COLORS } from '@/app/constant/UserDashboard';
import {
  Alert,
  Container,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { RiLock2Line, RiMailLine } from 'react-icons/ri';
import ThemeToggle from '../../Shared/ColorMode/ThemeToggle';
import CustomButton from '@/app/components/Shared/Buttons/CustomButton';
import { TextField } from '@/app/components/Shared/Inputs/TextField';

type LoginProps = {
  onLogin: () => void;
};

const Login = (props: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { colorMode } = useColorMode();
  const { onLogin } = props;

  useEffect(() => {
    if (errorTimeoutRef.current !== null) clearTimeout(errorTimeoutRef.current);
    if (error) {
      errorTimeoutRef.current = setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }, [error]);

  const signIn = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/auth', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (res.status === 401 && data.message) {
        setError(data.message);
      } else if (res.status === 200 && data.token) {
        window.localStorage.setItem('_shoptak-user-session', data.token);
        window.localStorage.setItem(
          '_shoptak-user-data',
          JSON.stringify(data.userData),
        );
        onLogin();
      } else setError('Login failed');
    } catch (e) {
      setError('Login failed');
    }
  };

  return (
    <Container
      background={
        colorMode === 'light'
          ? 'linear-gradient(296.82deg, #F81E6E 0%, #771FCB 100%)'
          : 'transparent'
      }
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      maxWidth={'unset'}
      height={'100vh'}
      position={'relative'}
    >
      <ThemeToggle />
      <motion.div
        initial={{ scale: -1 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        {loading ? (
          <Flex
            width={'100%'}
            height={500}
            align={'center'}
            justify={'center'}
            zIndex={1}
            top={0}
            opacity={0.5}
            borderRadius={15}
            backgroundColor={'#F81E6E'}
            position={'absolute'}
          >
            <Spinner size={'lg'} zIndex={1} color="#771FCB" />
          </Flex>
        ) : (
          ' '
        )}
        <Stack
          width={350}
          height={500}
          borderRadius={15}
          background={colorMode === 'light' ? '#fff' : '#252525'}
          p={50}
          justify={'center'}
          position={'relative'}
        >
          {error ? (
            <Alert padding={2} textAlign={'center'}>
              {error}
            </Alert>
          ) : (
            ''
          )}
          <Image width={250} src="/logo.png" alt="logo" />
          <Text textAlign={'center'}>Welcome Back</Text>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <RiMailLine color="#667085" />
            </InputLeftElement>
            <Input
              placeholder="Email address"
              value={email}
              type={'email'}
              onChange={event => setEmail(event.target.value)}
              variant="outline"
              color="#667085"
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <RiMailLine color="#667085" />
            </InputLeftElement>
            <Input
              placeholder="Password"
              value={password}
              type={'password'}
              onChange={event => setPassword(event.target.value)}
              variant="outline"
              color="#667085"
            />
          </InputGroup>
          <Link href={'#'}>
            <Text fontSize={14}>Forget Password?</Text>
          </Link>
          <CustomButton
            bg={COLORS._primaryColor}
            textColor="white"
            size="md"
            buttonTitle={'Login'}
            fontSize={14}
            my={2}
            onClick={signIn}
          />
        </Stack>
      </motion.div>
    </Container>
  );
};

export default Login;
