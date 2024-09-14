import Link from "next/link";
import { FunctionComponent } from "react";

interface SocialMediaItem {
  name: string;
  icon: JSX.Element;
  href: string;
  target: string;
}

interface SocialMediaBarProps {
  socialmedia: SocialMediaItem[];
}

const SocialMediaBar: FunctionComponent<SocialMediaBarProps> = ({
  socialmedia,
}) => {
  return (
    <div className="flex flex-wrap text-center lg:text-left">
      {/* Social media icons container */}
      <div className="flex flex-row mt-6 lg:mb-0">
        {socialmedia &&
          socialmedia.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-start justify-center p-2 md:m-2 text-black shadow-lg font-normal h-10 w-10 rounded-full outline-none focus:outline-none hover:bg-yellow-500"
            >
              {item.icon}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SocialMediaBar;
