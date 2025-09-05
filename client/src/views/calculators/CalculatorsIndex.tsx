import BMICalculator from "./components/calculators/BMICalculator";
import BodyFatCalculator from "./components/calculators/BodyFatCalculator";
import MacrosCalculator from "./components/calculators/MacrosCalculator";
import TDEECalculator from "./components/calculators/TDEECalculator";

function CalculatorsIndex() {
  return (
    <div>
      <p className="text-lg sm:text-[32px] font-bold">Fitness Calculators</p>
      <p className="text-base sm:text-xl">
        Calculate important fitness metrics to track your progress
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-10 mt-6">
        <BMICalculator />
        <TDEECalculator />
        <BodyFatCalculator />
        <MacrosCalculator />
      </div>
    </div>
  );
}

export default CalculatorsIndex;
