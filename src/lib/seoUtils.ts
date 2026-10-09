/**
 * SEO Metadata Helper
 */
export function constructMetadata({
  title,
  description,
  image = "/logo.png",
}: {
  title: string;
  description: string;
  image?: string;
}) {
  return {
    title: title + " | Raven Tutorials",
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
  };
}
