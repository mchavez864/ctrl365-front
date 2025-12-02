'use server';

import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

const {
  HUBSPOT_ACCESS_TOKEN,
  HUBSPOT_REFRESH_TOKEN,
  HUBSPOT_CLIENT_ID,
  HUBSPOT_CLIENT_SECRET,
  HUBSPOT_PORTAL_ID,
  HUBSPOT_FORM_GUID,
  HUBSPOT_API_TYPE, // 'forms' o 'crm'
} = process.env;

// Ruta para almacenar el token (en producción considera usar una base de datos)
const TOKEN_FILE_PATH = join(process.cwd(), '.hubspot-token.json');

/**
 * Lee el token almacenado localmente
 */
async function getStoredToken() {
  try {
    const data = await readFile(TOKEN_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Si no existe el archivo, usar las variables de entorno
    return {
      access_token: HUBSPOT_ACCESS_TOKEN,
      refresh_token: HUBSPOT_REFRESH_TOKEN,
      expires_at: null,
    };
  }
}

/**
 * Guarda el token localmente
 */
async function saveToken(tokenData) {
  try {
    await writeFile(TOKEN_FILE_PATH, JSON.stringify(tokenData, null, 2));
  } catch (error) {
    console.error('Error guardando token:', error);
  }
}

/**
 * Refresca el access token usando el refresh token
 */
async function refreshAccessToken(refreshToken) {
  if (!HUBSPOT_CLIENT_ID || !HUBSPOT_CLIENT_SECRET) {
    throw new Error(
      'HUBSPOT_CLIENT_ID y HUBSPOT_CLIENT_SECRET son requeridos para refrescar el token'
    );
  }

  const url = 'https://api.hubapi.com/oauth/v1/token';

  const formData = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: HUBSPOT_CLIENT_ID,
    client_secret: HUBSPOT_CLIENT_SECRET,
    refresh_token: refreshToken,
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error refrescando token de HubSpot (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();

  // Guardar el nuevo token con su tiempo de expiración
  const tokenData = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + data.expires_in * 1000, // Convertir a timestamp
  };

  await saveToken(tokenData);

  return tokenData.access_token;
}

/**
 * Obtiene un access token válido (refresca si es necesario)
 */
async function getValidAccessToken() {
  // Si solo tenemos access token (Private App), usarlo directamente
  if (HUBSPOT_ACCESS_TOKEN && !HUBSPOT_REFRESH_TOKEN) {
    console.log('Usando Private App Access Token (no requiere refresh)');
    return HUBSPOT_ACCESS_TOKEN;
  }

  // Si tenemos OAuth configurado, usar el flujo con refresh
  const storedToken = await getStoredToken();

  // Si no hay token de expiración o está por expirar (con 5 min de margen)
  if (
    !storedToken.expires_at ||
    Date.now() > storedToken.expires_at - 5 * 60 * 1000
  ) {
    if (!storedToken.refresh_token) {
      // Si no hay refresh token pero hay access token en env, usarlo
      if (HUBSPOT_ACCESS_TOKEN) {
        console.log('Usando Access Token del .env (sin refresh disponible)');
        return HUBSPOT_ACCESS_TOKEN;
      }
      throw new Error(
        'No hay refresh token disponible para renovar el access token'
      );
    }

    console.log('Token expirado o por expirar, refrescando...');
    return await refreshAccessToken(storedToken.refresh_token);
  }

  return storedToken.access_token;
}

/**
 * Envía datos del formulario a HubSpot usando la Forms API
 * Esta opción NO requiere OAuth, solo el Portal ID y Form GUID
 */
async function sendToFormsAPI(data) {
  if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_GUID) {
    throw new Error(
      'HUBSPOT_PORTAL_ID y HUBSPOT_FORM_GUID son requeridos para usar Forms API'
    );
  }

  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;

  // Mapeo de campos del formulario a HubSpot
  const fields = [
    { name: 'firstname', value: data.Nombre },
    { name: 'lastname', value: data.Apellido },
    { name: 'email', value: data.Email },
    { name: 'phone', value: data.Teléfono },
    { name: 'company', value: data.Empresa },
    { name: 'jobtitle', value: data['Puesto de trabajo'] },
    { name: 'country', value: data.País },
    { name: 'message', value: data.Consulta },
    // Campos personalizados (deben existir en HubSpot)
    { name: 'objetivos', value: data.Objetivos },
    { name: 'servicios', value: data.Servicios },
  ];

  const payload = {
    fields,
    context: {
      pageUri: data.pageUri || '',
      pageName: data.pageName || 'Formulario de Contacto',
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HubSpot Forms API error (${response.status}): ${errorText}`
    );
  }

  return await response.json();
}

/**
 * Envía datos del formulario a HubSpot usando la CRM Objects API con OAuth
 * Esta opción requiere OAuth access token
 */
async function sendToCRMAPI(data) {
  // Obtener un access token válido (refresca automáticamente si es necesario)
  const accessToken = await getValidAccessToken();

  const url = 'https://api.hubapi.com/crm/v3/objects/contacts';

  // Mapeo de propiedades del contacto
  const properties = {
    firstname: data.Nombre,
    lastname: data.Apellido,
    email: data.Email,
    phone: data.Teléfono,
    company: data.Empresa,
    jobtitle: data['Puesto de trabajo'],
    country: data.País,
    // Campos personalizados (deben existir en HubSpot)
    objetivos: data.Objetivos,
    servicios: data.Servicios,
    consulta: data.Consulta,
  };

  const payload = {
    properties,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HubSpot CRM API error (${response.status}): ${errorText}`);
  }

  return await response.json();
}

/**
 * Función principal que decide qué API usar según la configuración
 */
export async function sendToHubspot(data) {
  const apiType = HUBSPOT_API_TYPE || 'crm'; // Por defecto usa CRM API con OAuth

  try {
    if (apiType === 'crm') {
      return await sendToCRMAPI(data);
    } else {
      return await sendToFormsAPI(data);
    }
  } catch (error) {
    console.error('Error enviando datos a HubSpot:', error);
    throw error;
  }
}
