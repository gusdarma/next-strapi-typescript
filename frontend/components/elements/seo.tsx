import { NextSeo } from 'next-seo';
import { getStrapiMedia } from '../../src/utils/media';

interface typesSeo {
  metadata: {
    metaTitle: string;
    metaDescription: string;
    shareImage: {
      formats: (string | number)[];
    };
    twitterCardType: string;
    twitterUsername: string;
  };
}

const Seo: React.FC<typesSeo> = ({ metadata }) => {
  // Prevent errors if no metadata was set
  if (!metadata) return null;

  return (
    <NextSeo
      title={metadata.metaTitle}
      description={metadata.metaDescription}
      //@ts-ignore
      openGraph={{
        // Title and description are mandatory
        title: metadata.metaTitle,
        description: metadata.metaDescription,
        // Only include OG image if we have it
        // Careful: if you disable image optimization in Strapi, this will break
        // ...(metadata.shareImage && {
        //     images: Object.values(metadata.shareImage.formats).map(
        //         (image: any) => {
        //             return {
        //                 url: getStrapiMedia(image.url),
        //                 width: image.width,
        //                 height: image.height,
        //             };
        //         },
        //     ),
        // }),
      }}
      // Only included Twitter data if we have it
      // twitter={{
      //     ...(metadata.twitterCardType && {
      //         cardType: metadata.twitterCardType,
      //     }),
      //     // Handle is the twitter username of the content creator
      //     ...(metadata.twitterUsername && {
      //         handle: metadata.twitterUsername,
      //     }),
      // }}
    />
  );
};

export default Seo;
