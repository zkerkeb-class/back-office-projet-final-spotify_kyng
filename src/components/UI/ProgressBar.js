const ProgressBar = ({ progress, label }) => (
  <div className="mt-4">
    {label && <p className="text-white font-semibold">{label}: {progress}%</p>}
    <div
      className="w-full rounded-full h-2.5"
      style={{
        backgroundColor: 'var(--inverted-background-base, #f0f0f0)', // Fond clair qui correspond à la page
        borderRadius: 'var(--encore-corner-radius-smaller, 2px)',
      }}
    >
      <div
        className="h-2.5 rounded-full"
        style={{
          width: `${progress}%`,
          backgroundColor: 'var(--background-base, #7d2f95)', // Couleur de la barre de progression
          transition: 'width 0.3s ease-in-out',
        }}
      ></div>
    </div>
  </div>
);

export default ProgressBar;