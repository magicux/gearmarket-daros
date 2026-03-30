function EmptyState({ title, description }) {
  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-5 text-center">
        <div className="display-6 mb-3">📭</div>
        <h3 className="h5 fw-bold">{title}</h3>
        <p className="text-body-secondary mb-0">{description}</p>
      </div>
    </div>
  );
}

export default EmptyState;
