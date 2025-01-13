"use client";

import { CreateVaultForm } from "../components/CreateVaultForm";

export default function CreateVaultPage() {
  return (
    <div className="flex flex-col">
      <h1 className="mb-6 text-xl font-bold">Create Vault</h1>
      <CreateVaultForm />
    </div>
  );
}
