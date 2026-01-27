export default function Profile({ preview }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-2xl font-bold text-[#EC008C] mb-4">
        Profil Perusahaan
      </h3>
      <p className="text-gray-700">
        PT Wizzmie Boga Abadi, berdagang dengan nama Wizzmie, adalah perusahaan Indonesia yang mewaralabakan jaringan restoran dengan menu andalan berupa mi goreng pedas.
         Didirikan pada tahun 2022, Wizzmie berawal dari satu restoran di Surabaya yang menjadi viral di internet karena strategi pemasaran bertemakan disko.
         Saat ini, Wizzmie mewaralabakan lebih dari 50 cabang di seluruh wilayah Indonesia, dengan mayoritasnya berada di Jawa.
      </p>

      {!preview && (
        <p className="mt-4 text-gray-700">
          Perusahaan ini fokus pada kualitas produk, pelayanan cepat, serta inovasi
          menu yang mengikuti selera pasar.
        </p>
      )}
    </div>
  );
}