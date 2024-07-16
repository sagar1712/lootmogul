import { Button } from "./ui/button";

const HeroSection = () => {
    return (
      <div className="flex flex-col justify-center text-center text-white">
        <h1 className="pt-16 text-6xl">
          LootMogul External API <br />
          Integration
        </h1>
        <p className="pt-8 text-xl pb-16">
          Bring blockchain to the people. Solana supports experiences <br />
          for power users, new consumers, and everyone in between.
        </p>
        <div className="flex justify-center gap-x-4">
        <Button variant="custom" className="bg-transparent">
          LOG IN
        </Button>
        <Button variant="custom">
          SIGN UP
        </Button>
      </div>
      </div>
    );
  };
  
  export default HeroSection;
  