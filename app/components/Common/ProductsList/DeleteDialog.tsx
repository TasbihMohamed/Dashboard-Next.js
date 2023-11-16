import { useDisclosure } from '@chakra-ui/hooks';
import { useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/modal';
import { Button } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

interface DeleteDialogProps extends ReturnType<typeof useDisclosure> {
  onDelete: () => Promise<void>;
}

export default function DeleteDialog({
  isOpen,
  onClose,
  onDelete,
}: DeleteDialogProps) {
  const t = useTranslations('HomePage');
  const cancelRef = useRef(null);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t('Delete Product')}
            </AlertDialogHeader>

            <AlertDialogBody>{t('confirmation_message')}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t('Cancel')}
              </Button>
              <Button
                colorScheme="red"
                isLoading={isDeleting}
                onClick={async () => {
                  setIsDeleting(true);
                  await onDelete();
                  setIsDeleting(false);
                  onClose();
                }}
                ml={3}
              >
                {t('Delete')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
