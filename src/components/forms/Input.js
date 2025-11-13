'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';

function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

const Input = forwardRef(
  (
    {
      name,
      id,
      type = 'text',
      required,
      hint,
      limitHint,
      wrapperClassName = '',
      className = '',
      value,
      defaultValue = '',
      onChange,
      placeholder = '',
      disabled,
      maxLength,
      showCounter = false,
      ...props
    },
    ref
  ) => {
    const inputId = id || name;
    const controlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(
      controlled ? value : defaultValue
    );
    const inputRef = useRef(null);

    useEffect(() => {
      if (!controlled) {
        return;
      }
      setInternalValue(value ?? '');
    }, [controlled, value]);

    const applyLengthLimit = (nextValue) => {
      if (maxLength !== undefined) {
        return nextValue.slice(0, maxLength);
      }
      return nextValue;
    };

    const updateValue = (nextValue, event) => {
      const limited = applyLengthLimit(nextValue);
      if (!controlled) {
        setInternalValue(limited);
      }
      if (event && event.target && event.target.value !== limited) {
        event.target.value = limited;
      }
      onChange?.(event);
    };

    const handleChange = (event) => {
      const nextValue = event.target.value;
      updateValue(nextValue, event);
    };

    const handleClear = () => {
      const event = {
        target: { value: '', name },
        currentTarget: { value: '', name },
      };
      updateValue('', event);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const currentLength = (controlled ? value : internalValue)?.length ?? 0;
    const reachedLimit = maxLength !== undefined && currentLength >= maxLength;
    const hasError = Boolean(hint);

    return (
      <div className={classNames('flex flex-col gap-2', wrapperClassName)}>
        <div className="relative flex w-full items-center">
          <input
            id={inputId}
            name={name}
            type={type}
            required={required}
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            className={classNames(
              'w-full rounded-2xl font-inter bg-grey-00 px-4 py-3 text-grey-40 placeholder:text-grey-20 focus:outline-none focus:ring-0 transition',
              hasError
                ? 'border border-red-500 focus:border-red-500'
                : 'border border-grey-20/40 focus:border-orange',
              className
            )}
            value={controlled ? value : internalValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            {...props}
          />

          {(controlled ? value : internalValue)?.length > 0 && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full text-grey-30 transition hover:text-orange"
              aria-label="Clear input"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>

        {showCounter && maxLength !== undefined && (
          <p className="text-xs text-grey-20">
            {currentLength}/{maxLength}
          </p>
        )}

        {reachedLimit && limitHint && (
          <p className="!text-sm font-inter text-red-500">{limitHint}</p>
        )}

        {hint && <p className="!text-sm  font-inter text-red-500">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
