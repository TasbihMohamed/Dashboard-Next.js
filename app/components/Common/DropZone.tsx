import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputProps,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { COLORS } from '@/app/constant/UserDashboard';
import { HiOutlinePhotograph } from 'react-icons/hi';
import React, { useRef, useState } from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { ProductImg } from '@/app/types/UserDashboard';

interface DropZoneProps extends InputProps {
  label: string;
  subtitle: string;
  buttonText: string;
  onUpload?: (_files: File[]) => void;
  errorMessage?: string;
}

export default function DropZone({
  label,
  subtitle,
  buttonText,
  onUpload,
  errorMessage,
  ...inputProps
}: DropZoneProps) {
  const { colorMode } = useColorMode();
  const ImageDrag = useRef<HTMLImageElement | null>(null);
  const [ImagesList, setImageList] = useState<Array<ProductImg>>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [key, setKey] = useState('0');

  const onImageUpload = (e: React.ChangeEvent) => {
    const photo = e.target as HTMLInputElement;
    if (photo.files?.length) {
      const ImageURL = URL.createObjectURL(photo.files[0]);
      const Image = { photoURL: ImageURL, id: ImagesList.length };
      setImageList(images => [...images, Image]);
      const images = [...files, photo.files[0]] as File[];
      setFiles(images);
      if (onUpload) onUpload(images);
    }
  };

  const removeImg = (photoId: number, index: number) => {
    setImageList(images => images.filter(photo => photo.id !== photoId));
    setFiles(files => files.filter((_, idx) => index !== idx));
    setKey(key => String(+key + 1));
  };

  return (
    <Box>
      <Text
        fontWeight="medium"
        mb={1}
        color={COLORS._grayOne}
        mt={5}
        fontSize={14}
      >
        {label}
      </Text>
      <Flex
        justify="center"
        align="center"
        flexDirection="column"
        gap="1rem"
        backgroundColor={colorMode === 'light' ? '#F9F9FC' : ''}
        padding={5}
        borderRadius={5}
        transition="0.4s"
        border="1px dashed #E0E2E7"
        onDragOver={() => {
          if (!ImageDrag.current) return;
          ImageDrag.current.style.backgroundColor = COLORS._grayOne;
        }}
        onDragLeave={() => {
          if (!ImageDrag.current) return;
          ImageDrag.current.style.backgroundColor = 'white';
        }}
        onDragEnd={() => {
          if (!ImageDrag.current) return;
          ImageDrag.current.style.backgroundColor = 'white';
        }}
        ref={ImageDrag}
      >
        {ImagesList.length == 0 ? (
          <Flex
            justifyContent="center"
            borderRadius="50%"
            alignItems="center"
            backgroundColor={COLORS._lightSelectedTwo}
            width="40px"
            height="40px"
          >
            <Flex
              borderRadius="50%"
              backgroundColor={COLORS._lightSelected}
              width="30px"
              height="30px"
              justifyContent="center"
              alignItems="center"
            >
              <HiOutlinePhotograph fontSize={24} color={COLORS._primaryColor} />
            </Flex>
          </Flex>
        ) : (
          <Flex gap="1rem" flexWrap="wrap">
            {ImagesList.map((image, index) => (
              <Box key={+index}>
                <Image
                  backgroundColor="#E0E2E7"
                  borderRadius={8}
                  width={100}
                  height={100}
                  objectFit="cover"
                  alt={`Image ${index}`}
                  key={image.id}
                  src={image.photoURL}
                  transition="0.4s"
                  cursor="pointer"
                  _hover={{ filter: 'grayscale(60%)' }}
                  borderBottomRadius={0}
                />
                <Flex align="center" gap={1} justifyContent="center">
                  <Button
                    onClick={() => removeImg(image.id, index)}
                    width={100}
                    borderTopRadius={0}
                    backgroundColor="#E0E2E7"
                  >
                    <Text textAlign="center" color={COLORS._altColor}>
                      <HiMiniXMark size="1.5rem" />
                    </Text>
                  </Button>
                </Flex>
              </Box>
            ))}
          </Flex>
        )}

        <Text color="gray.400">{subtitle}</Text>
        <Input
          onChange={onImageUpload}
          id="photoUploader"
          hidden
          type="file"
          accept=".png, .jpeg"
          key={key}
          {...inputProps}
        />

        <Button
          transition="0.4s"
          borderRadius={5}
          _hover={{
            backgroundColor: COLORS._grayOne,
            color: '#fff',
          }}
          color={COLORS._primaryColor}
          backgroundColor={COLORS._primaryColor100}
          fontSize="0.875rem"
          fontWeight={600}
          lineHeight={1.42857}
          as="label"
          htmlFor="photoUploader"
        >
          {buttonText}
        </Button>
      </Flex>
      {errorMessage && (
        <Box
          display="flex"
          gap={2}
          mt="0.5rem"
          fontSize="0.75rem"
          lineHeight={1.5}
          alignItems="center"
          color="red.500"
        >
          {errorMessage}
        </Box>
      )}
    </Box>
  );
}
