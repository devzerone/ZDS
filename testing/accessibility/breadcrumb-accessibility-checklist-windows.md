# Breadcrumb Accessibility Checklist: Windows/WinUI

**Component**: Breadcrumb
**Platform**: Windows / WinUI 3
**Screen Reader**: Narrator
**Created**: 2026-03-31

## Navigation Landmark

- [ ] Narrator announces the breadcrumb as a navigation landmark when entering the component
- [ ] The container has `AutomationProperties.LandmarkType="Navigation"`

## Ancestor Items

- [ ] Ancestor items use `HyperlinkButton` or equivalent accessible control
- [ ] Narrator announces ancestor items with their accessible name via `AutomationProperties.Name`
- [ ] Clicking an ancestor item triggers the onNavigate callback (verified via debug logging)
- [ ] Ancestor items have visible focus indicator

## Current Page

- [ ] Current item is a `TextBlock` (not a button) with `AutomationProperties.HelpText="Current page"`
- [ ] Narrator distinguishes current item from ancestor items
- [ ] The current item has distinct visual styling (bold fontWeight, different color)

## Separators

- [ ] Separators have `AutomationProperties.AccessibilityView="Raw"` to hide from Narrator
- [ ] Separators are not in the UI Automation tree
- [ ] Narrator does not announce separator content

## Collapsed Summary

- [ ] The collapsed summary has `AutomationProperties.Name="Collapsed breadcrumb path"`
- [ ] The collapsed summary is not interactive (no click response)
- [ ] The collapsed summary has distinct visual styling (tertiary color)

## Dark Mode

- [ ] All color tokens resolve correctly in dark mode
- [ ] Contrast ratios remain accessible in both light and dark modes
