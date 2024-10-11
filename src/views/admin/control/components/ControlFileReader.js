import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Importer useDispatch
import { AddRiskControl } from 'redux/riskControl/action';
import * as XLSX from 'xlsx';

const ExcelReader = () => {
  const [fileData, setFileData] = useState(null);
  const dispatch = useDispatch(); // Initialiser dispatch

  // Fonction pour gérer l'upload du fichier Excel
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convertir la feuille en JSON (tableau de tableaux)
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const formattedData = processData(jsonData); // Traiter les données selon le format requis

      setFileData(formattedData);
      console.log("Données Formatées :", formattedData);

      // Appeler dispatch pour envoyer les données à la base de données
      dispatch(AddRiskControl(formattedData)); // Envoyer les données formatées
    };

    reader.readAsArrayBuffer(file);
  };

  // Fonction pour traiter les données du tableau
  const processData = (data) => {
    const headerRow = data[8]; // Ligne d'en-tête (9ème ligne, basé sur ta description)

    // Mapping des anciennes clés vers les nouvelles clés pour `risks`
    const riskKeyMapping = {
      "S/N": "serialNumber",
      "Departement/ Fonction": "departmentFunction",
      "Produits/Processus/Description du système ": "productProcessDescription",
      "Processus Sous traités": "outsourcedProcess",
      "Catégorie du Risque": "riskCategory",
      "\r\nCatégorie de l'évenement du risque": "riskEventCategory",
      "Catégorie causale": "causalCategory",
      "Résumé Sommaire du Risque clé": "keyRiskSummary",
      "Description du risque clé": "keyRiskDescription",
      "\r\nProbabilité d'Occurrence du risque": "riskProbability",
      "Impact du risque": "riskImpact",
      "Total": "total",
      "Niveau du Risque": "riskLevel"
    };

    // Mapping des clés pour `controls` (ajoutez ou modifiez selon vos besoins)
    const controlKeyMapping = {
      "Résumé du contrôle de clé": "keyControlSummary",
      "Description du contrôle de clé": "keyControlDescription",
      "Description de la méthodologie de surveillance du contrôle (plan de test)": "controlMonitoringMethodology",
      "Note du Contrôle": "controlRating",
      "\r\nNiveau du risque résiduel": "residualRiskLevel",
      "Control Preventife/Detectif": "preventiveDetective",
      "Cycle du suivi": "monitoringCycle",
      "Source de documents  consultés": "documentSource",
      "Existing/New/Obsolete": "controlStatus"
    };

    // Initialiser les tableaux `risks` et `controls`
    const risks = [];
    const controls = [];

    // Parcourir chaque ligne du tableau à partir de la 10ème (les données)
    for (let i = 9; i < data.length; i++) {
      const row = data[i];

      // Créer des objets individuels pour chaque ligne dans `risks`
      const riskObj = {};
      let hasRiskData = false; // Flag pour vérifier si la ligne contient des données valides pour les risques
      for (const [oldKey, newKey] of Object.entries(riskKeyMapping)) {
        const value = row[headerRow.indexOf(oldKey)];
        if (value) {
          riskObj[newKey] = value;
          hasRiskData = true; // Marque la ligne comme valide si elle contient des données
        } else {
          riskObj[newKey] = ''; // Remplir avec une chaîne vide si aucune donnée n'existe
        }
      }
      if (hasRiskData) risks.push(riskObj); // Ajouter uniquement si des données sont présentes

      // Créer des objets individuels pour chaque ligne dans `controls`
      const controlObj = {};
      let hasControlData = false; // Flag pour vérifier si la ligne contient des données valides pour les contrôles
      for (const [oldKey, newKey] of Object.entries(controlKeyMapping)) {
        const value = row[headerRow.indexOf(oldKey)];
        if (value) {
          controlObj[newKey] = value;
          hasControlData = true; // Marque la ligne comme valide si elle contient des données
        } else {
          controlObj[newKey] = ''; // Remplir avec une chaîne vide si aucune donnée n'existe
        }
      }
      if (hasControlData) controls.push(controlObj); // Ajouter uniquement si des données sont présentes
    }

    // Si le nombre de risques est différent du nombre de contrôles, équilibrer
    while (risks.length < controls.length) {
      risks.push({}); // Ajouter des objets vides pour équilibrer
    }
    while (controls.length < risks.length) {
      controls.push({}); // Ajouter des objets vides pour équilibrer
    }

    // Retourner la structure finale avec les tableaux `risks` et `controls`
    return { risks, controls };
  };

  return (
    <div>
      <h2>Upload et Traitement d'un Fichier Excel</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      {fileData && (
        <div>
          <h3>Contenu Formaté :</h3>
          <pre>{JSON.stringify(fileData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ExcelReader;
