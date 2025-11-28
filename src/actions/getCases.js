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
  const response = await fetch(
    `${process.env.CMS_URL_API}/case-studies?populate=*&locale=${
      locale === 'es' ? 'es-AR' : 'en'
    }&filters[Slug][$eq]=${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CMS_KEY}`,
      },
    }
  );
  const result = await response.json();

  //   if (result.data.length === 0) {
  //     return null;
  //   }

  return result.data[0];
}
