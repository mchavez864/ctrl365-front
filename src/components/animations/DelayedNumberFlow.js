"use client";
import { useState, useEffect } from "react";
import NumberFlow from "@number-flow/react";

const DelayedNumberFlow = ({ value, delay = 400 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Reset a 0 inmediatamente
    setDisplayValue(0);
    
    // Después del delay, animar al valor real
    const timer = setTimeout(() => {
      setDisplayValue(parseInt(value, 10));
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <NumberFlow 
      value={displayValue}
      format={{ useGrouping: false }}
    />
  );
};

export default DelayedNumberFlow;

