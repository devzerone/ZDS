# Breadcrumb Accessibility Checklist

## Navigation Semantics

- [ ] Breadcrumb exposes a navigation landmark label
- [ ] Only interactive ancestor steps receive keyboard focus
- [ ] Current page is announced as current location rather than a normal link

## Separator and Overflow Review

- [ ] Separators remain decorative and are not primary reading targets
- [ ] Collapsed summary remains non-interactive in the base contract
- [ ] Single-step breadcrumb does not create redundant hierarchy noise

## Review Notes

- [ ] Long paths preserve the start and current location meaning
- [ ] Ancestor items remain distinguishable from the current item in docs and React output
