import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "devlog-md",
  description: "A markdown-file blog — write a post, commit, deploy.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="container">{children}</main>
      </body>
    </html>
  )
}
