import { useRouter } from 'next/navigation';

const SearchResults = ({ results }) => {
  const router = useRouter();

  const handleAlbumClick = (id) => {
    if (id) {
      router.push(`/album/${id}`);
    }
  };

  if (!results || results.length === 0) {
    return <p className="text-gray-500">Aucun résultat trouvé</p>;
  }

  return (
    <>
      <h2 className="font-semibold mb-2">Résultats de recherche :</h2>
      <ul className="divide-y divide-gray-300">
        {results.map((item) => (
          <li
            key={item.id}
            className="py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handleAlbumClick(item.id)}
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-600">
                  {item.artist} - {item.album}
                </p>
              </div>
              <p className="text-sm text-gray-500">{item.year}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchResults;

