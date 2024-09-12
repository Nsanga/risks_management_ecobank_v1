import React from 'react'; 
import { createRoot } from 'react-dom/client'; // For React 18
import { Card } from '@chakra-ui/react'; // Import Card component
import Addcontrol from './Addcontrol';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Card p={4} boxShadow="lg">
      <Addcontrol />
    </Card>
  </React.StrictMode>
);

