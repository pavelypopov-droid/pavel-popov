import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

let mockPathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("Footer — Russian", () => {
  it("renders Russian section headings", () => {
    mockPathname = "/";
    const { container } = render(<Footer />);
    expect(container.textContent).toContain("Навигация");
    expect(container.textContent).toContain("Контакты");
    expect(container.textContent).toContain("Услуги");
  });

  it("has privacy link to /privacy", () => {
    mockPathname = "/";
    const { container } = render(<Footer />);
    const link = container.querySelector('a[href="/privacy"]');
    expect(link).not.toBeNull();
    expect(link?.textContent).toBe("Политика конфиденциальности");
  });

  it("shows email", () => {
    mockPathname = "/";
    const { container } = render(<Footer />);
    const emailLink = container.querySelector('a[href="mailto:popov@iofm.ru"]');
    expect(emailLink).not.toBeNull();
  });

  it("shows phone numbers", () => {
    mockPathname = "/";
    const { container } = render(<Footer />);
    expect(container.querySelector('a[href="tel:+998951480206"]')).not.toBeNull();
    expect(container.querySelector('a[href="tel:+79255064560"]')).not.toBeNull();
  });

  it("shows copyright with current year", () => {
    mockPathname = "/";
    const { container } = render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(container.textContent).toContain(`© ${year}`);
    expect(container.textContent).toContain("Павел Попов");
  });

  it("has social media links", () => {
    mockPathname = "/";
    const { container } = render(<Footer />);
    expect(container.querySelector('a[href="https://www.linkedin.com/in/pavel-popov-19917266/"]')).not.toBeNull();
    expect(container.querySelector('a[href="https://t.me/popov_pa_uz"]')).not.toBeNull();
  });

  it("lists all service links", () => {
    mockPathname = "/";
    const { container } = render(<Footer />);
    expect(container.querySelector('a[href="/services#ai"]')).not.toBeNull();
    expect(container.querySelector('a[href="/services#strategy"]')).not.toBeNull();
    expect(container.querySelector('a[href="/services#cto"]')).not.toBeNull();
  });

  it("has nav links", () => {
    mockPathname = "/";
    const { container } = render(<Footer />);
    expect(container.querySelector('a[href="/cases"]')).not.toBeNull();
    expect(container.querySelector('a[href="/about"]')).not.toBeNull();
    expect(container.querySelector('a[href="/blog"]')).not.toBeNull();
  });
});

describe("Footer — English", () => {
  it("renders English headings", () => {
    mockPathname = "/en/about";
    const { container } = render(<Footer />);
    expect(container.textContent).toContain("Navigation");
    expect(container.textContent).toContain("Contact");
    expect(container.textContent).toContain("Services");
  });

  it("has privacy link to /en/privacy", () => {
    mockPathname = "/en";
    const { container } = render(<Footer />);
    const link = container.querySelector('a[href="/en/privacy"]');
    expect(link).not.toBeNull();
    expect(link?.textContent).toBe("Privacy Policy");
  });

  it("shows English location and copyright", () => {
    mockPathname = "/en";
    const { container } = render(<Footer />);
    expect(container.textContent).toContain("Tashkent, Uzbekistan / Remote");
    expect(container.textContent).toContain("All rights reserved");
  });

  it("has English nav links", () => {
    mockPathname = "/en";
    const { container } = render(<Footer />);
    expect(container.querySelector('a[href="/en/cases"]')).not.toBeNull();
    expect(container.querySelector('a[href="/en/about"]')).not.toBeNull();
    expect(container.querySelector('a[href="/en/services#ai"]')).not.toBeNull();
  });
});
