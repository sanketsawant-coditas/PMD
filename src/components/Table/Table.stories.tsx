import type { Meta, StoryObj } from '@storybook/react';
import { Table, type Column } from './Table';

// Sample data type for demonstration
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
}

const sampleData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'user', status: 'inactive' },
];

const columns: Column<User>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  {
    key: 'status',
    header: 'Status',
    render: (value) => (
      <span style={{ color: value === 'active' ? 'green' : 'red' }}>
        {value}
      </span>
    ),
  },
];

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Table<User>>;

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
  },
};

export const EmptyState: Story = {
  args: {
    columns,
    data: [],
  },
};

export const WithCustomClassName: Story = {
  args: {
    columns,
    data: sampleData,
    className: 'custom-table-class',
  },
  parameters: {
    docs: {
      description: {
        story: 'Applies custom CSS class to the table wrapper.',
      },
    },
  },
};