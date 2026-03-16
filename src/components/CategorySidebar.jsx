function CategorySidebar({ categories, selectCategory }) {
  return (
    <div className="sidebar">
      <h3>Categories</h3>
      {categories.map(c =>
        <p key={c.id} onClick={() => selectCategory(c.name)}>
          {c.name}
        </p>
      )}
    </div>
  );
}

export default CategorySidebar;
