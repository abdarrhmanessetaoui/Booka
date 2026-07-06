import { PricingTable } from "@clerk/nextjs";

export default function SubscriptionsPage() {
  return (
    <div className="container wrapper py-10">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold font-serif mb-4">Choisissez votre forfait</h1>
        <p className="text-muted-foreground max-w-2xl">
          Mettez à niveau pour débloquer plus de livres, des sessions plus longues et des fonctionnalités avancées.
        </p>
      </div>

      <div className="clerk-pricing-container">
        <PricingTable />
      </div>
    </div>
  );
}
