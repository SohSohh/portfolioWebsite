export const metadata = {
  title: 'Sohaib | Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 to-indigo-950 min-h-screen flex items-center justify-center">
        <main>{children}</main>
      </body>
    </html>
  )
}

