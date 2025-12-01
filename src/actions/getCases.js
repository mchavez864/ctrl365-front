'use server';

export async function getCases(locale) {
  const apiLocale = locale === 'es' ? 'es-AR' : 'en';
  const url = `${process.env.CMS_URL_API}/case-studies?&populate=*&locale=${apiLocale}&sort=createdAt:desc`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CMS_KEY}`,
    },
  });

  const result = await response.json();
  return result.data;
}

export async function getCase(id, locale) {
  const apiLocale = locale === 'es' ? 'es-AR' : 'en';
  const url = `${process.env.CMS_URL_API}/case-studies?populate=*&locale=${apiLocale}&filters[Slug][$eq]=${id}`;
  
  console.log('DEBUG - Fetching case with URL:', url);
  console.log('DEBUG - Slug:', id, 'Locale:', apiLocale);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CMS_KEY}`,
    },
  });
  
  const result = await response.json();
  console.log('DEBUG - Strapi response status:', result.data ? 'OK' : 'ERROR');

  if (!result.data || result.data.length === 0) {
    console.log('DEBUG - No case found for slug:', id, 'locale:', apiLocale);
    return null;
  }

  console.log('DEBUG - Case found, localizations:', result.data[0].localizations);
  return result.data[0];
}
