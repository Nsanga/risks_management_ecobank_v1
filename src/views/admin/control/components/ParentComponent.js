import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import BulkAmendModal from "./BulkAmendModal";

const ParentComponent = () => {
  const [selectedRows, setSelectedRows] = useState([]); // État pour stocker les IDs des risques sélectionnés
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Exemple de données de risques
  const risks = [
    { id: "1", name: "Risque 1" },
    { id: "2", name: "Risque 2" },
    { id: "3", name: "Risque 3" },
  ];

  // Fonction pour gérer la sélection des risques
  const handleRiskSelection = (riskId) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(riskId)) {
        // Si le risque est déjà sélectionné, le retirer
        return prevSelected.filter((id) => id !== riskId);
      } else {
        // Sinon, l'ajouter
        return [...prevSelected, riskId];
      }
    });
  };

  // Fonction pour enregistrer les modifications
  const handleSave = (data) => {
    console.log("Données à enregistrer :", data);
    // Ici, vous pouvez envoyer les données à votre API ou effectuer d'autres traitements
  };

  return (
    <div>
      {/* Liste des risques avec des cases à cocher pour la sélection */}
      {risks.map((risk) => (
        <div key={risk.id}>
          <label>
            <input
              type="checkbox"
              checked={selectedRows.includes(risk.id)}
              onChange={() => handleRiskSelection(risk.id)}
            />
            {risk.name}
          </label>
        </div>
      ))}

      {/* Bouton pour ouvrir la modal */}
      <Button onClick={() => setIsModalOpen(true)}>Ouvrir la modal</Button>

      {/* Modal pour le bulk amend */}
      <BulkAmendModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profiles={[
          { _id: "1", name: "John Doe" },
          { _id: "2", name: "Jane Smith" },
          { _id: "3", name: "Alice Johnson" },
        ]}
        onSave={handleSave}
        selectedRows={selectedRows} // Passer les IDs des risques sélectionnés
      />
    </div>
  );
};

export default ParentComponent;