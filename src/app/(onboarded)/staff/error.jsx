"use client";

export default function StaffError({ error, unstable_retry }) {
  return (
    <div className="text-center py-16">
      <p className="text-gray-900 font-medium mb-1">Couldn't load staff</p>
      <p className="text-sm text-gray-500 mb-4">
        Something went wrong while fetching this page.
      </p>
      <button
        onClick={() => unstable_retry()}
        className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
      >
        Try again
      </button>
    </div>
  );
}