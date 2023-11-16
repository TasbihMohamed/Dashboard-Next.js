import { Box, Button, Flex, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { BsLightbulb, BsMoonFill } from 'react-icons/bs';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box position={'absolute'} zIndex={1} right={5} bottom={5}>
      <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? (
          <Flex gap={1} align={'center'}>
            <BsMoonFill /> <Text>Dark</Text>
          </Flex>
        ) : (
          <Flex gap={1} align={'center'}>
            <BsLightbulb /> <Text>Light</Text>
          </Flex>
        )}
      </Button>
    </Box>
  );
};

export default ThemeToggle;
