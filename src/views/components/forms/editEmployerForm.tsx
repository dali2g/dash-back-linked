import { Button, Label, TextInput } from "flowbite-react";
import type { FC } from "react";
import React, { useState } from "react";

interface Employer {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    matricule: string;
    site: string;
    echelon: string;
    souscategories: string;
    typecontrat: string;
    etatscivils: string;
    grade: string;
}

interface EditEmployerFormProps {
    employer: Employer;
    onClose: () => void;
}

const EditEmployerForm: FC<EditEmployerFormProps> = function ({
    employer,
    onClose,
}) {
    const [firstName, setFirstName] = useState(employer.firstName);
    const [lastName, setLastName] = useState(employer.lastName);
    const [email, setEmail] = useState(employer.email);
    const [phone, setPhone] = useState(employer.phone);
    const [gender, setGender] = useState(employer.gender);
    const [matricule, setMatricule] = useState(employer.matricule);
    const [echelon, setEchelon] = useState(employer.echelon);
    const [souscategories, setSouscategories] = useState(employer.souscategories);
    const [typecontrat, setTypecontrat] = useState(employer.typecontrat);
    const [etatscivils, setEtatscivils] = useState(employer.etatscivils);
    const [grade, setGrade] = useState(employer.grade);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`/employers/employee/${employer}`, {
                method: "PUT",
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phone,
                    gender,
                    matricule,
                    echelon,
                    souscategories,
                    typecontrat,
                    etatscivils,
                    grade
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
                <Label htmlFor="echelon">Echelon</Label>
                <div className="mt-1">
                    <TextInput
                        id="echelon"
                        name="echelon"
                        type="number"
                        value={echelon}
                        onChange={(e) => setEchelon(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="sousCategories">Sous-Catégories</Label>
                <div className="mt-1">
                    <TextInput
                        id="sousCategories"
                        name="sousCategories"
                        type="text"
                        value={souscategories}
                        onChange={(e) => setSouscategories(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="typecontrat">Type Contrat</Label>
                <div className="mt-1">
                    <TextInput
                        id="typecontrat"
                        name="typecontrat"
                        type="text"
                        value={typecontrat}
                        onChange={(e) => setTypecontrat(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="etatscivils">Etats Civils</Label>
                <div className="mt-1">
                    <TextInput
                        id="etatscivils"
                        name="etatscivils"
                        type="text"
                        value={etatscivils}
                        onChange={(e) => setEtatscivils(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="grade">Grade</Label>
                <div className="mt-1">
                    <TextInput
                        id="grade"
                        name="grade"
                        type="text"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                    />
                </div>
            </div>

            <Button type="submit" color="primary">
                Sauvegarder
            </Button>
        </form>
    );
};

export default EditEmployerForm;
