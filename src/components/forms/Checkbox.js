'use client';

import { forwardRef } from 'react';

function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

const Checkbox = forwardRef(
  (
    {
      label,
      description,
      name,
      id,
      value,
      wrapperClassName = '',
      className = '',
      chip = false,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `${name}-${value ?? 'option'}`;

    if (chip) {
      return (
        <label
          htmlFor={checkboxId}
          className={classNames('block', wrapperClassName)}
        >
          <input
            id={checkboxId}
            name={name}
            value={value}
            type="checkbox"
            ref={ref}
            className="peer sr-only"
            {...props}
          />
          <span
            className={classNames(
              'inline-flex w-full items-center justify-center rounded-[3px] border border-grey-20 bg-transparent px-4 py-2 text-sm font-inter transition',
              'peer-checked:border-orange peer-checked:text-grey-40 peer-focus-visible:ring-2 peer-focus-visible:ring-orange/40',
              'hover:border-orange/60 hover:text-grey-40'
            )}
          >
            {label}
          </span>
        </label>
      );
    }

    return (
      <label
        htmlFor={checkboxId}
        className={classNames(
          'flex items-start gap-3 text-sm text-grey-30',
          wrapperClassName
        )}
      >
        <span className="relative mt-1 inline-flex h-5 w-5 items-center justify-center">
          <input
            id={checkboxId}
            name={name}
            value={value}
            type="checkbox"
            ref={ref}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-grey-20/60 bg-grey-00 transition focus:outline-none focus:ring-2 focus:ring-orange/40 checked:border-orange checked:bg-orange"
            {...props}
          />
          <svg
            className="pointer-events-none absolute h-3 w-3 text-grey-00 opacity-0 transition peer-checked:opacity-100"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 10.5l3 3 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className={className}>
          {label && (
            <span className="font-inter font-medium text-grey-40 leading-tight">
              {label}
            </span>
          )}
          {description && (
            <span className="mt-1 block text-xs text-grey-20">
              {description}
            </span>
          )}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
