import React, { useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  CardBody,
  Heading,
  Text,
  Progress,
  Badge,
  Icon,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
  Image,
  Flex
} from '@chakra-ui/react';
import { connect, useDispatch } from 'react-redux';
import Loader from "../../../assets/img/loader.gif";
import { FaCalendar, FaShield, FaUser } from 'react-icons/fa6';
import { FiActivity, FiTrendingUp } from 'react-icons/fi';
import { allStats } from 'redux/stats/action';

const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  color,
  bgGradient,
  progress,
  additionalInfo,
  rightElement
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Card
      bg={cardBg}
      shadow="xl"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)', shadow: '2xl' }}
    >
      <Box
        h="4px"
        bgGradient={bgGradient}
      />
      <CardBody p={6}>
        <HStack justify="space-between" mb={4}>
          <Box flex={1}>
            <Text fontSize="sm" color={textColor} fontWeight="medium">
              {title}
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color={color} mt={1}>
              {value}
            </Text>
          </Box>

          {rightElement && (
            <Box alignSelf="flex-start">
              {rightElement}
            </Box>
          )}

          <Box
            p={3}
            borderRadius="full"
            bg={`${color.split('.')[0]}.50`}
            ml={2}
          >
            <Icon as={icon} w={6} h={6} color={color} />
          </Box>
        </HStack>

        {subtitle && (
          <Text fontSize="sm" color={textColor}>
            {subtitle}
          </Text>
        )}

        {progress !== undefined && progress !== null && (
          <Box mt={3}>
            <Progress
              value={progress}
              colorScheme={color.split('.')[0]}
              borderRadius="full"
              size="sm"
            />
            <Text fontSize="xs" color={textColor} mt={1}>
              {progress}% de progression
            </Text>
          </Box>
        )}

        {additionalInfo && (
          <Box mt={3}>
            {additionalInfo}
          </Box>
        )}
      </CardBody>
    </Card>
  );
};

