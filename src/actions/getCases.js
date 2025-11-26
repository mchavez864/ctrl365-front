"use server";

// Validar variables de entorno requeridas
function validateEnvVars() {
  const cmsUrl = process.env.CMS_URL_API;
  const cmsKey = process.env.CMS_KEY;
 
  if (!cmsUrl || !cmsKey) {
    const missing = [];
    if (!cmsUrl) missing.push('CMS_URL_API');
    if (!cmsKey) missing.push('CMS_KEY');
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return { cmsUrl, cmsKey };
}

export async function getCases(locale) {
  try {
    const { cmsUrl, cmsKey } = validateEnvVars();
    
    const response = await fetch(
      `${cmsUrl}/case-studies?&populate=*&locale=${locale}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cmsKey}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`CMS API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching cases:', error.message);
    return [];
  }
}

export async function getCase(id, locale) {
  try {
    const { cmsUrl, cmsKey } = validateEnvVars();
    
    const response = await fetch(
      `${cmsUrl}/case-studies?populate=*&locale=${locale === 'es' ? 'es-AR' : 'en'}&filters[Slug][$eq]=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cmsKey}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`CMS API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const result = await response.json();

    if (!result.data || result.data.length === 0) {
      return null;
    }

    return result.data[0];
  } catch (error) {
    console.error('Error fetching case:', error.message);
    return null;
  }
}
