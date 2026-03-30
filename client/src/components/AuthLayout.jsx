function AuthLayout({ title, description, children }) {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-6 col-xl-5">
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="card-body p-4 p-md-5">
            <h1 className="h3 fw-bold mb-2">{title}</h1>
            <p className="text-body-secondary mb-4">{description}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
