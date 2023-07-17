import { Button, Label, TextInput } from "flowbite-react";
import type { FC } from "react";
import React, { useState } from "react";
import axios from "axios";

interface Responsable {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  matricule: string;
  password: string;
}

interface EditResponsableFormProps {
  responsable: Responsable;
  onClose: () => void;
}

const EditResponsableForm: FC<EditResponsableFormProps> = function ({
  responsable,
  onClose,
}) {
  const [formData, setFormData] = useState({
    firstName: responsable.firstName,
    lastName: responsable.lastName,
    email: responsable.email,
    phone: responsable.phone,
    gender: responsable.gender,
    matricule: responsable.matricule,
    password: responsable.password,
    confirmPassword: responsable.password,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // try {
    //   await axios.post("/users/responsables", formData);
    //   console.log("data submitted!");
    //   onClose();
    // } catch (error) {
    //   console.error("error submitting:", error);
    // }
  };

  return (
    <form
      className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      onSubmit={handleSubmit}
    >
      <div>
        <Label htmlFor="firstName">Prénom</Label>
        <div className="mt-1">
          <TextInput
            name="firstName"
            placeholder="Mohamed Ali"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label>Nom de famille</Label>
        <div className="mt-1">
          <TextInput
            name="lastName"
            placeholder="Mejdi"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label>E-mail</Label>
        <div className="mt-1">
          <TextInput
            name="email"
            placeholder="medali.mejdi@autoroutes.tn"
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
            name="phone"
            placeholder="+(216) 22 222 222"
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
            name="gender"
            placeholder="Homme"
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
            name="matricule"
            placeholder="XXX XXX XXX"
            type="text"
            value={formData.matricule}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label>Mot de passe</Label>
        <div className="mt-1">
          <TextInput
            name="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        <Label>Confirmer le mot de passe</Label>
        <div className="mt-1">
          <TextInput
            name="confirmPassword"
            placeholder="••••••••"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <Button type="submit" color="primary">
        Sauvegarder
      </Button>
    </form>
  );
};

export default EditResponsableForm;
