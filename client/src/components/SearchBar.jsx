import { mockCategories } from '../data/mockData';

function SearchBar({ filters, onChange }) {
  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <div className="row g-3">
          <div className="col-md-8">
            <label htmlFor="search" className="form-label fw-semibold">
              Buscar producto
            </label>
            <input
              id="search"
              className="form-control"
              type="search"
              placeholder="Bicicleta, running, Viña del Mar..."
              value={filters.search}
              onChange={(event) => onChange({ ...filters, search: event.target.value })}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="category" className="form-label fw-semibold">
              Categoría
            </label>
            <select
              id="category"
              className="form-select"
              value={filters.category}
              onChange={(event) => onChange({ ...filters, category: event.target.value })}
            >
              {mockCategories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
