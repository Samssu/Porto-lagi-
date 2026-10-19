'use client';

import { useEffect } from 'react';

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="glass max-w-md rounded-2xl p-10">
        <h2 className="text-2xl font-bold mb-2 text-white">Terjadi kesalahan</h2>
        <p className="text-slate-400 mb-6">Maaf, ada yang salah saat menampilkan halaman.</p>
        <button
          type="button"
          onClick={() => retry()}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl hover:opacity-90 transition font-medium"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
