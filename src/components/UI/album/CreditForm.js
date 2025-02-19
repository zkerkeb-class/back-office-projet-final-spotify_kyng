import React, { useState } from 'react';
import Input from '../form/Input';
import RadioGroup from '../form/RadioGroup';

const CreditForm = ({ credits, onCreditsChange }) => {
  const [newCredit, setNewCredit] = useState({ name: '', role: 'Producteur' });

  const addCredit = () => {
    if (newCredit.name && newCredit.role) {
      const updatedCredits = [...credits, { ...newCredit, id: Date.now().toString() }];
      onCreditsChange(updatedCredits);
      setNewCredit({ name: '', role: 'Producteur' });
    }
  };
  console.log([newCredit, credits]);
  

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Crédits</h3>
      <ul className="space-y-2">
        {credits.map((credit) => (
          <li
            key={credit.id}
            className="flex items-center space-x-2 p-2 bg-secondary rounded"
          >
            <span>{credit.name}</span>
            <span className="ml-auto">{credit.role}</span>
          </li>
        ))}
      </ul>
      <div className="flex space-x-2">
        <div className="flex-1">
          <Input
            id="creditName"
            label="Nom"
            value={newCredit.name}
            onChange={(e) => setNewCredit({ ...newCredit, name: e.target.value })}
          />
        </div>
        <div className="flex-1">
          <RadioGroup
            options={['Producteur', 'Compositeur', 'Auteur', 'Interprète']}
            value={newCredit.role}
            onChange={(val) => setNewCredit({ ...newCredit, role: val })}
            label="Rôle"
            name="creditRole"
          />
        </div>
        <div className="flex items-end">
          <button
            type="button"
            className="bg-black text-white p-2 h-min rounded-md"
            onClick={addCredit}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditForm;
