import calandly_logo from "/public/logo_calandly.svg";
import Link from "next/link";
import Image from "next/image";
function Logo() {
  return (
    <div className=" items-stretch object-contain">
      <Link href="/" prefetch={false} className="overflow-hidden">
        <Image
          priority
          src={calandly_logo}
          alt="Calandly"
          width="160"
          height="100"
        />
      </Link>
    </div>
  );
}

export default Logo;
