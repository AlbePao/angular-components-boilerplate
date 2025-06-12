# Accordion

The `<app-accordion>` provides an expandable details-summary view. It extends [Angular CDK Accordion](https://material.angular.io/cdk/accordion/overview) and uses its inputs and functionalities.

## `app-accordion`

### Inputs

| Input   | Description                                                                         | Type      |
| ------- | ----------------------------------------------------------------------------------- | --------- |
| `multi` | Whether the accordion should allow multiple expanded accordion items simultaneously | `boolean` |

## `app-accordion-item`

### Inputs

| Input      | Description                            | Type      |
| ---------- | -------------------------------------- | --------- |
| `disabled` | Whether the accordion item is disabled | `boolean` |
| `expanded` | Whether the accordion item is expanded | `boolean` |

### Outputs

| Output      | Description                                           | Type emitted |
| ----------- | ----------------------------------------------------- | ------------ |
| `closed`    | Event emitted every time the accordion item is closed | `void`       |
| `destroyed` | Event emitted when the accordion item is destroyed    | `void`       |
| `opened`    | Event emitted every time the accordion item is opened | `void`       |

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    AccordionModule,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {}
```

```html
<!-- example.component.html -->
<app-accordion>
  <app-accordion-item>
    <app-accordion-item-header>
      <app-accordion-item-title>Item 1</app-accordion-item-title>
    </app-accordion-item-header>
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis excepturi incidunt ipsum deleniti labore,
      tempore non nam doloribus blanditiis veritatis illo autem iure aliquid ullam rem tenetur deserunt velit culpa?
    </div>
  </app-accordion-item>
  <app-accordion-item>
    <app-accordion-item-header>
      <app-accordion-item-title>Item 2</app-accordion-item-title>
    </app-accordion-item-header>
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis excepturi incidunt ipsum deleniti labore,
      tempore non nam doloribus blanditiis veritatis illo autem iure aliquid ullam rem tenetur deserunt velit culpa?
    </div>
  </app-accordion-item>
  <app-accordion-item disabled>
    <app-accordion-item-header>
      <app-accordion-item-title>Item 3</app-accordion-item-title>
    </app-accordion-item-header>
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis excepturi incidunt ipsum deleniti labore,
      tempore non nam doloribus blanditiis veritatis illo autem iure aliquid ullam rem tenetur deserunt velit culpa?
    </div>
  </app-accordion-item>
</app-accordion>
```
