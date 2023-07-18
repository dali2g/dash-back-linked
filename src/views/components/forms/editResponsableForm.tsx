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
  const [firstName, setFirstName] = useState(responsable.firstName);
  const [lastName, setLastName] = useState(responsable.lastName);
  const [email, setEmail] = useState(responsable.email);
  const [phone, setPhone] = useState(responsable.phone);
  const [gender, setGender] = useState(responsable.gender);
  const [matricule, setMatricule] = useState(responsable.matricule);
  const [password, setPassword] = useState(responsable.password);
  const [confirmPassword, setConfirmPassword] = useState(
    responsable.password
  );

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/users/responsables/${responsable}`, {
        method: "PUT",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          gender,
          matricule,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      console.log("Response data:", await response.json());
    } catch (error) {
      console.error("Error updating user:", error);
    }
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
            id="firstName"
            name="firstName"
            placeholder="Votre Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="lastName">Nom de famille</Label>
        <div className="mt-1">
          <TextInput
            id="lastName"
            name="lastName"
            placeholder="Votre Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email">E-mail</Label>
        <div className="mt-1">
          <TextInput
            id="email"
            name="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="phone">Numéro de mobile</Label>
        <div className="mt-1">
          <TextInput
            id="phone"
            name="phone"
            placeholder="+(216)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="gender">Genre</Label>
        <div className="mt-1">
          <TextInput
            id="gender"
            name="gender"
            placeholder="Sexe"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="matricule">Matricule</Label>
        <div className="mt-1">
          <TextInput
            id="matricule"
            name="matricule"
            placeholder="XXX XXX XXX"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="password">Mot de passe</Label>
        <div className="mt-1">
          <TextInput
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
        <div className="mt-1">
          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            placeholder="••••••••"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
