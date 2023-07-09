/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import type { FC } from "react";


interface FormProps { }
const SignInPage: FC<FormProps> = () => {

  const [userNameState, setUserNameState] = useState('')
  const [passwordState, setPasswordState] = useState('')
  const [showAlert, setShowAlert] = useState(false);


  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userNameState === 'admin' && passwordState === 'admin') {
      navigate('/dashboard');

    }
    else {
      setShowAlert(true);
    }
  }
  return (
    <div>
      {showAlert && (
        <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Informations Invalides:</span> Veuiller saisir des coordonnées correctes
          </div>
        </div>
      )}
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <div className="my-6 flex items-center gap-x-1 lg:my-0">
          <img
            alt="TA Logo"
            src="/images/TA_logo.png"
            className="mr-3 h-8"

          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Tunisie Autoroutes
          </span>
        </div>
        <Card
          horizontal
          imgSrc="/images/autoroute.jpg"
          imgAlt=""
          className="w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
        >
          <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
            Se Connecter
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-y-3">
              <Label htmlFor="email">Nom d'Utilisateur</Label>
              <TextInput
                required
                value={userNameState}
                id="username"
                name="username"
                placeholder="Nom d'Utilisateur"
                type="text"
                onChange={(e) => setUserNameState(e.target.value)}
              />
            </div>
            <div className="mb-6 flex flex-col gap-y-3">
              <Label htmlFor="password">Mot de Passe</Label>
              <TextInput
                required
                value={passwordState}

                id="password"
                name="password"
                placeholder="••••••••••"
                type="password"
                onChange={(e) => setPasswordState(e.target.value)}

              />
            </div>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <Checkbox className="mr-2 " id="rememberMe" name="rememberMe" />
                <Label htmlFor="rememberMe">Rester Connecté</Label>
              </div>

            </div>
            <div className="mb-6">
              <Button type="submit" className="w-full lg:w-auto bg-green-500">
                Se Connecter
              </Button>
            </div>

          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
