import Link from "next/link";
import { BookCardProps } from "@/types";
import Image from "next/image";

const BookCard = ({ title, author, coverURL, slug }: BookCardProps) => {
    const safeTitle = title || "Book Cover";

    return (
        <Link href={`/books/${slug}`}>
            <article className="book-card">
                <figure className="book-card-figure">
                    <div className="book-card-cover-wrapper">
                        {coverURL ? (
                            <Image
                                src={coverURL}
                                alt={safeTitle}
                                width={133}
                                height={200}
                                className="book-card-cover"
                            />
                        ) : (
                            <div
                                className="book-card-cover flex items-center justify-center bg-[#f8f4e9] text-[#212a3b] text-center p-2 text-xs font-medium"
                                style={{ width: 133, height: 200 }}
                            >
                                {safeTitle}
                            </div>
                        )}
                    </div>

                    <figcaption className="book-card-meta">
                        <h3 className="book-card-title">{title || "Unknown Title"}</h3>
                        <p className="book-card-author">{author || "Unknown Author"}</p>
                    </figcaption>
                </figure>
            </article>
        </Link>
    )
}
export default BookCard
