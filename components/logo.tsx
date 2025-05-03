import Link from "next/link"
import Image from "next/image"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative h-8 w-8 overflow-hidden rounded-md">
        <Image src="/logo-icon.png" alt="ReelForge Logo" width={32} height={32} className="object-cover" />
      </div>
      <span className="font-bold text-xl">ReelForge</span>
    </Link>
  )
}
