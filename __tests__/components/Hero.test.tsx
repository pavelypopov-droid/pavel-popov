import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import Hero from "@/components/sections/Hero";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}));

vi.mock("@/components/seo/Analytics", () => ({
  track: { cvDownload: vi.fn(), ctaClick: vi.fn() },
}));

describe("Hero — Russian (default)", () => {
  it("renders Pavel's name in Russian", () => {
    const { container } = render(<Hero />);
    expect(container.textContent).toContain("Павел Попов");
  });

  it("has Russian CV download link", () => {
    const { container } = render(<Hero />);
    const cvLink = container.querySelector('a[href="/files/CV_Pavel_Popov_RU.pdf"]');
    expect(cvLink).not.toBeNull();
    expect(cvLink).toHaveAttribute("download");
  });

  it("has CTA link to /contacts", () => {
    const { container } = render(<Hero />);
    const ctaLink = container.querySelector('a[href="/contacts"]');
    expect(ctaLink).not.toBeNull();
  });

  it("shows stats badges", () => {
    const { container } = render(<Hero />);
    expect(container.textContent).toContain("25+");
    expect(container.textContent).toContain("150+");
    expect(container.textContent).toContain("лет в IT");
  });
});

describe("Hero — English", () => {
  it("renders Pavel's name in English", () => {
    const { container } = render(<Hero lang="en" />);
    expect(container.textContent).toContain("Pavel Popov");
  });

  it("has English CV download link", () => {
    const { container } = render(<Hero lang="en" />);
    const cvLink = container.querySelector('a[href="/files/Pavel_Popov_CV_EN_1.pdf"]');
    expect(cvLink).not.toBeNull();
  });

  it("has CTA link to /en/contacts", () => {
    const { container } = render(<Hero lang="en" />);
    const ctaLink = container.querySelector('a[href="/en/contacts"]');
    expect(ctaLink).not.toBeNull();
  });

  it("shows English labels", () => {
    const { container } = render(<Hero lang="en" />);
    expect(container.textContent).toContain("Experience");
    expect(container.textContent).toContain("years in IT");
    expect(container.textContent).toContain("Projects");
  });
});
