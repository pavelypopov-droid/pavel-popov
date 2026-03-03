import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ui/ContactForm";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock("@/components/seo/Analytics", () => ({
  track: { formSubmit: vi.fn() },
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("ContactForm — Russian (default)", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("renders form with Russian title", () => {
    const { container } = render(<ContactForm />);
    expect(container.textContent).toContain("Написать сообщение");
  });

  it("has name, email, message fields", () => {
    const { container } = render(<ContactForm />);
    expect(container.querySelector('input[name="name"]')).not.toBeNull();
    expect(container.querySelector('input[name="email"]')).not.toBeNull();
    expect(container.querySelector('textarea[name="message"]')).not.toBeNull();
  });

  it("has privacy consent link to /privacy", () => {
    const { container } = render(<ContactForm />);
    const privacyLink = container.querySelector('a[href="/privacy"]');
    expect(privacyLink).not.toBeNull();
    expect(privacyLink?.textContent).toContain("Политикой конфиденциальности");
  });

  it("has consent text about data processing", () => {
    const { container } = render(<ContactForm />);
    expect(container.textContent).toContain("согласие на обработку персональных данных");
    expect(container.textContent).toContain("трансграничную передачу");
  });

  it("has subject select with Russian options", () => {
    const { container } = render(<ContactForm />);
    const select = container.querySelector('select[name="subject"]');
    expect(select).not.toBeNull();
    expect(select?.textContent).toContain("Консультация");
    expect(select?.textContent).toContain("AI проект");
  });

  it("has honeypot field", () => {
    const { container } = render(<ContactForm />);
    const honeypot = container.querySelector('input[name="_honeypot"]');
    expect(honeypot).not.toBeNull();
    expect(honeypot).toHaveClass("hidden");
  });

  it("validates required fields", async () => {
    const user = userEvent.setup();
    const { container } = render(<ContactForm />);

    const submitBtn = container.querySelector('button[type="submit"]');
    await user.click(submitBtn!);

    expect(container.textContent).toContain("Введите имя");
    expect(container.textContent).toContain("Введите email");
    expect(container.textContent).toContain("Опишите задачу");
  });

  it("submits form and calls API", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    const user = userEvent.setup();
    const { container } = render(<ContactForm />);

    const nameInput = container.querySelector('input[name="name"]')!;
    const emailInput = container.querySelector('input[name="email"]')!;
    const messageInput = container.querySelector('textarea[name="message"]')!;
    const submitBtn = container.querySelector('button[type="submit"]')!;

    await user.type(nameInput, "Тест");
    await user.type(emailInput, "test@test.com");
    await user.type(messageInput, "Тестовое сообщение");
    await user.click(submitBtn);

    expect(mockFetch).toHaveBeenCalledWith("/api/contact", expect.objectContaining({ method: "POST" }));
  });

  it("shows success state after submit", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    const user = userEvent.setup();
    const { container } = render(<ContactForm />);

    await user.type(container.querySelector('input[name="name"]')!, "Тест");
    await user.type(container.querySelector('input[name="email"]')!, "test@test.com");
    await user.type(container.querySelector('textarea[name="message"]')!, "Тест");
    await user.click(container.querySelector('button[type="submit"]')!);

    const successMessages = await screen.findAllByText("Спасибо за обращение!");
    expect(successMessages.length).toBeGreaterThan(0);
  });

  it("shows error on failed submit", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    const user = userEvent.setup();
    const { container } = render(<ContactForm />);

    await user.type(container.querySelector('input[name="name"]')!, "Тест");
    await user.type(container.querySelector('input[name="email"]')!, "test@test.com");
    await user.type(container.querySelector('textarea[name="message"]')!, "Тест");
    await user.click(container.querySelector('button[type="submit"]')!);

    expect(await screen.findByText(/Ошибка отправки/)).toBeInTheDocument();
  });
});

describe("ContactForm — English", () => {
  it("renders English title and placeholders", () => {
    const { container } = render(<ContactForm lang="en" />);
    expect(container.textContent).toContain("Send a Message");
    expect(container.querySelector('input[placeholder="Your name"]')).not.toBeNull();
    expect(container.querySelector('input[placeholder="Company name"]')).not.toBeNull();
  });

  it("has privacy consent link to /en/privacy", () => {
    const { container } = render(<ContactForm lang="en" />);
    const privacyLink = container.querySelector('a[href="/en/privacy"]');
    expect(privacyLink).not.toBeNull();
    expect(privacyLink?.textContent).toContain("Privacy Policy");
  });

  it("has English subject options", () => {
    const { container } = render(<ContactForm lang="en" />);
    const select = container.querySelector('select[name="subject"]');
    expect(select?.textContent).toContain("Consultation");
    expect(select?.textContent).toContain("AI Project");
  });

  it("validates with English messages", async () => {
    const user = userEvent.setup();
    const { container } = render(<ContactForm lang="en" />);

    await user.click(container.querySelector('button[type="submit"]')!);

    expect(container.textContent).toContain("Please enter your name");
    expect(container.textContent).toContain("Please enter your email");
  });
});
