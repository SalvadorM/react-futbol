


// Formation selector component (header)
export default function FormationSelector( { formations, selected, onSelect } ) {
  return (
    <div className="w-full overflow-x-auto py-4 px-6 mb-6 bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg shadow-xl flex items-center justify-start space-x-4 custom-scrollbar">
      {formations.map((formation) => (
        <div
          key={formation}
          className={`
            flex-shrink-0 p-4 rounded-xl cursor-pointer transition-all duration-300 ease-in-out
            ${selected === formation
              ? 'bg-blue-300 text-blue-900 border-2 border-blue-500 shadow-md transform scale-105'
              : 'bg-white text-gray-700 hover:bg-blue-100 hover:shadow-md'
            }
            flex items-center justify-center text-lg font-bold min-w-[120px] h-20
          `}
          onClick={() => onSelect(formation)}
        >
          {formation}
        </div>
      ))}
    </div>
  );
}