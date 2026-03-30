import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { act, create } from "react-test-renderer";
import { Button } from "./Button";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

test("renders a primary medium button with a required label", () => {
  const markup = renderToStaticMarkup(<Button>Save changes</Button>);

  assert.match(markup, /data-zds-variant="primary"/);
  assert.match(markup, /data-zds-size="medium"/);
  assert.match(markup, />Save changes</);
  assert.doesNotMatch(markup, /disabled=""/);
});

test("throws when no text label is provided", () => {
  assert.throws(() => renderToStaticMarkup(<Button />), /requires a text label/i);
});

test("locks interaction and exposes busy state while loading", () => {
  const markup = renderToStaticMarkup(<Button loading>Saving</Button>);

  assert.match(markup, /disabled=""/);
  assert.match(markup, /aria-busy="true"/);
  assert.match(markup, /data-zds-state="loading"/);
  assert.match(markup, /data-zds-slot="loading-indicator"/);
});

test("renders leading and trailing icons without replacing the label", () => {
  const markup = renderToStaticMarkup(
    <Button
      variant="secondary"
      leadingIcon={<span>+</span>}
      trailingIcon={<span>→</span>}
    >
      Continue
    </Button>
  );

  assert.match(markup, /data-zds-slot="label">Continue</);
  assert.match(markup, /data-zds-slot="leading-icon"/);
  assert.match(markup, /data-zds-slot="trailing-icon"/);
});

test("applies focus-visible treatment when focused", async () => {
  let renderer;
  await act(async () => {
    renderer = create(<Button>Focus me</Button>);
  });
  const button = renderer.root.findByType("button");

  await act(async () => {
    button.props.onFocus({} as never);
  });

  const focusedButton = renderer.root.findByType("button");
  assert.equal(focusedButton.props["data-zds-state"], "focus");
  assert.notEqual(focusedButton.props.style.boxShadow, "none");
});

test("supports destructive large buttons", () => {
  const markup = renderToStaticMarkup(<Button variant="destructive" size="large">Delete</Button>);

  assert.match(markup, /data-zds-variant="destructive"/);
  assert.match(markup, /data-zds-size="large"/);
  assert.match(markup, /Delete/);
});
