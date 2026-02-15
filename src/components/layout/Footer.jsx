/**
 * App footer – copyright, support email, contact number.
 */
export default function Footer() {
  return (
    <footer className="bg-card shadow-soft px-6 py-4 mt-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-600">
        <span>© {new Date().getFullYear()} Resident Community App</span>
        <div className="flex gap-4">
          <a href="mailto:admin@sunriseheights.com" className="hover:text-primary focus:outline-none focus:underline transition-colors">
            admin@sunriseheights.com
          </a>
          <a href="tel:+911234567890" className="hover:text-primary focus:outline-none focus:underline transition-colors">
            +91 1234567890
          </a>
        </div>
      </div>
    </footer>
  )
}
