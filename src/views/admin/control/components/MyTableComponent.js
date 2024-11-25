import { useState } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon, EditIcon } from '@chakra-ui/icons';

const MyTableComponent = () => {
  const [rows, setRows] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editDescription, setEditDescription] = useState('');

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      reference: `Ref-${rows.length + 1}`,
      description: '',
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleDescriptionChange = (id, value) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, description: value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleEditClick = (row) => {
    setEditRowId(row.id);
    setEditDescription(row.description);
  };

  const handleUpdate = (id) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, description: editDescription };
      }
      return row;
    });
    setRows(updatedRows);
    setEditRowId(null);
    setEditDescription('');
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Table variant="simple">
        <Thead bg="blue.100">
          <Tr>
            <Th>Id</Th>
            <Th>Reference</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <Tr key={row.id}>
                <Td>{row.id}</Td>
                <Td>{row.reference}</Td>
                <Td>
                  <Input
                    value={editRowId === row.id ? editDescription : row.description}
                    onChange={(e) => {
                      if (editRowId === row.id) {
                        setEditDescription(e.target.value);
                      } else {
                        handleDescriptionChange(row.id, e.target.value);
                      }
                    }}
                    placeholder="Enter description here"
                  />
                </Td>
                <Td>
                  <IconButton
                    aria-label="Edit row"
                    icon={<EditIcon />}
                    colorScheme="yellow"
                    onClick={() => handleEditClick(row)}
                  />
                  <IconButton
                    aria-label="Delete row"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => deleteRow(row.id)}
                  />
                  {editRowId === row.id && (
                    <Button
                      leftIcon={<AddIcon />}
                      colorScheme="blue"
                      onClick={() => handleUpdate(row.id)}
                      ml={2}
                    >
                      Update
                    </Button>
                  )}
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={4} textAlign="center">
                No data available
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      <Box mt={4} display="flex" justifyContent="flex-start">
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={addRow}
          mr={2}
        >
          Add Row
        </Button>
      </Box>
    </Box>
  );
};

export default MyTableComponent;
