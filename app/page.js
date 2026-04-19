export default function Home() {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Hello, I'm [Your Name]</h1>
          <p className="hero-subtitle">UX Designer crafting beautiful and intuitive experiences</p>
          <button className="cta-button">View My Work</button>
        </div>
      </section>

      <section id="work" className="work-section">
        <div className="section-container">
          <h2 className="section-title">My Work</h2>
          <div className="work-grid">
            <div className="work-card">
              <div className="work-image-placeholder">Project 1</div>
              <h3 className="work-card-title">Project Title 1</h3>
              <p className="work-card-description">Brief description of the project and your role.</p>
            </div>
            <div className="work-card">
              <div className="work-image-placeholder">Project 2</div>
              <h3 className="work-card-title">Project Title 2</h3>
              <p className="work-card-description">Brief description of the project and your role.</p>
            </div>
            <div className="work-card">
              <div className="work-image-placeholder">Project 3</div>
              <h3 className="work-card-title">Project Title 3</h3>
              <p className="work-card-description">Brief description of the project and your role.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-intro">I'm always open to discussing new projects, creative ideas, or opportunities.</p>
          <div className="contact-info">
            <div className="contact-item">
              <h3>Email</h3>
              <a href="mailto:your.email@example.com">your.email@example.com</a>
            </div>
            <div className="contact-item">
              <h3>LinkedIn</h3>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">linkedin.com/in/yourprofile</a>
            </div>
            <div className="contact-item">
              <h3>Location</h3>
              <p>Your City, Country</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
