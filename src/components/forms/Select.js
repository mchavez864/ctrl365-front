'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';

function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

const Select = forwardRef(
  (
    {
      label,
      name,
      id,
      required,
      options = [],
      placeholder = '',
      hint,
      wrapperClassName = '',
      className = '',
      value,
      defaultValue = '',
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const selectId = id || name;
    const controlled = value !== undefined;
    const [opened, setOpened] = useState(false);
    const [internalValue, setInternalValue] = useState(
      controlled ? value : defaultValue
    );
    const containerRef = useRef(null);

    useEffect(() => {
      if (!controlled) {
        return;
      }
      setInternalValue(value ?? '');
    }, [controlled, value]);

    useEffect(() => {
      const closeOnOutsideClick = (event) => {
        if (!containerRef.current) return;
        if (!containerRef.current.contains(event.target)) {
          setOpened(false);
        }
      };

      if (opened) {
        document.addEventListener('mousedown', closeOnOutsideClick);
      } else {
        document.removeEventListener('mousedown', closeOnOutsideClick);
      }

      return () =>
        document.removeEventListener('mousedown', closeOnOutsideClick);
    }, [opened]);

    const selectedOption = options.find(
      (option) => option.value === internalValue
    );

    const handleSelect = (option) => {
      if (disabled) return;
      if (!controlled) {
        setInternalValue(option.value);
      }
      onChange?.(option.value, option);
      setOpened(false);
    };

    const handleToggle = () => {
      if (disabled) return;
      setOpened((prev) => !prev);
    };

    return (
      <div className={classNames('flex flex-col gap-2', wrapperClassName)}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-inter font-medium text-grey-40"
          >
            {label}
            {required ? '*' : ''}
          </label>
        )}

        <div
          ref={containerRef}
          className={classNames('relative w-full', disabled && 'opacity-60')}
        >
          <button
            type="button"
            id={selectId}
            onClick={handleToggle}
            className={classNames(
              'flex w-full items-center justify-between rounded-full border border-grey-20/40 bg-grey-00 px-4 py-3 text-left font-inter transition focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/40',
              opened && 'border-orange text-grey-40',
              className
            )}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={opened}
            {...props}
          >
            <span
              className={classNames(
                'font-inter text-grey-40',
                !selectedOption && 'text-grey-20'
              )}
            >
              {selectedOption
                ? selectedOption.label
                : placeholder || 'Seleccionar'}
            </span>
            <span
              className={classNames(
                'transition-transform text-grey-30',
                opened && 'rotate-180'
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20.0306 9.53062L12.5306 17.0306C12.4609 17.1004 12.3782 17.1557 12.2871 17.1934C12.1961 17.2312 12.0985 17.2506 11.9999 17.2506C11.9014 17.2506 11.8038 17.2312 11.7127 17.1934C11.6217 17.1557 11.539 17.1004 11.4693 17.0306L3.9693 9.53062C3.82857 9.38989 3.74951 9.19902 3.74951 9C3.74951 8.80097 3.82857 8.6101 3.9693 8.46937C4.11003 8.32864 4.30091 8.24958 4.49993 8.24958C4.69895 8.24958 4.88982 8.32864 5.03055 8.46937L11.9999 15.4397L18.9693 8.46937C19.039 8.39969 19.1217 8.34441 19.2128 8.3067C19.3038 8.26899 19.4014 8.24958 19.4999 8.24958C19.5985 8.24958 19.6961 8.26899 19.7871 8.3067C19.8781 8.34441 19.9609 8.39969 20.0306 8.46937C20.1002 8.53905 20.1555 8.62178 20.1932 8.71283C20.2309 8.80387 20.2503 8.90145 20.2503 9C20.2503 9.09854 20.2309 9.19612 20.1932 9.28717C20.1555 9.37821 20.1002 9.46094 20.0306 9.53062Z"
                  fill="#6C6C6C"
                />
              </svg>
            </span>
          </button>

          <input
            ref={ref}
            type="hidden"
            name={name}
            value={internalValue}
            required={required}
            disabled={disabled}
          />

          {opened && (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 rounded-3xl border border-grey-20/40 bg-grey-00 py-2 shadow-xl">
              <ul
                className="max-h-64 overflow-y-auto"
                role="listbox"
              >
                {options.map((option) => {
                  const selected = option.value === internalValue;
                  return (
                    <li key={option.value}>
                      <button
                        type="button"
                        onClick={() => handleSelect(option)}
                        className={classNames(
                          'flex text-left w-full items-start px-4 py-3 font-inter transition hover:bg-orange/10 hover:text-grey-40',
                          selected && 'text-grey-40'
                        )}
                        role="option"
                        aria-selected={selected}
                      >
                        {option.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {hint && <p className="text-xs text-grey-20">{hint}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
