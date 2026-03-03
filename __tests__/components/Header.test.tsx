import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/layout/Header";

let mockPathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("Header — Russian", () => {
  it("renders Russian nav links", () => {
    mockPathname = "/";
    const { container } = render(<Header />);
    expect(container.textContent).toContain("Услуги");
    expect(container.textContent).toContain("Кейсы");
    expect(container.textContent).toContain("О себе");
    expect(container.textContent).toContain("Блог");
    expect(container.textContent).toContain("Контакты");
  });

  it("shows Russian name in logo", () => {
    mockPathname = "/";
    const { container } = render(<Header />);
    expect(container.textContent).toContain("Павел Попов");
  });

  it("has correct Russian nav hrefs", () => {
    mockPathname = "/";
    const { container } = render(<Header />);
    expect(container.querySelector('a[href="/services"]')).not.toBeNull();
    expect(container.querySelector('a[href="/cases"]')).not.toBeNull();
    expect(container.querySelector('a[href="/about"]')).not.toBeNull();
    expect(container.querySelector('a[href="/blog"]')).not.toBeNull();
    expect(container.querySelector('a[href="/contacts"]')).not.toBeNull();
  });

  it("has language switcher to EN", () => {
    mockPathname = "/";
    const { container } = render(<Header />);
    const enLink = container.querySelector('a[href="/en"]');
    expect(enLink).not.toBeNull();
  });

  it("links logo to root", () => {
    mockPathname = "/";
    const { container } = render(<Header />);
    const logoLink = container.querySelector('a[href="/"]');
    expect(logoLink).not.toBeNull();
    expect(logoLink?.textContent).toContain("PP");
  });
});

describe("Header — English", () => {
  it("renders English nav links", () => {
    mockPathname = "/en/services";
    const { container } = render(<Header />);
    expect(container.textContent).toContain("Services");
    expect(container.textContent).toContain("Cases");
    expect(container.textContent).toContain("About");
    expect(container.textContent).toContain("Blog");
    expect(container.textContent).toContain("Contact");
  });

  it("shows English name in logo", () => {
    mockPathname = "/en";
    const { container } = render(<Header />);
    expect(container.textContent).toContain("Pavel Popov");
  });

  it("has language switcher to RU", () => {
    mockPathname = "/en";
    const { container } = render(<Header />);
    const ruLink = container.querySelector('a[href="/"]');
    expect(ruLink).not.toBeNull();
  });

  it("links logo to /en", () => {
    mockPathname = "/en";
    const { container } = render(<Header />);
    const logoLink = container.querySelector('a[href="/en"]');
    expect(logoLink).not.toBeNull();
  });
});

describe("Header — mobile menu", () => {
  it("opens mobile menu on click", async () => {
    mockPathname = "/";
    const user = userEvent.setup();
    const { container } = render(<Header />);

    const menuButton = container.querySelector('button[aria-label="Menu"]')!;
    const linksBefore = container.querySelectorAll("a").length;

    await user.click(menuButton);

    const linksAfter = container.querySelectorAll("a").length;
    expect(linksAfter).toBeGreaterThan(linksBefore);
  });
});
