import { Link } from "@/i18n/routing";
import { Tag } from "lucide-react";
import Image from "next/image";
type featureType = {
  title: string
  desc: string
  icon: string
  img: string
  tag:string
}

type FeatureCardProps ={ 
  feature: featureType
}
export default function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Link href={''}>
      <section className="relative group h-full border border-[#e2e8f0] rounded-lg p-4 overflow-hidden transition-all duration-300 hover:border-[#0d948949] md:max-w-[80%] md:mx-auto lg:max-w-none hover:scale-105">
        {/* tag */}
        <span
          className="absolute hidden top-3 right-4 md:inline-flex items-center gap-1 rounded-full bg-[#0d9488]/10 border border-[#0d9488]/20 px-2.5 py-1 text-xs font-medium text-[#0d9488] sm:px-3 z-10"
        >
          <Tag className="size-3 shrink-0" />
          <span className="truncate">{feature.tag}</span>
        </span>

        {/* Overlay */}
        <div className="absolute inset-0 z-[1] rounded-lg
          bg-gradient-to-r from-white/10 via-white/5 to-[rgb(13,148,136)]/5
          transition-all duration-300
          group-hover:from-white/20 group-hover:via-white/10 group-hover:to-[rgb(13,148,136)]/10
          pointer-events-none"
        />
        <div className="grid grid-cols-[auto_1fr] items-center gap-5 md:items-start relative z-10">

          {/* icon */}
          <div
            className="h-10 w-10 sm:h-14 sm:w-14"
            style={{
              backgroundImage: `url('${feature.icon}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* content */}
          <div className="text-[#111827]">
            <h1 className="text-sm font-bold md:text-base lg:text-lg b-2 pr-20">
              {feature.title}
            </h1>
            <span className="text-xs md:text-sm lg:text-base ">
            {feature.desc}
            </span>
          </div>

        </div>
        <div className="relative w-full h-48">
          <Image
            src={feature.img}
            alt="Type safe illustration"
            fill
            className="object-contain"
          />
          {/* Fade bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-white via-white/80 to-transparent group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
        </div>
      </section>
    </Link>
  )
}