import React from "react";

interface ICalculator {
  children: React.ReactNode;
  submit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

function Calculator({ children, submit }: ICalculator) {
  return (
    <form
      onSubmit={submit}
      className="flex flex-col p-6 sm:p-12 gap-3 sm:gap-10 max-w-xl bg-white rounded-md min-h-[550px] shadow-lg"
    >
      {children}
    </form>
  );
}

Calculator.Header = function CalculatorHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-row gap-3">{children}</div>;
};

Calculator.Body = function CalculatorFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
  );
};

Calculator.Footer = function CalculatorFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg h-[90px] bg-secondary-gray">
      {children}
    </div>
  );
};

export default Calculator;
