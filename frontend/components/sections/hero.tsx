import Markdown from 'react-markdown';
import ButtonLink from '../elements/button-link';
import NextImage from '../elements/image';
import { getButtonAppearance } from '../../src/utils/button';

interface typesHero {
  data: {
    label: string;
    title: string;
    description: string;
    buttons: (string | number)[];
    smallTextWithLink: string;
    picture: {
      url: string;
      alternativeText: string;
      width: number;
      height: number;
    };
  };
}

const Hero: React.FC<typesHero> = ({ data }) => {
  return (
    <main className="container flex flex-col items-center justify-between py-12 md:flex-row">
      {/* Left column for content */}
      <div className="flex-1 sm:pr-8">
        {/* Hero section label */}
        <p className="font-semibold tracking-wide uppercase">{data.label}</p>
        {/* Big title */}
        <h1 className="mt-2 mb-4 title sm:mt-0 sm:mb-2">{data.title}</h1>
        {/* Description paragraph */}
        <p className="mb-6 text-xl">{data.description}</p>
        {/* Buttons row */}
        <div className="flex flex-row flex-wrap gap-4">
          {data.buttons.map((button: any) => (
            <ButtonLink
              button={button}
              appearance={getButtonAppearance(button.type, 'light')}
              key={button.id}
            />
          ))}
        </div>
        {/* Small rich text */}
        <div className="mt-4 text-base md:text-sm sm:mt-3 rich-text-hero">
          <Markdown>{data.smallTextWithLink}</Markdown>
        </div>
      </div>
      {/* Right column for the image */}
      <div className="flex-shrink-0 w-full mt-6 md:w-6/12 md:mt-0">
        {console.log(data.picture, 'ini datanya')}
        <NextImage media={data.picture} />
      </div>
    </main>
  );
};

export default Hero;
