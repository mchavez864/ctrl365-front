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
      wrapperClassName = '',
      className = '',
      value,
      defaultValue = '',
      onChange,
      placeholder = '',
      disabled,
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
      if (!controlled) return;
      setInternalValue(value ?? '');
    }, [controlled, value]);

    const updateValue = (nextValue, event) => {
      if (!controlled) {
        setInternalValue(nextValue);
      }
      onChange?.(event);
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
              'w-full rounded-2xl font-inter border border-grey-20/40 bg-grey-00 px-4 py-3 text-grey-40 placeholder:text-grey-20 focus:none',
              className
            )}
            value={controlled ? value : internalValue}
            onChange={(event) => updateValue(event.target.value, event)}
            placeholder={placeholder}
            disabled={disabled}
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
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19.2806 18.2194C19.3502 18.2891 19.4055 18.3718 19.4432 18.4628C19.4809 18.5539 19.5003 18.6515 19.5003 18.75C19.5003 18.8485 19.4809 18.9461 19.4432 19.0372C19.4055 19.1282 19.3502 19.2109 19.2806 19.2806C19.2109 19.3503 19.1281 19.4056 19.0371 19.4433C18.9461 19.481 18.8485 19.5004 18.7499 19.5004C18.6514 19.5004 18.5538 19.481 18.4628 19.4433C18.3717 19.4056 18.289 19.3503 18.2193 19.2806L11.9999 13.0603L5.78055 19.2806C5.63982 19.4214 5.44895 19.5004 5.24993 19.5004C5.05091 19.5004 4.86003 19.4214 4.7193 19.2806C4.57857 19.1399 4.49951 18.949 4.49951 18.75C4.49951 18.551 4.57857 18.3601 4.7193 18.2194L10.9396 12L4.7193 5.78062C4.57857 5.63989 4.49951 5.44902 4.49951 5.25C4.49951 5.05097 4.57857 4.8601 4.7193 4.71937C4.86003 4.57864 5.05091 4.49958 5.24993 4.49958C5.44895 4.49958 5.63982 4.57864 5.78055 4.71937L11.9999 10.9397L18.2193 4.71937C18.36 4.57864 18.5509 4.49958 18.7499 4.49958C18.949 4.49958 19.1398 4.57864 19.2806 4.71937C19.4213 4.8601 19.5003 5.05097 19.5003 5.25C19.5003 5.44902 19.4213 5.63989 19.2806 5.78062L13.0602 12L19.2806 18.2194Z"
                  fill="#6C6C6C"
                />
              </svg>
            </button>
          )}
        </div>

        {hint && <p className="text-xs text-grey-20">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
