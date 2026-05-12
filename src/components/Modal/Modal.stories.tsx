import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    children: { control: 'text' },
    closeOnBackdropClick: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Helper component to manage open/close state
const ModalWithHooks = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args.children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalWithHooks {...args} />,
  args: {
    title: 'Modal Title',
    children: 'This is the modal content. You can put any React node here.',
    closeOnBackdropClick: true,
    closeOnEsc: true,
  },
};

export const WithActions: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal with Actions</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          actions={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={() => alert('Confirmed!')}>Confirm</Button>
            </>
          }
        >
          {args.children}
        </Modal>
      </>
    );
  },
  args: {
    title: 'Confirm Action',
    children: 'Are you sure you want to proceed?',
  },
};

export const NoTitle: Story = {
  render: (args) => <ModalWithHooks {...args} />,
  args: {
    children: 'This modal has no title bar and no close button.',
    closeOnBackdropClick: true,
  },
};