const Dashboard = ({ stats, loading }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allStats());
  }, [dispatch]);

  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50)',
    'linear(to-br, gray.900, gray.800)'
  );

  const headerBg = useColorModeValue('white', 'gray.800');
  const userRole = localStorage.getItem('role');

  return (
    <Box minH="100vh" bg={bgGradient} p={8} mt={14}>
      {loading ? (
        <Flex alignItems="center" justifyContent="center" width="100%">
          <Image src={Loader} alt="Loading..." height={25} width={25} />
        </Flex>
      ) : (
        <VStack spacing={8} maxW="7xl" mx="auto">
          {/* Header */}
          {/* <Card w="full" bg={headerBg} shadow="lg" borderRadius="xl">
          <CardBody p={6}>
            <VStack spacing={2}>
              <Heading
                size="xl"
                bgGradient="linear(to-r, blue.400, purple.500)"
                bgClip="text"
                textAlign="center"
              >
                Tableau de Bord des Statistiques
              </Heading>
              <Text color="gray.600" textAlign="center">
                Vue d'ensemble de vos métriques et indicateurs clés
              </Text>
            </VStack>
          </CardBody>
        </Card> */}

          {/* Stats Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="full">
            {/* Events */}
            <StatsCard
              title="Event"
              value={stats?.events?.byStatus[0]?.count || 0}
              subtitle={`Total event saved: ${stats?.events?.totalPerteSave || 0}`}
              icon={FaCalendar}
              color="blue.500"
              bgGradient="linear(to-r, blue.400, blue.600)"
            />

            {/* Indicators */}
            <StatsCard
              title="KRI"
              value={stats?.statKriOrRcsa?.totalKRI}
              subtitle={`${stats?.indicators?.achieved} capturé sur ${stats?.statKriOrRcsa?.totalKRI}`}
              icon={FiTrendingUp}
              color="green.500"
              bgGradient="linear(to-r, green.400, green.600)"
              progress={stats?.indicators?.total > 0 ? (stats?.indicators?.achieved / stats?.indicators?.total) * 100 : 0}
            />

            {/* Actions */}
            <StatsCard
              title="Actions"
              value={stats?.statAction?.allAction}
              subtitle={`${stats?.statAction?.totalActionsKRI} KRI, ${stats?.statAction?.totalActionsRCSA} RCSA`}
              icon={FiActivity}
              color="orange.500"
              bgGradient="linear(to-r, orange.400, orange.600)"
              progress={stats?.statAction?.allAction > 0 ? ((stats?.statAction?.totalActionsKRI + stats?.statAction?.totalActionsRCSA) / stats?.actions?.total) * 100 : 0}
            />

            {/* Risks */}
            <StatsCard
              title="RCSA"
              value={stats?.statKriOrRcsa?.totalControlsRCSA + stats?.statKriOrRcsa?.totalKRI}
              subtitle={`${stats?.statKriOrRcsa?.totalControlsRCSA} Risks and Controls`}
              icon={FaShield}
              color="red.500"
              bgGradient="linear(to-r, red.400, red.600)"
            />

            {/* User */}
            {userRole !== 'inputeurs' && userRole !== 'validated' && (
              <StatsCard
                title="Utilisateurs"
                value={stats?.profiles?.total || 0}
                subtitle={
                  stats?.profiles
                    ? `Actifs: ${stats.profiles.byStatus.active} | Inactifs: ${stats.profiles.byStatus.inactive}`
                    : "Chargement..."
                }
                icon={FaUser}  // Changé pour une icône utilisateur plus appropriée
                color="purple.500"  // Changé la couleur pour différencier des risques
                bgGradient="linear(to-r, purple.400, purple.600)"
              />
            )}
          </SimpleGrid>

          {/* Detailed Stats */}
          <Card w="full" bg={headerBg} shadow="lg" borderRadius="xl">
            <CardBody p={6}>
              <Heading size="md" mb={6} color="gray.700">
                Détails des Métriques
              </Heading>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                <VStack align="stretch" spacing={4}>
                  <Box>
                    <HStack justify="space-between" mb={3}>
                      <Text fontWeight="semibold" color="gray.700">État des Indicateurs</Text>
                      <Badge colorScheme={stats?.indicators?.achieved === 0 ? 'red' : 'green'}>
                        {stats?.indicators?.achieved === 0 ? 'À démarrer' : 'En cours'}
                      </Badge>
                    </HStack>
                    <Progress
                      value={stats?.indicators?.total > 0 ? (stats?.indicators?.achieved / stats?.indicators?.total) * 100 : 0}
                      colorScheme="green"
                      borderRadius="full"
                      size="lg"
                    />
                    <Text fontSize="sm" color="gray.600" mt={2}>
                      {stats?.indicators?.achieved} / {stats?.indicators?.total} indicateurs réalisés
                    </Text>
                  </Box>

                  <Divider />

                  <Box>
                    <Text fontWeight="semibold" color="gray.700" mb={3}>Statut des Actions</Text>
                    <VStack spacing={2} align="stretch">
                      <HStack justify="space-between">
                        <Text fontSize="sm">Total</Text>
                        <Badge>{stats?.actions?.total}</Badge>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontSize="sm">Terminées</Text>
                        <Badge colorScheme="green">{stats?.actions?.completed}</Badge>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontSize="sm">En retard</Text>
                        <Badge colorScheme="red">{stats?.actions?.overdue}</Badge>
                      </HStack>
                    </VStack>
                  </Box>
                </VStack>

                <VStack align="stretch" spacing={4}>
                  <Box>
                    <Text fontWeight="semibold" color="gray.700" mb={3}>Analyse des Risques</Text>
                    <VStack spacing={3} align="stretch">
                      <HStack justify="space-between">
                        <Text fontSize="sm">Contrôles totaux</Text>
                        <Badge colorScheme="blue">{stats?.risks?.totalControls}</Badge>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontSize="sm">Efficacité moyenne</Text>
                        <Badge colorScheme={stats?.risks?.averageEffectiveness ? 'green' : 'gray'}>
                          {stats?.risks?.averageEffectiveness ? `${stats?.risks?.averageEffectiveness}%` : 'N/A'}
                        </Badge>
                      </HStack>
                    </VStack>
                  </Box>

                  <Divider />

                  <Box>
                    <Text fontWeight="semibold" color="gray.700" mb={3}>Événements</Text>
                    <Text fontSize="sm" color="gray.600">
                      {stats?.events?.byStatus[0]?.count || 0} événements enregistrés au total
                    </Text>
                  </Box>
                </VStack>
              </SimpleGrid>
            </CardBody>
          </Card>
        </VStack>
      )}
    </Box>
  );
};

const mapStateToProps = ({ StatReducer }) => ({
  stats: StatReducer.stats,
  loading: StatReducer.loading,
});

export default connect(mapStateToProps)(Dashboard);
