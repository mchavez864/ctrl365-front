'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';

function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

// Lista de países en español e inglés
const COUNTRIES = [
  { value: 'AF', labelEs: 'Afganistán', labelEn: 'Afghanistan' },
  { value: 'AL', labelEs: 'Albania', labelEn: 'Albania' },
  { value: 'DE', labelEs: 'Alemania', labelEn: 'Germany' },
  { value: 'AD', labelEs: 'Andorra', labelEn: 'Andorra' },
  { value: 'AO', labelEs: 'Angola', labelEn: 'Angola' },
  { value: 'AG', labelEs: 'Antigua y Barbuda', labelEn: 'Antigua and Barbuda' },
  { value: 'SA', labelEs: 'Arabia Saudita', labelEn: 'Saudi Arabia' },
  { value: 'DZ', labelEs: 'Argelia', labelEn: 'Algeria' },
  { value: 'AR', labelEs: 'Argentina', labelEn: 'Argentina' },
  { value: 'AM', labelEs: 'Armenia', labelEn: 'Armenia' },
  { value: 'AU', labelEs: 'Australia', labelEn: 'Australia' },
  { value: 'AT', labelEs: 'Austria', labelEn: 'Austria' },
  { value: 'AZ', labelEs: 'Azerbaiyán', labelEn: 'Azerbaijan' },
  { value: 'BS', labelEs: 'Bahamas', labelEn: 'Bahamas' },
  { value: 'BD', labelEs: 'Bangladés', labelEn: 'Bangladesh' },
  { value: 'BB', labelEs: 'Barbados', labelEn: 'Barbados' },
  { value: 'BH', labelEs: 'Baréin', labelEn: 'Bahrain' },
  { value: 'BE', labelEs: 'Bélgica', labelEn: 'Belgium' },
  { value: 'BZ', labelEs: 'Belice', labelEn: 'Belize' },
  { value: 'BJ', labelEs: 'Benín', labelEn: 'Benin' },
  { value: 'BY', labelEs: 'Bielorrusia', labelEn: 'Belarus' },
  { value: 'BO', labelEs: 'Bolivia', labelEn: 'Bolivia' },
  { value: 'BA', labelEs: 'Bosnia y Herzegovina', labelEn: 'Bosnia and Herzegovina' },
  { value: 'BW', labelEs: 'Botsuana', labelEn: 'Botswana' },
  { value: 'BR', labelEs: 'Brasil', labelEn: 'Brazil' },
  { value: 'BN', labelEs: 'Brunéi', labelEn: 'Brunei' },
  { value: 'BG', labelEs: 'Bulgaria', labelEn: 'Bulgaria' },
  { value: 'BF', labelEs: 'Burkina Faso', labelEn: 'Burkina Faso' },
  { value: 'BI', labelEs: 'Burundi', labelEn: 'Burundi' },
  { value: 'BT', labelEs: 'Bután', labelEn: 'Bhutan' },
  { value: 'CV', labelEs: 'Cabo Verde', labelEn: 'Cape Verde' },
  { value: 'KH', labelEs: 'Camboya', labelEn: 'Cambodia' },
  { value: 'CM', labelEs: 'Camerún', labelEn: 'Cameroon' },
  { value: 'CA', labelEs: 'Canadá', labelEn: 'Canada' },
  { value: 'QA', labelEs: 'Catar', labelEn: 'Qatar' },
  { value: 'TD', labelEs: 'Chad', labelEn: 'Chad' },
  { value: 'CL', labelEs: 'Chile', labelEn: 'Chile' },
  { value: 'CN', labelEs: 'China', labelEn: 'China' },
  { value: 'CY', labelEs: 'Chipre', labelEn: 'Cyprus' },
  { value: 'CO', labelEs: 'Colombia', labelEn: 'Colombia' },
  { value: 'KM', labelEs: 'Comoras', labelEn: 'Comoros' },
  { value: 'KP', labelEs: 'Corea del Norte', labelEn: 'North Korea' },
  { value: 'KR', labelEs: 'Corea del Sur', labelEn: 'South Korea' },
  { value: 'CR', labelEs: 'Costa Rica', labelEn: 'Costa Rica' },
  { value: 'CI', labelEs: 'Costa de Marfil', labelEn: 'Ivory Coast' },
  { value: 'HR', labelEs: 'Croacia', labelEn: 'Croatia' },
  { value: 'CU', labelEs: 'Cuba', labelEn: 'Cuba' },
  { value: 'DK', labelEs: 'Dinamarca', labelEn: 'Denmark' },
  { value: 'DM', labelEs: 'Dominica', labelEn: 'Dominica' },
  { value: 'EC', labelEs: 'Ecuador', labelEn: 'Ecuador' },
  { value: 'EG', labelEs: 'Egipto', labelEn: 'Egypt' },
  { value: 'SV', labelEs: 'El Salvador', labelEn: 'El Salvador' },
  { value: 'AE', labelEs: 'Emiratos Árabes Unidos', labelEn: 'United Arab Emirates' },
  { value: 'ER', labelEs: 'Eritrea', labelEn: 'Eritrea' },
  { value: 'SK', labelEs: 'Eslovaquia', labelEn: 'Slovakia' },
  { value: 'SI', labelEs: 'Eslovenia', labelEn: 'Slovenia' },
  { value: 'ES', labelEs: 'España', labelEn: 'Spain' },
  { value: 'US', labelEs: 'Estados Unidos', labelEn: 'United States' },
  { value: 'EE', labelEs: 'Estonia', labelEn: 'Estonia' },
  { value: 'SZ', labelEs: 'Esuatini', labelEn: 'Eswatini' },
  { value: 'ET', labelEs: 'Etiopía', labelEn: 'Ethiopia' },
  { value: 'PH', labelEs: 'Filipinas', labelEn: 'Philippines' },
  { value: 'FI', labelEs: 'Finlandia', labelEn: 'Finland' },
  { value: 'FJ', labelEs: 'Fiyi', labelEn: 'Fiji' },
  { value: 'FR', labelEs: 'Francia', labelEn: 'France' },
  { value: 'GA', labelEs: 'Gabón', labelEn: 'Gabon' },
  { value: 'GM', labelEs: 'Gambia', labelEn: 'Gambia' },
  { value: 'GE', labelEs: 'Georgia', labelEn: 'Georgia' },
  { value: 'GH', labelEs: 'Ghana', labelEn: 'Ghana' },
  { value: 'GD', labelEs: 'Granada', labelEn: 'Grenada' },
  { value: 'GR', labelEs: 'Grecia', labelEn: 'Greece' },
  { value: 'GT', labelEs: 'Guatemala', labelEn: 'Guatemala' },
  { value: 'GN', labelEs: 'Guinea', labelEn: 'Guinea' },
  { value: 'GQ', labelEs: 'Guinea Ecuatorial', labelEn: 'Equatorial Guinea' },
  { value: 'GW', labelEs: 'Guinea-Bisáu', labelEn: 'Guinea-Bissau' },
  { value: 'GY', labelEs: 'Guyana', labelEn: 'Guyana' },
  { value: 'HT', labelEs: 'Haití', labelEn: 'Haiti' },
  { value: 'HN', labelEs: 'Honduras', labelEn: 'Honduras' },
  { value: 'HU', labelEs: 'Hungría', labelEn: 'Hungary' },
  { value: 'IN', labelEs: 'India', labelEn: 'India' },
  { value: 'ID', labelEs: 'Indonesia', labelEn: 'Indonesia' },
  { value: 'IQ', labelEs: 'Irak', labelEn: 'Iraq' },
  { value: 'IR', labelEs: 'Irán', labelEn: 'Iran' },
  { value: 'IE', labelEs: 'Irlanda', labelEn: 'Ireland' },
  { value: 'IS', labelEs: 'Islandia', labelEn: 'Iceland' },
  { value: 'MH', labelEs: 'Islas Marshall', labelEn: 'Marshall Islands' },
  { value: 'SB', labelEs: 'Islas Salomón', labelEn: 'Solomon Islands' },
  { value: 'IL', labelEs: 'Israel', labelEn: 'Israel' },
  { value: 'IT', labelEs: 'Italia', labelEn: 'Italy' },
  { value: 'JM', labelEs: 'Jamaica', labelEn: 'Jamaica' },
  { value: 'JP', labelEs: 'Japón', labelEn: 'Japan' },
  { value: 'JO', labelEs: 'Jordania', labelEn: 'Jordan' },
  { value: 'KZ', labelEs: 'Kazajistán', labelEn: 'Kazakhstan' },
  { value: 'KE', labelEs: 'Kenia', labelEn: 'Kenya' },
  { value: 'KG', labelEs: 'Kirguistán', labelEn: 'Kyrgyzstan' },
  { value: 'KI', labelEs: 'Kiribati', labelEn: 'Kiribati' },
  { value: 'KW', labelEs: 'Kuwait', labelEn: 'Kuwait' },
  { value: 'LA', labelEs: 'Laos', labelEn: 'Laos' },
  { value: 'LS', labelEs: 'Lesoto', labelEn: 'Lesotho' },
  { value: 'LV', labelEs: 'Letonia', labelEn: 'Latvia' },
  { value: 'LB', labelEs: 'Líbano', labelEn: 'Lebanon' },
  { value: 'LR', labelEs: 'Liberia', labelEn: 'Liberia' },
  { value: 'LY', labelEs: 'Libia', labelEn: 'Libya' },
  { value: 'LI', labelEs: 'Liechtenstein', labelEn: 'Liechtenstein' },
  { value: 'LT', labelEs: 'Lituania', labelEn: 'Lithuania' },
  { value: 'LU', labelEs: 'Luxemburgo', labelEn: 'Luxembourg' },
  { value: 'MK', labelEs: 'Macedonia del Norte', labelEn: 'North Macedonia' },
  { value: 'MG', labelEs: 'Madagascar', labelEn: 'Madagascar' },
  { value: 'MY', labelEs: 'Malasia', labelEn: 'Malaysia' },
  { value: 'MW', labelEs: 'Malaui', labelEn: 'Malawi' },
  { value: 'MV', labelEs: 'Maldivas', labelEn: 'Maldives' },
  { value: 'ML', labelEs: 'Malí', labelEn: 'Mali' },
  { value: 'MT', labelEs: 'Malta', labelEn: 'Malta' },
  { value: 'MA', labelEs: 'Marruecos', labelEn: 'Morocco' },
  { value: 'MU', labelEs: 'Mauricio', labelEn: 'Mauritius' },
  { value: 'MR', labelEs: 'Mauritania', labelEn: 'Mauritania' },
  { value: 'MX', labelEs: 'México', labelEn: 'Mexico' },
  { value: 'FM', labelEs: 'Micronesia', labelEn: 'Micronesia' },
  { value: 'MD', labelEs: 'Moldavia', labelEn: 'Moldova' },
  { value: 'MC', labelEs: 'Mónaco', labelEn: 'Monaco' },
  { value: 'MN', labelEs: 'Mongolia', labelEn: 'Mongolia' },
  { value: 'ME', labelEs: 'Montenegro', labelEn: 'Montenegro' },
  { value: 'MZ', labelEs: 'Mozambique', labelEn: 'Mozambique' },
  { value: 'MM', labelEs: 'Myanmar', labelEn: 'Myanmar' },
  { value: 'NA', labelEs: 'Namibia', labelEn: 'Namibia' },
  { value: 'NR', labelEs: 'Nauru', labelEn: 'Nauru' },
  { value: 'NP', labelEs: 'Nepal', labelEn: 'Nepal' },
  { value: 'NI', labelEs: 'Nicaragua', labelEn: 'Nicaragua' },
  { value: 'NE', labelEs: 'Níger', labelEn: 'Niger' },
  { value: 'NG', labelEs: 'Nigeria', labelEn: 'Nigeria' },
  { value: 'NO', labelEs: 'Noruega', labelEn: 'Norway' },
  { value: 'NZ', labelEs: 'Nueva Zelanda', labelEn: 'New Zealand' },
  { value: 'OM', labelEs: 'Omán', labelEn: 'Oman' },
  { value: 'NL', labelEs: 'Países Bajos', labelEn: 'Netherlands' },
  { value: 'PK', labelEs: 'Pakistán', labelEn: 'Pakistan' },
  { value: 'PW', labelEs: 'Palaos', labelEn: 'Palau' },
  { value: 'PA', labelEs: 'Panamá', labelEn: 'Panama' },
  { value: 'PG', labelEs: 'Papúa Nueva Guinea', labelEn: 'Papua New Guinea' },
  { value: 'PY', labelEs: 'Paraguay', labelEn: 'Paraguay' },
  { value: 'PE', labelEs: 'Perú', labelEn: 'Peru' },
  { value: 'PL', labelEs: 'Polonia', labelEn: 'Poland' },
  { value: 'PT', labelEs: 'Portugal', labelEn: 'Portugal' },
  { value: 'GB', labelEs: 'Reino Unido', labelEn: 'United Kingdom' },
  { value: 'CF', labelEs: 'República Centroafricana', labelEn: 'Central African Republic' },
  { value: 'CZ', labelEs: 'República Checa', labelEn: 'Czech Republic' },
  { value: 'CG', labelEs: 'República del Congo', labelEn: 'Republic of the Congo' },
  { value: 'CD', labelEs: 'República Democrática del Congo', labelEn: 'Democratic Republic of the Congo' },
  { value: 'DO', labelEs: 'República Dominicana', labelEn: 'Dominican Republic' },
  { value: 'RW', labelEs: 'Ruanda', labelEn: 'Rwanda' },
  { value: 'RO', labelEs: 'Rumania', labelEn: 'Romania' },
  { value: 'RU', labelEs: 'Rusia', labelEn: 'Russia' },
  { value: 'WS', labelEs: 'Samoa', labelEn: 'Samoa' },
  { value: 'KN', labelEs: 'San Cristóbal y Nieves', labelEn: 'Saint Kitts and Nevis' },
  { value: 'SM', labelEs: 'San Marino', labelEn: 'San Marino' },
  { value: 'VC', labelEs: 'San Vicente y las Granadinas', labelEn: 'Saint Vincent and the Grenadines' },
  { value: 'LC', labelEs: 'Santa Lucía', labelEn: 'Saint Lucia' },
  { value: 'ST', labelEs: 'Santo Tomé y Príncipe', labelEn: 'Sao Tome and Principe' },
  { value: 'SN', labelEs: 'Senegal', labelEn: 'Senegal' },
  { value: 'RS', labelEs: 'Serbia', labelEn: 'Serbia' },
  { value: 'SC', labelEs: 'Seychelles', labelEn: 'Seychelles' },
  { value: 'SL', labelEs: 'Sierra Leona', labelEn: 'Sierra Leone' },
  { value: 'SG', labelEs: 'Singapur', labelEn: 'Singapore' },
  { value: 'SY', labelEs: 'Siria', labelEn: 'Syria' },
  { value: 'SO', labelEs: 'Somalia', labelEn: 'Somalia' },
  { value: 'LK', labelEs: 'Sri Lanka', labelEn: 'Sri Lanka' },
  { value: 'ZA', labelEs: 'Sudáfrica', labelEn: 'South Africa' },
  { value: 'SD', labelEs: 'Sudán', labelEn: 'Sudan' },
  { value: 'SS', labelEs: 'Sudán del Sur', labelEn: 'South Sudan' },
  { value: 'SE', labelEs: 'Suecia', labelEn: 'Sweden' },
  { value: 'CH', labelEs: 'Suiza', labelEn: 'Switzerland' },
  { value: 'SR', labelEs: 'Surinam', labelEn: 'Suriname' },
  { value: 'TH', labelEs: 'Tailandia', labelEn: 'Thailand' },
  { value: 'TW', labelEs: 'Taiwán', labelEn: 'Taiwan' },
  { value: 'TZ', labelEs: 'Tanzania', labelEn: 'Tanzania' },
  { value: 'TJ', labelEs: 'Tayikistán', labelEn: 'Tajikistan' },
  { value: 'TL', labelEs: 'Timor Oriental', labelEn: 'East Timor' },
  { value: 'TG', labelEs: 'Togo', labelEn: 'Togo' },
  { value: 'TO', labelEs: 'Tonga', labelEn: 'Tonga' },
  { value: 'TT', labelEs: 'Trinidad y Tobago', labelEn: 'Trinidad and Tobago' },
  { value: 'TN', labelEs: 'Túnez', labelEn: 'Tunisia' },
  { value: 'TM', labelEs: 'Turkmenistán', labelEn: 'Turkmenistan' },
  { value: 'TR', labelEs: 'Turquía', labelEn: 'Turkey' },
  { value: 'TV', labelEs: 'Tuvalu', labelEn: 'Tuvalu' },
  { value: 'UA', labelEs: 'Ucrania', labelEn: 'Ukraine' },
  { value: 'UG', labelEs: 'Uganda', labelEn: 'Uganda' },
  { value: 'UY', labelEs: 'Uruguay', labelEn: 'Uruguay' },
  { value: 'UZ', labelEs: 'Uzbekistán', labelEn: 'Uzbekistan' },
  { value: 'VU', labelEs: 'Vanuatu', labelEn: 'Vanuatu' },
  { value: 'VA', labelEs: 'Vaticano', labelEn: 'Vatican City' },
  { value: 'VE', labelEs: 'Venezuela', labelEn: 'Venezuela' },
  { value: 'VN', labelEs: 'Vietnam', labelEn: 'Vietnam' },
  { value: 'YE', labelEs: 'Yemen', labelEn: 'Yemen' },
  { value: 'DJ', labelEs: 'Yibuti', labelEn: 'Djibouti' },
  { value: 'ZM', labelEs: 'Zambia', labelEn: 'Zambia' },
  { value: 'ZW', labelEs: 'Zimbabue', labelEn: 'Zimbabwe' },
];

