import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="font-mono text-cyan-400 text-sm mb-4">404 · not-found</div>
      <h1 className="text-5xl font-bold text-white mb-4">Page not found</h1>
      <p className="text-slate-500 mb-8 max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm hover:from-cyan-400 hover:to-blue-400 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}
