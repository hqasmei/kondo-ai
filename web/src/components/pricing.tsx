import { Button } from "@/components/ui/button";

const PricingTier = ({
  name,
  credits,
  price,
  features,
  recommended = false,
}: {
  name: string;
  credits: number;
  price: number;
  features: string[];
  recommended?: boolean;
}) => (
  <div
    className={`bg-white rounded-lg shadow-lg p-6 flex flex-col ${
      recommended ? "border-2 border-sky-blue" : ""
    }`}
  >
    {recommended && (
      <span className="bg-sky-blue text-white px-4 py-1 rounded-full text-sm self-start mb-4">
        Recommended
      </span>
    )}
    <h3 className="text-2xl font-bold mb-2">{name}</h3>
    <p className="text-3xl font-bold mb-4">
      ${price}
      <span className="text-sm font-normal">/month</span>
    </p>
    <p className="mb-4 text-gray-600">{credits} credits</p>
    <ul className="mb-6 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="mb-2 flex items-start">
          <svg
            className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          {feature}
        </li>
      ))}
    </ul>
    <Button className="w-full bg-indigo-dye hover:bg-lapis-lazuli text-white">
      Choose Plan
    </Button>
  </div>
);

const Pricing = () => (
  <section id="pricing" className="py-16 bg-off-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">
        Simple, Transparent Pricing
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <PricingTier
          name="Basic"
          credits={100}
          price={9.99}
          features={[
            "100 AI-powered organization suggestions",
            "Basic progress tracking",
            "Email support",
          ]}
        />
        <PricingTier
          name="Pro"
          credits={500}
          price={29.99}
          features={[
            "500 AI-powered organization suggestions",
            "Advanced progress tracking",
            "Priority email support",
            "Custom categories",
          ]}
          recommended={true}
        />
        <PricingTier
          name="Enterprise"
          credits={2000}
          price={99.99}
          features={[
            "2000 AI-powered organization suggestions",
            "Advanced analytics",
            "24/7 priority support",
            "Custom integrations",
            "Team collaboration features",
          ]}
        />
      </div>
    </div>
  </section>
);

export default Pricing;
