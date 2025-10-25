import React from 'react';

// Giao diện (Interface) cho các props của từng tính năng
interface FeatureProps {
    title: string;
    description: string;
    icon: string;
}

// Thành phần Tính năng (Feature Component)
const Feature: React.FC<FeatureProps> = ({ title, description, icon }) => {
    return (
        <div className="feature">
            <div className="feature-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

// Thành phần Trang chủ (Homepage Component)
const HomePage: React.FC = () => {
    return (
        <div className="homepage">
            {/* 1. Thanh điều hướng */}
            <nav className="navbar">
                <div className="container">
                    <a href="/" className="logo">Logo</a>
                    <ul className="nav-links">
                        <li><a href="#features">Tính năng</a></li>
                        <li><a href="#about">Về chúng tôi</a></li>
                        <li><a href="#contact">Liên hệ</a></li>
                    </ul>
                </div>
            </nav>

            {/* 2. Phần giới thiệu chính (Hero Section) */}
            <header className="hero">
                <div className="container">
                    <h1>Chào mừng đến với Trang web của chúng tôi</h1>
                    <p>Một giải pháp tuyệt vời để giải quyết các vấn đề của bạn một cách hiệu quả.</p>
                    <button className="cta-button">Bắt đầu ngay</button>
                </div>
            </header>

            {/* 3. Khu vực Tính năng */}
            <section id="features" className="features-section">
                <div className="container">
                    <h2>Các tính năng chính</h2>
                    <div className="features-grid">
                        <Feature
                            icon="🚀"
                            title="Nhanh và Hiệu quả"
                            description="Trải nghiệm hiệu suất cực nhanh và quy trình làm việc được tối ưu hóa."
                        />
                        <Feature
                            icon="🔒"
                            title="An toàn và Bảo mật"
                            description="Dữ liệu của bạn được bảo vệ bằng các biện pháp bảo mật tiên tiến nhất."
                        />
                        <Feature
                            icon="💡"
                            title="Dễ sử dụng"
                            description="Giao diện trực quan và thân thiện với người dùng, không cần tốn nhiều thời gian để làm quen."
                        />
                    </div>
                </div>
            </section>

            {/* 4. Lời kêu gọi hành động (Call to Action) */}
            <section className="cta-section">
                <div className="container">
                    <h2>Sẵn sàng để bắt đầu chưa?</h2>
                    <p>Tham gia cùng hàng ngàn người dùng hài lòng ngay hôm nay.</p>
                    <button className="cta-button">Đăng ký miễn phí</button>
                </div>
            </section>

            {/* 5. Chân trang (Footer) */}
            <footer className="footer">
                <div className="container">
                    <p>&copy; 2025 Công ty của bạn. Bảo lưu mọi quyền.</p>
                </div>
            </footer>

            {/* CSS Styles */}
            <style>{`
        /* General Styles */
        .homepage {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Navbar */
        .navbar {
          background: #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          text-decoration: none;
        }

        .nav-links {
          list-style: none;
          display: flex;
          margin: 0;
          padding: 0;
        }

        .nav-links li {
          margin-left: 20px;
        }

        .nav-links a {
          text-decoration: none;
          color: #555;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-links a:hover {
          color: #007bff;
        }

        /* Hero Section */
        .hero {
          background: #f4f7f6;
          padding: 6rem 0;
          text-align: center;
        }

        .hero h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .hero p {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 2rem;
        }

        .cta-button {
          background: #007bff;
          color: #fff;
          border: none;
          padding: 1rem 2rem;
          font-size: 1rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .cta-button:hover {
          background: #0056b3;
        }

        /* Features Section */
        .features-section {
          padding: 4rem 0;
          text-align: center;
        }

        .features-section h2 {
          font-size: 2.5rem;
          margin-bottom: 3rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }
        
        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        /* CTA Section */
        .cta-section {
          background: #333;
          color: #fff;
          padding: 4rem 0;
          text-align: center;
        }

        .cta-section h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .cta-section p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }

        /* Footer */
        .footer {
          background: #f4f7f6;
          padding: 2rem 0;
          text-align: center;
          color: #666;
        }
      `}</style>
        </div>
    );
};

export default HomePage;