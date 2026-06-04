import { Link } from "react-router-dom";

export default function ErrorPage({ code, description, image }) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white rounded-3xl shadow-sm m-4 px-4 text-center">
      <div className="max-w-md">
        {/* Gambar Error Dinamis */}
        <img
          src={image}
          alt={`Error ${code}`}
          className="w-64 md:w-80 mx-auto rounded-2xl shadow-xl mb-8 border-4 border-gray-100"
        />

        {/* Kode Error dengan Tulisan "Error" */}
        <h1 className="text-5xl font-black text-gray-900 mb-2">
          Error <span className="text-hijau">{code}</span>
        </h1>
        
        {/* Deskripsi Error Dinamis */}
        <p className="text-lg text-gray-500 mb-8 font-medium">
          {description}
        </p>

        {/* Tombol Kembali ke Dashboard agar lebih nyambung dengan App kamu */}
        <Link
          to="/"
          className="px-10 py-4 bg-hijau text-white font-bold rounded-2xl hover:bg-green-600 transition-all shadow-lg inline-block"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}