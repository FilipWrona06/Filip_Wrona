import Image from "next/image";

// TODO: wrzuć swoje zdjęcie jako /public/filip-wrona.jpg i ustaw HAS_PHOTO na true.
const HAS_PHOTO = false;

export function PortraitPlaceholder({ priority }: { priority?: boolean }) {
  if (HAS_PHOTO) {
    return (
      <Image
        src="/filip-wrona.jpg"
        alt="Filip Wrona"
        fill
        preload={priority}
        sizes="(min-width: 768px) 40vw, 100vw"
        className="object-cover grayscale"
      />
    );
  }
  return (
    <div className="absolute inset-0 flex items-end bg-mist p-6">
      <span className="text-sm text-stone">Tu pojawi się Twoje zdjęcie</span>
    </div>
  );
}
