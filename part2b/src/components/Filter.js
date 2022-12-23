export const Filter = ({ filterText, setFilterText }) => {
  return (
    <div>
      filter shown with:
      <input
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
    </div>
  );
};
