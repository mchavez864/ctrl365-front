import Image from 'next/image';

export default function BigCard({
  title = 'TITLE',
  copy = 'bg-orange',
  image,
  className = '',
}) {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}>
      <div className="absolute z-10 top-0 left-0 w-full h-full p-4 flex flex-col justify-between md:p-8 lg:p-16">
        <p className="text-white !font-sora !text-xl font-medium lg:!text-2xl">
          {title}
        </p>
        <p className="text-white lg:!text-2xl">{copy}</p>
      </div>

      <figure className="relative rounded-2xl overflow-hidden z-0 h-[424px] lg:h-[700px]">
        <span className="z-0 absolute bottom-0 left-0 inline-block w-full h-[200px] bg-gradient-to-t from-black/60 to-transparent lg:h-[300px]"></span>
        <Image
          src={image}
          alt={title}
          width={2026}
          height={1528}
          className="w-full h-full object-cover"
        />
      </figure>
    </div>
  );
}
