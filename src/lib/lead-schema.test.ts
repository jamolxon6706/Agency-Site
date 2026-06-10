import { describe, expect, it } from "vitest";
import { leadSubmissionSchema } from "@/src/lib/leads";

const validPayload = {
  name: "Azizbek",
  company: "Axis Client",
  role: "Founder",
  phone_or_telegram: "+998901234567",
  email: "hello@example.com",
  service_interest: ["custom-crm"],
  budget_range: "7k-15k",
  timeline: "1-2-months",
  project_summary: "Bizga leadlarni boshqarish va Telegram xabarnoma uchun custom CRM kerak.",
  preferred_language: "uz",
  consent: true,
  website: "",
};

describe("leadSubmissionSchema", () => {
  it("accepts valid payload", () => {
    const result = leadSubmissionSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("rejects payload without selected service", () => {
    const result = leadSubmissionSchema.safeParse({
      ...validPayload,
      service_interest: [],
    });

    expect(result.success).toBe(false);
  });

  it("rejects payload with missing consent", () => {
    const result = leadSubmissionSchema.safeParse({
      ...validPayload,
      consent: false,
    });

    expect(result.success).toBe(false);
  });
});

