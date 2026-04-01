# Breadcrumb Accessibility Checklist: SwiftUI

**Component**: ZDSBreadcrumb
**Platform**: iOS / SwiftUI
**Screen Reader**: VoiceOver
**Created**: 2026-03-31

## Navigation Landmark

- [ ] VoiceOver announces the breadcrumb as a navigation region when entering the component
- [ ] The container uses `.accessibilityElement(children: .contain)` with `.accessibilityAddTraits(.isNavigationMarker)`

## Ancestor Items

- [ ] Ancestor items are focusable via VoiceOver swipe navigation
- [ ] VoiceOver announces ancestor items with a link or button role
- [ ] Tapping an ancestor item triggers the `onNavigate` callback (verified via debug logging)
- [ ] Focus ring appears on ancestor items when using keyboard navigation (iPad)

## Current Page

- [ ] VoiceOver announces the current item as text (not a link)
- [ ] The current item is distinguishable from ancestors in the announcement
- [ ] The current item has distinct visual styling (fontWeight emphasis, different color)

## Separators

- [ ] Separators are not focusable via VoiceOver swipe
- [ ] Separators have `.accessibilityHidden(true)` applied
- [ ] VoiceOver does not announce separator content

## Collapsed Summary

- [ ] The collapsed summary "..." is announced with a descriptive label (e.g., "Collapsed breadcrumb path")
- [ ] The collapsed summary is not interactive (no tap response)
- [ ] The collapsed summary has distinct visual styling (tertiary color)

## Dark Mode

- [ ] All color tokens resolve correctly in dark mode
- [ ] Contrast ratios remain accessible in both light and dark modes
