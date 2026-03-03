import { describe, it, expect } from "vitest";
import { services, cases, blogPosts, testimonials, timeline, skills, stats } from "@/lib/data";

describe("services", () => {
  it("has 6 services", () => {
    expect(services).toHaveLength(6);
  });

  it("each service has required fields", () => {
    for (const s of services) {
      expect(s).toHaveProperty("id");
      expect(s).toHaveProperty("icon");
      expect(s).toHaveProperty("title");
      expect(s).toHaveProperty("description");
      expect(s).toHaveProperty("details");
      expect(s.details.length).toBeGreaterThan(0);
    }
  });

  it("has unique ids", () => {
    const ids = services.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("cases", () => {
  it("has 4 cases", () => {
    expect(cases).toHaveLength(4);
  });

  it("each case has required fields", () => {
    for (const c of cases) {
      expect(c.slug).toBeTruthy();
      expect(c.title).toBeTruthy();
      expect(c.challenge).toBeTruthy();
      expect(c.solution).toBeTruthy();
      expect(c.results.length).toBeGreaterThan(0);
      expect(c.period).toBeTruthy();
    }
  });

  it("has unique slugs", () => {
    const slugs = cases.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("blogPosts", () => {
  it("has posts", () => {
    expect(blogPosts.length).toBeGreaterThan(0);
  });

  it("each post has bilingual fields", () => {
    for (const post of blogPosts) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.titleEn).toBeTruthy();
      expect(post.excerpt).toBeTruthy();
      expect(post.excerptEn).toBeTruthy();
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("is sorted by date descending", () => {
    for (let i = 1; i < blogPosts.length; i++) {
      expect(blogPosts[i - 1].date >= blogPosts[i].date).toBe(true);
    }
  });

  it("has unique slugs", () => {
    const slugs = blogPosts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("testimonials", () => {
  it("has testimonials", () => {
    expect(testimonials.length).toBeGreaterThan(0);
  });

  it("each testimonial has name, company and text", () => {
    for (const t of testimonials) {
      expect(t.name).toBeTruthy();
      expect(t.company).toBeTruthy();
      expect(t.text).toBeTruthy();
    }
  });
});

describe("timeline", () => {
  it("has career entries", () => {
    expect(timeline.length).toBeGreaterThan(0);
  });

  it("each entry has role and company", () => {
    for (const entry of timeline) {
      expect(entry.role).toBeTruthy();
      expect(entry.company).toBeTruthy();
      expect(entry.period).toBeTruthy();
    }
  });
});

describe("skills", () => {
  it("has skills", () => {
    expect(skills.length).toBeGreaterThan(0);
  });

  it("has no duplicates", () => {
    expect(new Set(skills).size).toBe(skills.length);
  });
});

describe("stats", () => {
  it("has numeric values", () => {
    for (const stat of stats) {
      expect(typeof stat.value).toBe("number");
      expect(stat.label).toBeTruthy();
    }
  });
});
