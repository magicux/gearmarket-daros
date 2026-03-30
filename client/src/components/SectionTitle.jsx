function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-4">
      {eyebrow ? <span className="text-uppercase small fw-semibold text-primary">{eyebrow}</span> : null}
      <h2 className="fw-bold mt-2 mb-2">{title}</h2>
      {description ? <p className="text-body-secondary mb-0">{description}</p> : null}
    </div>
  );
}

export default SectionTitle;
