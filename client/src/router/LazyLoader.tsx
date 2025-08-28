import { lazy, Suspense } from "react";
import { DotLoader } from "react-spinners";
const lazyElement = (
  importFn: () => Promise<{ default: React.ComponentType }>
) => {
  const Component = lazy(importFn);
  return (
    <Suspense fallback={<DotLoader color="#3bf6f0" />}>
      <Component />
    </Suspense>
  );
};

export default lazyElement;
