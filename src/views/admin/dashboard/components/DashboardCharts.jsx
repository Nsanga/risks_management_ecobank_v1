import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';

const StatsPieCharts = ({ stats, userRole }) => {
  // Couleurs pour les graphiques
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Préparation des données pour chaque graphique
  const approved = stats?.events?.byStatus?.find(s => s._id === 'approved') || { count: 0 };
  const rejected = stats?.events?.byStatus?.find(s => s._id === 'rejected') || { count: 0 };
  const totalEvents = stats?.events?.byStatus?.reduce((acc, curr) => acc + curr.count, 0) || 1;

  const eventsData = [
    { name: 'Approved', value: Math.round((approved.count / totalEvents) * 100) },
    { name: 'Unapproved', value: Math.round((rejected.count / totalEvents) * 100) } 
  ];

  const kriData = [
    { name: 'Capturés', value: stats?.indicators?.achieved || 0 },
    { name: 'Manquants', value: (stats?.statKriOrRcsa?.totalKRI || 0) - (stats?.indicators?.achieved || 0) }
  ];

  const risksData = [
    { name: 'Contrôles RCSA', value: stats?.statKriOrRcsa?.totalControlsRCSA || 0 },
    { name: 'KRI', value: stats?.statKriOrRcsa?.totalKRI || 0 }
  ];

  const renderCustomizedLabel = ({ name, percent }) => {
    return `${name}: ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={2} p={4}>
      {/* Graphique Événements */}
      <Box boxShadow="md" p={4} borderRadius="lg">
        <Heading size="sm" mb={2}>Events</Heading>
        <Text fontSize="sm" mb={4}>Total amount: {stats?.events?.totalPerteSave || 0} {stats?.events?.currency}</Text>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={eventsData}
              cx="50%"
              cy="50%"
              label={renderCustomizedLabel}
              outerRadius={80}
              dataKey="value"
            >
              {eventsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Graphique KRI */}
      <Box boxShadow="md" p={4} borderRadius="lg">
        <Heading size="sm" mb={2}>KRI</Heading>
        <Text fontSize="sm" mb={4}>{stats?.indicators?.achieved} capturé sur {stats?.statKriOrRcsa?.totalKRI}</Text>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={kriData}
              cx="50%"
              cy="50%"
              label={renderCustomizedLabel}
              outerRadius={80}
              dataKey="value"
            >
              {kriData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Graphique RCSA */}
      <Box boxShadow="md" p={4} borderRadius="lg">
        <Heading size="sm" mb={2}>RCSA</Heading>
        <Text fontSize="sm" mb={4}>{stats?.statKriOrRcsa?.totalControlsRCSA} Controls</Text>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={risksData}
              cx="50%"
              cy="50%"
              label={renderCustomizedLabel}
              outerRadius={80}
              dataKey="value"
            >
              {risksData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </SimpleGrid>
  );
};

export default StatsPieCharts;