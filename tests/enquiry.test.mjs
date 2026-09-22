import test from "node:test";
import assert from "node:assert/strict";
import { enquirySchema, enquiryHtml, enquiryText } from "../src/lib/enquiry.ts";
import { inspectRequest } from "../src/lib/request-lab.ts";
const valid = {
  name: "Ada Example",
  email: "ada@example.com",
  type: "Website",
  budget: "Not sure yet",
  timeline: "Flexible",
  message: "A responsive portfolio for my illustration work.",
  website: "",
};
test("enquiries require valid contact details and a meaningful brief", () => {
  assert.equal(enquirySchema.safeParse(valid).success, true);
  for (const change of [
    { email: "wrong" },
    { name: "A" },
    { message: "short" },
    { website: "spam" },
    { type: "unknown" },
    { message: "a".repeat(3001) },
  ])
    assert.equal(
      enquirySchema.safeParse({ ...valid, ...change }).success,
      false,
    );
});
test("email template escapes all user input and keeps a readable text alternative", () => {
  const input = {
    ...valid,
    name: "<img src=x onerror=alert(1)>",
    message: 'A project with <script>alert("x")</script> & details',
  };
  const html = enquiryHtml(input);
  assert.ok(!html.includes("<script>"));
  assert.ok(!html.includes("<img src=x"));
  assert.ok(html.includes("&lt;script&gt;"));
  assert.ok(html.includes("&amp; details"));
  assert.ok(enquiryText(valid).includes(valid.message));
  assert.ok(enquiryText(valid).includes(valid.email));
});
test("request lab reports parsing, shape and missing-field failures honestly", () => {
  assert.equal(inspectRequest("{bad").ok, false);
  for (const input of [
    "null",
    "[]",
    "42",
    "{}",
    '{"event":"","id":"1","source":"web"}',
    '{"event":"view","id":1,"source":"web"}',
  ])
    assert.equal(inspectRequest(input).ok, false);
  assert.equal(
    inspectRequest(JSON.stringify({ event: "view", id: "1", source: "web" }))
      .ok,
    true,
  );
  assert.equal(inspectRequest("x".repeat(4001)).ok, false);
});
