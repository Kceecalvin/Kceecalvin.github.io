"use client";
import { useState } from "react";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { inspectRequest } from "@/lib/request-lab";
const examples = {
  valid: JSON.stringify(
    { event: "page.viewed", source: "portfolio", id: "demo-001" },
    null,
    2,
  ),
  invalid: '{ "event": "", "source": 42 }',
};
export default function RequestLab() {
  const [input, setInput] = useState(examples.valid);
  const [result, setResult] = useState<ReturnType<
    typeof inspectRequest
  > | null>(null);
  return (
    <section className="request-lab" aria-labelledby="lab-title">
      <div className="lab-header">
        <div>
          <span className="label">INTERACTIVE / LOCAL ONLY</span>
          <h2 id="lab-title">Give the request a try.</h2>
          <p>Edit the JSON, then run validation. Nothing is sent or stored.</p>
        </div>
        <span className="lab-chip">Browser sandbox</span>
      </div>
      <div className="lab-columns">
        <div>
          <div className="lab-examples">
            <button
              onClick={() => {
                setInput(examples.valid);
                setResult(null);
              }}
            >
              Load valid example
            </button>
            <button
              onClick={() => {
                setInput(examples.invalid);
                setResult(null);
              }}
            >
              Load invalid example
            </button>
          </div>
          <label className="label" htmlFor="request-json">
            REQUEST BODY
          </label>
          <textarea
            id="request-json"
            spellCheck={false}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setResult(null);
            }}
            maxLength={4000}
          />
          <p className="field-hint">
            Required: event, source and id as non-empty strings.
          </p>
          <div className="button-row">
            <button
              className="button primary"
              onClick={() => setResult(inspectRequest(input))}
            >
              Validate request <ArrowRight size={16} />
            </button>
            <button
              className="icon-button"
              aria-label="Reset lab"
              onClick={() => {
                setInput(examples.valid);
                setResult(null);
              }}
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
        <div className="lab-result" role="status" aria-live="polite">
          <span className="label">VALIDATION RESULT</span>
          {result ? (
            <>
              <h3 className={result.ok ? "success" : "accent"}>
                {result.ok ? (
                  <>
                    <Check size={23} /> Request accepted
                  </>
                ) : (
                  "Check the request"
                )}
              </h3>
              <ol>
                {result.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <p>
                {result.ok
                  ? "All required fields are present. This is a local validation result, not a server response."
                  : "Fix the issue above and run validation again."}
              </p>
            </>
          ) : (
            <>
              <div className="lab-placeholder" aria-hidden="true">
                {"{ ✓ }"}
              </div>
              <h3>Ready when you are.</h3>
              <p>
                Try a valid request, break a field, or write your own. The
                result will explain what happened.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
