import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactSection.css";

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [statusMessage, setStatusMessage] = useState<{
        text: string;
        type?: "success" | "error";
    }>({
        text: "",
        type: undefined,
    });

    const [sending, setSending] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setStatusMessage({ text: "", type: undefined });

        try {
            await emailjs.send(
                "service_w7eyg1t", // ✅ service ID của bạn
                "template_s8u76ep", // ✅ template ID của bạn
                {
                    fullname: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    description: formData.message,
                },
                "-MhRSjYpD87lcYJ1c" // ✅ public key của bạn
            );

            setStatusMessage({
                text: "Gửi thành công! Chúng tôi sẽ liên hệ sớm nhất.",
                type: "success",
            });
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            console.error("EmailJS error:", error);
            setStatusMessage({
                text: "Có lỗi xảy ra khi gửi. Vui lòng thử lại sau.",
                type: "error",
            });
        } finally {
            setSending(false);
        }
    };

    return (
        <section className="contact-section" id="contact">
            <div className="contact-container">
                <h2>Liên hệ với chúng tôi</h2>
                <p>Hãy để lại thông tin của bạn để chúng tôi hỗ trợ tốt nhất.</p>

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                        <input
                            type="text"
                            name="name"
                            placeholder="Họ và tên"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Số điện thoại"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="message"
                        rows={4}
                        placeholder="Nội dung cần tư vấn..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>

                    {statusMessage.text && (
                        <div
                            className={`status-message ${
                                statusMessage.type === "success" ? "success" : "error"
                            }`}
                        >
                            {statusMessage.text}
                        </div>
                    )}

                    <button type="submit" disabled={sending}>
                        {sending ? "Đang gửi..." : "Gửi liên hệ"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ContactSection;
