'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';

function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

const Textarea = forwardRef(
  (
    {
      name,
      id,
      required,
      hint,
      rows = 4,
      wrapperClassName = '',
      className = '',
      value,
      defaultValue = '',
      onChange,
      placeholder = '',
      disabled,
      maxLength,
      ...props
    },
    ref
  ) => {
    const textareaId = id || name;
    const controlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(
      controlled ? value : defaultValue
    );
    const textareaRef = useRef(null);

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
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    };

    const currentValue = controlled ? value : internalValue;
    const currentLength = currentValue?.length ?? 0;
    const reachedLimit = maxLength !== undefined && currentLength >= maxLength;
    const hasError = Boolean(hint);

    return (
      <div className={classNames('flex flex-col gap-2', wrapperClassName)}>
        <div className="relative">
          <textarea
            id={textareaId}
            name={name}
            rows={rows}
            required={required}
            placeholder={placeholder}
            ref={(node) => {
              textareaRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            className={classNames(
              'w-full rounded-2xl bg-grey-00 px-4 py-3 text-grey-40 placeholder:text-grey-20 focus:outline-none focus:ring-0 transition',
              hasError
                ? 'border border-red-500 focus:border-red-500'
                : 'border border-grey-20/40 focus:border-orange',
              className
            )}
            value={controlled ? value : internalValue}
            onChange={(event) => updateValue(event.target.value, event)}
            disabled={disabled}
            {...props}
          />
          {(controlled ? value : internalValue)?.length > 0 && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full text-grey-30 transition hover:text-orange"
              aria-label="Clear textarea"
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
        {hint && <p className="text-xs text-grey-20">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
