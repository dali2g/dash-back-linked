import { Button, Label, TextInput } from "flowbite-react";
import type { FC } from "react";
import React, { useState } from "react";
import axios from "axios";

const AddEmployerForm: FC<{ onClose: () => void }> = function ({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    matricule: "",
    site:"",
    echelon:"",
    college:"",
    souscategories:"",
    typecontrat:"",
    etatscivils:"",
    grade:"",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      await axios.post("/employers/employee", formData);
      console.log("data submitted!");
      onClose();
    } catch (error) {
      console.error("error submitting:", error);
    }
  };

  return (
    <form
      className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      onSubmit={handleSubmit}
    >
      <div>
        <Label>Prénom</Label>
        <div className="mt-1">
          <TextInput
            required
            name="firstName"
            placeholder="Votre Prénom"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label>Nom de famille</Label>
        <div className="mt-1">
          <TextInput
            required
            name="lastName"
            placeholder="Votre Nom"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label>E-mail</Label>
        <div className="mt-1">
          <TextInput
            required
            name="email"
            placeholder="Votre Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label>Numéro de mobile</Label>
        <div className="mt-1">
          <TextInput
            required
            name="phone"
            placeholder="+(216)"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label>Genre</Label>
        <div className="mt-1">
          <TextInput
            required
            name="gender"
            placeholder="Genre"
            type="text"
            value={formData.gender}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label>Matricule</Label>
        <div className="mt-1">
          <TextInput
            required
            name="matricule"
            placeholder="Votre Matricule"
            type="number"
            value={formData.matricule}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label>Site</Label>
        <div className="mt-1">
          <TextInput
            required
            name="site"
            placeholder="Votre Site"
            type="text"
            value={formData.site}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label>Echelon</Label>
        <div className="mt-1">
          <TextInput
            required
            name="echelon"
            placeholder="Votre Echelon"
            type="text"
            value={formData.echelon}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label>Sous-Catégories</Label>
        <div className="mt-1">
          <TextInput
            required
            name="souscategories"
            placeholder="Votre Sous-Catégories"
            type="text"
            value={formData.souscategories}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label>Type Contrat</Label>
        <div className="mt-1">
          <TextInput
            required
            name="typecontrat"
            placeholder="Votre Type de contrat"
            type="text"
            value={formData.typecontrat}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label>Etats Civils</Label>
        <div className="mt-1">
          <TextInput
            required
            name="etatscivils"
            placeholder="Votre état civils"
            type="text"
            value={formData.etatscivils}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label>Grade</Label>
        <div className="mt-1">
          <TextInput
            name="grade"
            placeholder="Votre Grade"
            type="text"
            value={formData.grade}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mt-2">
      <Button type="submit" color="primary" OnClick={handleSubmit}>
        Sauvegarder
      </Button>

      </div>
    </form>
  );
};

export default AddEmployerForm;