const CountrySelect = forwardRef(
  (
    {
      label,
      name,
      id,
      required,
      placeholder = '',
      hint,
      wrapperClassName = '',
      className = '',
      value,
      defaultValue = '',
      onChange,
      disabled,
      locale = 'es',
      ...props
    },
    ref
  ) => {
    const selectId = id || name;
    const controlled = value !== undefined;
    const [opened, setOpened] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [internalValue, setInternalValue] = useState(
      controlled ? value : defaultValue
    );
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    // Obtener el label según el idioma
    const getLabel = (country) => {
      return locale === 'es' ? country.labelEs : country.labelEn;
    };

    // Normalizar texto para búsqueda (quitar acentos)
    const normalizeText = (text) => {
      return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    };

    // Filtrar países según el input
    const filteredCountries = inputValue.trim()
      ? COUNTRIES.filter((country) => {
          const searchTerm = normalizeText(inputValue);
          const labelEs = normalizeText(country.labelEs);
          const labelEn = normalizeText(country.labelEn);
          return labelEs.includes(searchTerm) || labelEn.includes(searchTerm);
        })
      : COUNTRIES;

    // Actualizar el input cuando cambia el valor externo
    useEffect(() => {
      if (controlled && value) {
        const country = COUNTRIES.find((c) => c.value === value);
        if (country) {
          setInputValue(getLabel(country));
        }
      } else if (controlled && !value) {
        setInputValue('');
      }
      setInternalValue(value ?? '');
    }, [controlled, value, locale]);

    // Cerrar al hacer clic fuera
    useEffect(() => {
      const closeOnOutsideClick = (event) => {
        if (!containerRef.current) return;
        if (!containerRef.current.contains(event.target)) {
          setOpened(false);
          // Si no hay selección válida, limpiar
          if (inputValue && !internalValue) {
            const matchedCountry = COUNTRIES.find(
              (c) => normalizeText(getLabel(c)) === normalizeText(inputValue)
            );
            if (!matchedCountry) {
              setInputValue('');
            }
          }
        }
      };

      if (opened) {
        document.addEventListener('mousedown', closeOnOutsideClick);
      } else {
        document.removeEventListener('mousedown', closeOnOutsideClick);
      }

      return () =>
        document.removeEventListener('mousedown', closeOnOutsideClick);
    }, [opened, inputValue, internalValue, locale]);

    const handleSelect = (country) => {
      if (disabled) return;
      const countryLabel = getLabel(country);
      setInputValue(countryLabel);
      if (!controlled) {
        setInternalValue(countryLabel);
      }
      onChange?.(countryLabel, country);
      setOpened(false);
    };

    const handleInputChange = (e) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setOpened(true);
      
      // Limpiar selección si el usuario está escribiendo algo diferente
      if (internalValue) {
        const selectedCountry = COUNTRIES.find((c) => c.value === internalValue || getLabel(c) === internalValue);
        if (selectedCountry && getLabel(selectedCountry) !== newValue) {
          if (!controlled) {
            setInternalValue('');
          }
          onChange?.('', null);
        }
      }
    };

    const handleInputFocus = () => {
      if (!disabled) {
        setOpened(true);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpened(false);
      } else if (e.key === 'Enter' && filteredCountries.length > 0) {
        e.preventDefault();
        handleSelect(filteredCountries[0]);
      }
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
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              id={selectId}
              value={inputValue}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              autoComplete="off"
              className={classNames(
                'flex w-full items-center rounded-full border border-grey-20/40 bg-grey-00 px-4 py-3 pr-10 text-left font-inter transition focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/40 text-grey-40 placeholder:text-grey-20',
                opened && 'border-orange',
                className
              )}
              {...props}
            />
            <span
              className={classNames(
                'absolute right-4 top-1/2 -translate-y-1/2 transition-transform text-grey-30 pointer-events-none',
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
          </div>

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
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => {
                    const countryLabel = getLabel(country);
                    const selected = countryLabel === internalValue || country.value === internalValue;
                    return (
                      <li key={country.value}>
                        <button
                          type="button"
                          onClick={() => handleSelect(country)}
                          className={classNames(
                            'flex text-left w-full items-start px-4 py-3 font-inter transition hover:bg-orange/10 hover:text-grey-40',
                            selected && 'text-grey-40 bg-orange/5'
                          )}
                          role="option"
                          aria-selected={selected}
                        >
                          {countryLabel}
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <li className="px-4 py-3 text-grey-20 font-inter">
                    {locale === 'es' ? 'No se encontraron países' : 'No countries found'}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {hint && <p className="text-xs text-red-500">{hint}</p>}
      </div>
    );
  }
);

CountrySelect.displayName = 'CountrySelect';

export default CountrySelect;

