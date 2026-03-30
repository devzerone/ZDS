import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Button, getButtonRenderModel, resolveVisualState } from "./Button";

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

test("resolves focus-visible state before hover and default", () => {
  assert.equal(
    resolveVisualState({ disabled: false, loading: false, hovered: true, pressed: false, focusVisible: true }),
    "focus"
  );
});

test("resolves loading and disabled precedence over interactive states", () => {
  assert.equal(
    resolveVisualState({ disabled: false, loading: true, hovered: true, pressed: true, focusVisible: true }),
    "loading"
  );
  assert.equal(
    resolveVisualState({ disabled: true, loading: true, hovered: true, pressed: true, focusVisible: true }),
    "disabled"
  );
});

test("computes focus render tokens for the primary variant", () => {
  const model = getButtonRenderModel({ variant: "primary", size: "medium", focusVisible: true });

  assert.equal(model.state, "focus");
  assert.equal(model.colors.focus, "#5e6ad2");
  assert.equal(model.sizeTokens.minHeight, 40);
});

test("supports destructive large buttons", () => {
  const markup = renderToStaticMarkup(<Button variant="destructive" size="large">Delete</Button>);

  assert.match(markup, /data-zds-variant="destructive"/);
  assert.match(markup, /data-zds-size="large"/);
  assert.match(markup, /Delete/);
});
