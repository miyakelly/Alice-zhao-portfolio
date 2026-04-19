import Link from "next/link";

export default function About() {
  return (
    <div className="about">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">About Me</h1>
          <p className="about-subtitle">UX Designer | Problem Solver | Creative Thinker</p>
        </div>
      </section>

      <section className="about-content-section">
        <div className="content-container">
          <div className="about-intro">
            <h2>Hello! I'm [Your Name]</h2>
            <p>
              I'm a passionate UX Designer dedicated to creating meaningful and delightful user experiences.
              With a background in [your background], I bring a unique perspective to solving complex design challenges.
            </p>
          </div>

          <div className="about-details">
            <div className="detail-card">
              <h3>My Approach</h3>
              <p>
                I believe in user-centered design that combines research, empathy, and creativity.
                Every project starts with understanding the users' needs and translating those insights
                into intuitive and engaging solutions.
              </p>
            </div>

            <div className="detail-card">
              <h3>Skills & Expertise</h3>
              <ul className="skills-list">
                <li>User Research & Testing</li>
                <li>Wireframing & Prototyping</li>
                <li>Visual Design</li>
                <li>Interaction Design</li>
                <li>Design Systems</li>
                <li>Figma, Sketch, Adobe XD</li>
              </ul>
            </div>

            <div className="detail-card">
              <h3>Experience</h3>
              <p>
                I've had the opportunity to work with diverse clients and teams, from startups to
                established companies, helping them create products that users love. Each project
                has taught me something new about design, collaboration, and the importance of
                continuous learning.
              </p>
            </div>

            <div className="detail-card">
              <h3>Beyond Design</h3>
              <p>
                When I'm not designing, you can find me [your hobbies/interests]. I believe that
                inspiration comes from everywhere, and staying curious helps me bring fresh
                perspectives to my work.
              </p>
            </div>
          </div>

          <div className="about-cta">
            <h2>Let's Work Together</h2>
            <p>I'm always excited to take on new challenges and collaborate on interesting projects.</p>
            <Link href="/#contact" className="contact-button">Get In Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
