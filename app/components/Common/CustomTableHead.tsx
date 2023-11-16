import React from 'react';
import {
  Checkbox,
  Flex,
  Text,
  Th,
  Thead,
  Tr,
  useMediaQuery,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { TranslationKey } from '@/app/types/withTranslation';

interface Props {
  headCells: string[];
}

const CustomTableHead: React.FC<Props> = ({ headCells }) => {
  const t = useTranslations('HomePage');
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <Thead>
      <Tr>
        {headCells.map((cell, i) => (
          <Th
            textAlign={i === 0 ? 'left' : 'center'}
            paddingLeft={i === 0 ? 5 : 'auto'}
            key={cell}
            fontSize={!isMobile ? 14 : 8}
          >
            {cell === 'Order ID' ? (
              <Flex alignItems={'center'} gap={8}>
                <Checkbox borderColor="#858D9D" />
                <Text fontSize={!isMobile ? 14 : 8} key={i} fontWeight="500">
                  {t(cell)}
                </Text>
              </Flex>
            ) : (
              <Text key={i} fontWeight="500">
                {t(cell as TranslationKey<'HomePage'>)}
              </Text>
            )}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
};

export default CustomTableHead;
