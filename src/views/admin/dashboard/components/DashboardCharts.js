import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';

const StatsPieCharts = ({ stats, userRole }) => {
  // Couleurs pour les graphiques
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Préparation des données pour chaque graphique
  const eventsData = [
    { name: 'Events', value: stats?.events?.byStatus[0]?.count || 0 },
    { name: 'Others', value: (stats?.events?.totalPerteSave ? 1 : 0) } // Valeur illustrative
  ];

  const kriData = [
    { name: 'Capturés', value: stats?.indicators?.achieved || 0 },
    { name: 'Manquants', value: (stats?.statKriOrRcsa?.totalKRI || 0) - (stats?.indicators?.achieved || 0) }
  ];

  const actionsData = [
    { name: 'Actions KRI', value: stats?.statAction?.totalActionsKRI || 0 },
    { name: 'Actions RCSA', value: stats?.statAction?.totalActionsRCSA || 0 },
    { name: 'Autres', value: (stats?.statAction?.allAction || 0) - ((stats?.statAction?.totalActionsKRI || 0) + (stats?.statAction?.totalActionsRCSA || 0)) }
  ];

  const risksData = [
    { name: 'Contrôles RCSA', value: stats?.statKriOrRcsa?.totalControlsRCSA || 0 },
    { name: 'KRI', value: stats?.statKriOrRcsa?.totalKRI || 0 }
  ];

  const usersData = userRole !== 'inputeurs' && userRole !== 'validated' ? [
    { name: 'Actifs', value: stats?.profiles?.byStatus?.active || 0 },
    { name: 'Inactifs', value: stats?.profiles?.byStatus?.inactive || 0 }
  ] : null;

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