# Contributing guidelines (short)

This project follows modern Angular best practices. Please follow these quick rules when contributing:

- Use TypeScript strict mode features. Avoid `any`.
- Prefer standalone components and `inject()` for DI in new code.
- Use signals for local component state and `computed()` for derived values. Avoid `mutate()`; use `update()`/`set()`.
- Prefer `ChangeDetectionStrategy.OnPush` for components unless there's a clear reason not to.
- Prefer `class`/`style` bindings over `ngClass`/`ngStyle`.
- Prefer `NgOptimizedImage` (`ngSrc`) for static images.
- Use reactive forms (`FormControl`, `FormGroup`) for forms.
- Use lazy-loaded routes (`loadComponent`, `loadChildren`) for feature areas.

If you need help migrating an existing pattern (BehaviorSubject -> signals, template control flow), open an issue or submit a small PR and request a review.
