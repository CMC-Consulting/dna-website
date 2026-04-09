// ReviewCard.tsx
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export type ReviewType = {
  id: number
  comment: string
  name: string
  role: string
  avatar: string
  stars: number
}

type ReviewCardProps = {
  review: ReviewType
}

const MAX_STARS = 5;

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <section className="w-full flex flex-col p-3 gap-7 border border-[#e2e8f0] rounded-lg">
      <span className="italic">{review.comment}</span>

      <div className="w-full flex items-center gap-5">
        <div className="relative h-7 w-7 rounded-sm overflow-hidden shrink-0">
          <Image src={review.avatar} fill alt={review.name} className="object-cover" />
        </div>

        <div className="text-[#595e68]">
          <p className="text-lg">{review.name}</p>
          <div className="flex items-center gap-1">
            <span className="text-xs">{review.role}</span>
            <span className="text-xs mx-1">|</span>
            <div className="flex items-center">
              {Array.from({ length: MAX_STARS }).map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={`size-3 ${i < review.stars ? "text-[#F59E0B]" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}