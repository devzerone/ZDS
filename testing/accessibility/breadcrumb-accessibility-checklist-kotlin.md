# Breadcrumb Accessibility Checklist: Kotlin/Compose

**Component**: ZDSBreadcrumb
**Platform**: Android / Jetpack Compose
**Screen Reader**: TalkBack
**Created**: 2026-03-31

## Navigation Landmark

- [ ] TalkBack announces the breadcrumb as a navigation region when entering the component
- [ ] The container has `semantics` with appropriate contentDescription

## Ancestor Items

- [ ] Ancestor items are clickable and announced as navigation targets
- [ ] TalkBack announces ancestor items with a button role
- [ ] Tapping an ancestor item triggers the `onNavigate` callback (verified via debug logging)
- [ ] Ancestor items have focus indicator visible

## Current Page

- [ ] TalkBack announces the current item with `Role.Text` semantics
- [ ] The current item is distinguishable from ancestors in the announcement
- [ ] The current item has distinct visual styling (fontWeight emphasis, different color)

## Separators

- [ ] Separators are not focusable via TalkBack swipe
- [ ] Separators have `clearAndSetSemantics { }` applied
- [ ] TalkBack does not announce separator content

## Collapsed Summary

- [ ] The collapsed summary "..." is announced as "Collapsed breadcrumb path"
- [ ] The collapsed summary is not interactive (no tap response)
- [ ] The collapsed summary has distinct visual styling (tertiary color)

## Dark Mode

- [ ] All color tokens resolve correctly in dark mode via light/dark hex variants
- [ ] Contrast ratios remain accessible in both light and dark modes
