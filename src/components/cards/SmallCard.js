export default function SmallCard({
  copy = 'TITLE',
  colorCircle = 'bg-orange',
  colorCopy = 'text-grey-40',
  className = '',
}) {
  return (
    <div
      className={`${colorCopy} flex items-center font-inter gap-2 text-grey-30 font-medium ${className}`}
    >
      <span
        className={`${colorCircle} inline-block w-[12px] h-[12px] rounded-full bg-grey-30`}
      ></span>
      {copy}
    </div>
  );
}
